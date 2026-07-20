import { LocalDataService } from "./baseService";
import type { Employee, CreateEmployeePayload, UpdateEmployeePayload, EmployeeFilters } from "@/features/employees/types/employee";
import { dummyEmployees } from "@/features/employees/data/dummy-employees";

class EmployeeService extends LocalDataService<Employee> {
  getDummyData(): Employee[] {
    return dummyEmployees;
  }

  /**
   * Get employees with filters (search, status, department, etc.)
   */
  async getEmployees(filters?: EmployeeFilters): Promise<Employee[]> {
    let results = await this.getAll();

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      results = results.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(query) ||
          emp.lastName.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.phone.includes(query)
      );
    }

    if (filters?.status && (filters.status as string) !== "All") {
      results = results.filter((emp) => emp.status === filters.status);
    }

    if (filters?.department && (filters.department as string) !== "All") {
      results = results.filter((emp) => emp.department === filters.department);
    }

    // Pagination
    if (filters?.page && filters?.limit) {
      const start = (filters.page - 1) * filters.limit;
      results = results.slice(start, start + filters.limit);
    }

    return results;
  }

  /**
   * Get a single employee by ID
   */
  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.getById(id);
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    return employee;
  }

  /**
   * Create a new employee
   */
  async createEmployee(payload: CreateEmployeePayload): Promise<Employee> {
    const employeeData = {
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Omit<Employee, "id">;
    return this.create(employeeData);
  }

  /**
   * Update an existing employee
   */
  async updateEmployee(id: string, payload: UpdateEmployeePayload): Promise<Employee> {
    return this.update(id, payload as Partial<Employee>);
  }

  /**
   * Delete an employee
   */
  async deleteEmployee(id: string): Promise<void> {
    return this.delete(id);
  }
}

export const employeeService = new EmployeeService();
