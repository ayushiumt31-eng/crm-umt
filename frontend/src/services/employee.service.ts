import axios from "axios";
import type { Employee, CreateEmployeePayload, UpdateEmployeePayload, EmployeeListResponse, EmployeeFilters } from "@/features/employees/types/employee";

const API_BASE_URL = "/api/employees";

class EmployeeService {
  /**
   * Get all employees with optional filtering and pagination
   */
  async getEmployees(filters?: EmployeeFilters): Promise<EmployeeListResponse> {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.department) params.append("department", filters.department);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters?.page) params.append("page", String(filters.page));
      if (filters?.limit) params.append("limit", String(filters.limit));

      const response = await axios.get<EmployeeListResponse>(
        `${API_BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }

  /**
   * Get a single employee by ID
   */
  async getEmployeeById(id: string): Promise<Employee> {
    try {
      const response = await axios.get<Employee>(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  }

  /**
   * Create a new employee
   */
  async createEmployee(payload: CreateEmployeePayload): Promise<Employee> {
    try {
      const response = await axios.post<Employee>(API_BASE_URL, payload);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  }

  /**
   * Update an existing employee
   */
  async updateEmployee(id: string, payload: UpdateEmployeePayload): Promise<Employee> {
    try {
      const response = await axios.put<Employee>(`${API_BASE_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  }

  /**
   * Delete an employee
   */
  async deleteEmployee(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }
}

export const employeeService = new EmployeeService();
