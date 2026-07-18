import { useState, useCallback } from "react";
import type { Customer } from "@/types/customer";
import { useApi, usePost, usePut, useDelete } from "./useApi";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { data, loading, error } = useApi<Customer[]>("/api/customers");
  const { post: createCustomer } = usePost("/api/customers");
  const { put: updateCustomer } = usePut("/api/customers");
  const { remove: deleteCustomer } = useDelete("/api/customers");

  // Set customers when data loads
  if (data && customers.length === 0) {
    setCustomers(data);
  }

  const addCustomer = useCallback(
    async (customer: Omit<Customer, "id" | "createdAt">) => {
      try {
        const newCustomer = await createCustomer(customer);
        setCustomers((prev) => [...prev, newCustomer as Customer]);
        return newCustomer;
      } catch (err) {
        throw err;
      }
    },
    [createCustomer]
  );

  const editCustomer = useCallback(
    async (id: string, customer: Partial<Customer>) => {
      try {
        const updated = await updateCustomer(customer);
        setCustomers((prev) =>
          prev.map((c) => (c.id === id ? (updated as Customer) : c))
        );
        return updated;
      } catch (err) {
        throw err;
      }
    },
    [updateCustomer]
  );

  const removeCustomer = useCallback(
    async (id: string) => {
      try {
        await deleteCustomer;
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        throw err;
      }
    },
    [deleteCustomer]
  );

  const searchCustomers = useCallback((query: string) => {
    if (!query) return customers;
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        customer.company.toLowerCase().includes(query.toLowerCase())
    );
  }, [customers]);

  return {
    customers,
    loading,
    error,
    addCustomer,
    editCustomer,
    removeCustomer,
    searchCustomers,
  };
}
