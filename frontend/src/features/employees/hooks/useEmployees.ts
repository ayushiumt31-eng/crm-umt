import { useState, useCallback, useMemo } from "react";
import type { Employee } from "../types/employee";
import { dummyEmployees } from "../data/dummy-employees";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Active" | "Inactive" | "All">("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "department" | "salary">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get unique departments for filter
  const departments = useMemo(() => {
    const depts = [...new Set(employees.map((e) => e.department))];
    return depts.sort();
  }, [employees]);

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(query) ||
          emp.lastName.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.phone.includes(query) ||
          emp.employeeId.toLowerCase().includes(query) ||
          emp.designation.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    // Apply department filter
    if (departmentFilter !== "All") {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareValue = 0;

      if (sortBy === "name") {
        compareValue = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      } else if (sortBy === "department") {
        compareValue = a.department.localeCompare(b.department);
      } else if (sortBy === "salary") {
        compareValue = a.salary - b.salary;
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return filtered;
  }, [employees, searchQuery, statusFilter, departmentFilter, sortBy, sortOrder]);

  // Pagination
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedEmployees.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedEmployees, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedEmployees.length / pageSize);

  // CRUD Operations
  const addEmployee = useCallback(
    async (newEmployee: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));

        const employee: Employee = {
          ...newEmployee,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setEmployees((prev) => [...prev, employee]);
        setLoading(false);
        return employee;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to add employee");
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const updateEmployee = useCallback(
    async (id: string, updatedData: Partial<Employee>) => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));

        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === id
              ? {
                  ...emp,
                  ...updatedData,
                  updatedAt: new Date().toISOString(),
                }
              : emp
          )
        );
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to update employee");
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const deleteEmployee = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));

        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to delete employee");
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const getEmployeeById = useCallback(
    (id: string) => {
      return employees.find((emp) => emp.id === id);
    },
    [employees]
  );

  return {
    employees: paginatedEmployees,
    allEmployees: employees,
    filteredEmployees: filteredAndSortedEmployees,
    loading,
    error,
    totalResults: filteredAndSortedEmployees.length,
    totalPages,
    currentPage,
    pageSize,
    departments,
    searchQuery,
    statusFilter,
    departmentFilter,
    sortBy,
    sortOrder,
    setSearchQuery,
    setStatusFilter,
    setDepartmentFilter,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  };
}
