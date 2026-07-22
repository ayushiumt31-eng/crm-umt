import { LocalDataService } from "@/services/baseService";
import type { Customer } from "../types/customer";
import { dummyCustomers } from "../data/dummy-customers";

interface CustomerFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

type CreateCustomerPayload = Omit<Customer, "id" | "createdAt">;
type UpdateCustomerPayload = Partial<CreateCustomerPayload>;

class CustomerService extends LocalDataService<Customer> {
  getDummyData(): Customer[] {
    return dummyCustomers;
  }

  /**
   * Get customers with filters (search, status, etc.)
   */
  async getCustomers(filters?: CustomerFilters): Promise<Customer[]> {
    let results = await this.getAll();

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      results = results.filter(
        (cust) =>
          cust.name.toLowerCase().includes(query) ||
          cust.email.toLowerCase().includes(query) ||
          cust.company.toLowerCase().includes(query) ||
          cust.phone.includes(query)
      );
    }

    if (filters?.status && (filters.status as string) !== "All") {
      results = results.filter((cust) => cust.status === filters.status);
    }

    // Pagination
    if (filters?.page && filters?.limit) {
      const start = (filters.page - 1) * filters.limit;
      results = results.slice(start, start + filters.limit);
    }

    return results;
  }

  /**
   * Get a single customer by ID
   */
  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.getById(id);
    if (!customer) {
      throw new Error(`Customer with id ${id} not found`);
    }
    return customer;
  }

  /**
   * Create a new customer
   */
  async createCustomer(payload: CreateCustomerPayload): Promise<Customer> {
    const customerData = {
      ...payload,
      createdAt: new Date().toISOString(),
    } as Omit<Customer, "id">;
    return this.create(customerData);
  }

  /**
   * Update an existing customer
   */
  async updateCustomer(id: string, payload: UpdateCustomerPayload): Promise<Customer> {
    return this.update(id, payload as Partial<Customer>);
  }

  /**
   * Delete a customer
   */
  async deleteCustomer(id: string): Promise<void> {
    return this.delete(id);
  }
}

export const customerService = new CustomerService();
