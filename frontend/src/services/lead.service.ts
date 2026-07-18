import axios from "axios";
import type { Lead, CreateLeadPayload, UpdateLeadPayload, LeadListResponse, LeadFilters } from "@/features/leads/types/lead";

const API_BASE_URL = "/api/leads";

class LeadService {
  /**
   * Get all leads with optional filtering and pagination
   */
  async getLeads(filters?: LeadFilters): Promise<LeadListResponse> {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.source) params.append("source", filters.source);
      if (filters?.assignedTo) params.append("assignedTo", filters.assignedTo);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters?.page) params.append("page", String(filters.page));
      if (filters?.limit) params.append("limit", String(filters.limit));

      const response = await axios.get<LeadListResponse>(
        `${API_BASE_URL}${params.toString() ? `?${params.toString()}` : ""}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching leads:", error);
      throw error;
    }
  }

  /**
   * Get a single lead by ID
   */
  async getLeadById(id: string): Promise<Lead> {
    try {
      const response = await axios.get<Lead>(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lead:", error);
      throw error;
    }
  }

  /**
   * Create a new lead
   */
  async createLead(payload: CreateLeadPayload): Promise<Lead> {
    try {
      const response = await axios.post<Lead>(API_BASE_URL, payload);
      return response.data;
    } catch (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
  }

  /**
   * Update an existing lead
   */
  async updateLead(id: string, payload: UpdateLeadPayload): Promise<Lead> {
    try {
      const response = await axios.put<Lead>(`${API_BASE_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating lead:", error);
      throw error;
    }
  }

  /**
   * Delete a lead
   */
  async deleteLead(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting lead:", error);
      throw error;
    }
  }
}

export const leadService = new LeadService();
