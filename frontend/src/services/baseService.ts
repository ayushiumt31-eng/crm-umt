import type { AxiosInstance } from "axios";
import axios from "axios";
import { AxiosError } from "axios";

/**
 * Base Service for all API calls
 * Provides common CRUD operations with error handling
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export class BaseService {
  protected api: AxiosInstance;
  protected endpoint: string;

  constructor(endpoint: string, baseURL = "http://localhost:3001/api") {
    this.endpoint = endpoint;

    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add interceptors for common error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET all items with optional pagination
   */
  async getAll<T>(params?: PaginationParams): Promise<T[]> {
    try {
      const response = await this.api.get<ApiResponse<T[]>>(
        this.endpoint,
        { params }
      );
      return response.data.data || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET single item by ID
   */
  async getById<T>(id: string): Promise<T> {
    try {
      const response = await this.api.get<ApiResponse<T>>(
        `${this.endpoint}/${id}`
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * CREATE new item
   */
  async create<T, P>(payload: P): Promise<T> {
    try {
      const response = await this.api.post<ApiResponse<T>>(
        this.endpoint,
        payload
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * UPDATE existing item
   */
  async update<T, P>(id: string, payload: Partial<P>): Promise<T> {
    try {
      const response = await this.api.patch<ApiResponse<T>>(
        `${this.endpoint}/${id}`,
        payload
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE item
   */
  async delete(id: string): Promise<void> {
    try {
      await this.api.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * BULK DELETE items
   */
  async bulkDelete(ids: string[]): Promise<void> {
    try {
      await this.api.post(`${this.endpoint}/bulk-delete`, { ids });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Custom GET request
   */
  protected async request<T>(
    method: "GET" | "POST" | "PATCH" | "DELETE",
    url: string,
    data?: any,
    params?: any
  ): Promise<T> {
    try {
      const response = await this.api.request<ApiResponse<T>>({
        method,
        url,
        data,
        params,
      });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Error handling
   */
  protected handleError(error: any): Error {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred";
      return new Error(message);
    }
    return error instanceof Error ? error : new Error("Unknown error");
  }
}

/**
 * Generic data store for local state management
 * Use when backend is not available
 */
export abstract class LocalDataService<T extends { id: string }> {
  protected data: T[] = [];

  abstract getDummyData(): T[];

  constructor() {
    this.data = this.getDummyData();
  }

  getAllSync(): T[] {
    return [...this.data];
  }

  getAll(): Promise<T[]> {
    return Promise.resolve([...this.data]);
  }

  getById(id: string): Promise<T | undefined> {
    return Promise.resolve(this.data.find((item) => item.id === id));
  }

  create(item: Omit<T, "id">): Promise<T> {
    const newItem = {
      ...(item as any),
      id: `${Date.now()}`,
    } as T;
    this.data.push(newItem);
    return Promise.resolve(newItem);
  }

  update(id: string, updates: Partial<T>): Promise<T> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.data[index] = { ...this.data[index], ...updates };
    return Promise.resolve(this.data[index]);
  }

  delete(id: string): Promise<void> {
    this.data = this.data.filter((item) => item.id !== id);
    return Promise.resolve();
  }

  bulkDelete(ids: string[]): Promise<void> {
    this.data = this.data.filter((item) => !ids.includes(item.id));
    return Promise.resolve();
  }
}
