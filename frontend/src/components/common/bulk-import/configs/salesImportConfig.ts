import type { BulkImportConfig } from "../types";
import { SALES_IMPORT_FIELDS, SALES_SAMPLE_DATA } from "../constants";
import { importSales } from "../services/bulkImportService";
import type { Sale } from "@/features/sales/types/sale";
import { dummyCustomers } from "@/features/customers/data/dummy-customers";
import { dummyEmployees } from "@/features/employees/data/dummy-employees";
import { dummyLead } from "@/features/lead/data/dummy-lead";

/**
 * Validate a sales import row - resolves related entities
 */
function validateSalesRow(
  row: Record<string, unknown>,
  _rowNumber: number
): string[] {
  const errors: string[] = [];
  const customerIdOrEmail = String(row.customerId ?? "").trim();
  const assignedToId = String(row.assignedTo ?? "").trim();
  const amount = String(row.amount ?? "").trim();
  const saleDate = String(row.saleDate ?? "").trim();

  // Customer lookup
  if (!customerIdOrEmail) {
    errors.push("Customer is required.");
  } else {
    const customerFound = dummyCustomers.find(
      (c) =>
        c.id === customerIdOrEmail ||
        c.email.toLowerCase() === customerIdOrEmail.toLowerCase()
    );
    if (!customerFound) {
      errors.push(`Customer not found: "${customerIdOrEmail}".`);
    }
  }

  // Employee lookup
  if (!assignedToId) {
    errors.push("Assigned To is required.");
  } else {
    const employeeFound = dummyEmployees.find(
      (e) => e.id === assignedToId || e.email === assignedToId
    );
    if (!employeeFound) {
      errors.push(`Employee not found: "${assignedToId}".`);
    }
  }

  // Amount validation
  if (!amount) {
    errors.push("Amount is required.");
  } else if (isNaN(Number(amount)) || Number(amount) < 0) {
    errors.push("Amount must be a valid positive number.");
  }

  // Date validation
  if (saleDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(saleDate)) {
      errors.push("Invalid date format for Sale Date. Use YYYY-MM-DD.");
    }
  }

  return errors;
}

/**
 * Sales bulk import configuration
 */
export const salesImportConfig: BulkImportConfig<Sale> = {
  module: "sales",
  fields: SALES_IMPORT_FIELDS,
  validateRow: validateSalesRow,
  onImport: importSales,
  sampleData: SALES_SAMPLE_DATA,
  label: "Sales",
  description: "Import sales records from CSV or Excel file.",
};

/**
 * Existing emails data for sales import (not used for email dedup in sales)
 */
export function getSalesExistingData() {
  return {
    emails: [] as string[],
    phones: [] as string[],
  };
}

