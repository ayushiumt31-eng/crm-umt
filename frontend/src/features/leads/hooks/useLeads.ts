import { useState, useCallback, useMemo } from "react";
import type { Lead } from "../types/lead";
import { dummyLeads } from "../data/dummy-leads";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(dummyLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [assignedToFilter, setAssignedToFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "value" | "date">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get unique sources and assigned employees
  const sources = useMemo(() => {
    const srcs = [...new Set(leads.map((l) => l.source))];
    return srcs.sort();
  }, [leads]);

  const statuses = useMemo(() => {
    return ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];
  }, []);

  const assignedEmployees = useMemo(() => {
    const emps = [...new Set(leads.map((l) => l.assignedTo))];
    return emps.sort();
  }, [leads]);

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.leadName.toLowerCase().includes(query) ||
          lead.companyName.toLowerCase().includes(query) ||
          lead.contactPerson.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Apply source filter
    if (sourceFilter !== "All") {
      filtered = filtered.filter((lead) => lead.source === sourceFilter);
    }

    // Apply assigned to filter
    if (assignedToFilter !== "All") {
      filtered = filtered.filter((lead) => lead.assignedTo === assignedToFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareValue = 0;

      if (sortBy === "name") {
        compareValue = a.leadName.localeCompare(b.leadName);
      } else if (sortBy === "value") {
        compareValue = a.expectedDealValue - b.expectedDealValue;
      } else if (sortBy === "date") {
        compareValue = new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime();
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return filtered;
  }, [leads, searchQuery, statusFilter, sourceFilter, assignedToFilter, sortBy, sortOrder]);

  // Pagination
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedLeads, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedLeads.length / pageSize);

  // CRUD Operations
  const addLead = useCallback(
    async (newLead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));

        const lead: Lead = {
          ...newLead,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setLeads((prev) => [...prev, lead]);
        setLoading(false);
        return lead;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to add lead");
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const updateLead = useCallback(
    async (id: string, updatedData: Partial<Lead>) => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));

        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id
              ? {
                  ...lead,
                  ...updatedData,
                  updatedAt: new Date().toISOString(),
                }
              : lead
          )
        );
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to update lead");
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const deleteLead = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));

        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to delete lead");
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const getLeadById = useCallback(
    (id: string) => {
      return leads.find((lead) => lead.id === id);
    },
    [leads]
  );

  return {
    leads: paginatedLeads,
    allLeads: leads,
    filteredLeads: filteredAndSortedLeads,
    loading,
    error,
    totalResults: filteredAndSortedLeads.length,
    totalPages,
    currentPage,
    pageSize,
    sources,
    statuses,
    assignedEmployees,
    searchQuery,
    statusFilter,
    sourceFilter,
    assignedToFilter,
    sortBy,
    sortOrder,
    setSearchQuery,
    setStatusFilter,
    setSourceFilter,
    setAssignedToFilter,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    addLead,
    updateLead,
    deleteLead,
    getLeadById,
  };
}
