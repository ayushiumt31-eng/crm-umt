export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  manager: string;
  status: "Active" | "Inactive";
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  manager: string;
  status: "Active" | "Inactive";
  address: string;
  notes: string;
}

export interface UpdateEmployeePayload extends Partial<CreateEmployeePayload> {}

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}

export interface EmployeeFilters {
  search?: string;
  status?: "Active" | "Inactive";
  department?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
