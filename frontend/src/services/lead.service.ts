import { LocalDataService } from "./baseService";
import type { Lead, CreateLeadPayload, UpdateLeadPayload, LeadFilters } from "@/features/leads/types/lead";
import { dummyLeads } from "@/features/leads/data/dummy-leads";

class LeadService extends LocalDataService<Lead> {
  getDummyData(): Lead[] {
    return dummyLeads;
  }

  /**
   * Get leads with filters (search, status, source, assigned)
   */
  async getLeads(filters?: LeadFilters): Promise<Lead[]> {
    let results = await this.getAll();

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      results = results.filter(
        (lead) =>
          lead.leadName.toLowerCase().includes(query) ||
          lead.companyName.toLowerCase().includes(query) ||
          lead.contactPerson.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      );
    }

    if (filters?.status && (filters.status as string) !== "All") {
      results = results.filter((lead) => lead.status === filters.status);
    }

    if (filters?.source && (filters.source as string) !== "All") {
      results = results.filter((lead) => lead.source === filters.source);
    }

    if (filters?.assignedTo && filters.assignedTo !== "All") {
      results = results.filter((lead) => lead.assignedTo === filters.assignedTo);
    }

    // Pagination
    if (filters?.page && filters?.limit) {
      const start = (filters.page - 1) * filters.limit;
      results = results.slice(start, start + filters.limit);
    }

    return results;
  }

  /**
   * Get a single lead by ID
   */
  async getLeadById(id: string): Promise<Lead> {
    const lead = await this.getById(id);
    if (!lead) {
      throw new Error(`Lead with id ${id} not found`);
    }
    return lead;
  }

  /**
   * Create a new lead
   */
  async createLead(payload: CreateLeadPayload): Promise<Lead> {
    const leadData = {
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Omit<Lead, "id">;
    return this.create(leadData);
  }

  /**
   * Update an existing lead
   */
  async updateLead(id: string, payload: UpdateLeadPayload): Promise<Lead> {
    return this.update(id, payload as Partial<Lead>);
  }

  /**
   * Delete a lead
   */
  async deleteLead(id: string): Promise<void> {
    return this.delete(id);
  }
}

export const leadService = new LeadService();
