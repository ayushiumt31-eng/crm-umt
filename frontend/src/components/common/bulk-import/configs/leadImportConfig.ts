import type { BulkImportConfig } from "../types";
import { LEAD_IMPORT_FIELDS, LEAD_SAMPLE_DATA } from "../constants";
import { isValidEmail, isValidPhone } from "../utils/validateImportData";
import { importLeads } from "../services/bulkImportService";
import type { Lead } from "@/features/lead/types/lead";
import { dummyLead } from "@/features/lead/data/dummy-lead";

/**
 * Validate a lead import row
 */
function validateLeadRow(
  row: Record<string, unknown>,
  _rowNumber: number
): string[] {
  const errors: string[] = [];
  const email = String(row.email ?? "").trim();
  const phone = String(row.phone ?? "").trim();

  // Email validation
  if (email && !isValidEmail(email)) {
    errors.push("Invalid email format.");
  }

  // Phone validation
  if (phone && !isValidPhone(phone)) {
    errors.push("Invalid phone number.");
  }

  return errors;
}

/**
 * Get existing lead emails for duplicate detection
 */
function getExistingLeadEmails(): string[] {
  return dummyLead.map((l: Lead) => l.email).filter(Boolean);
}

/**
 * Get existing lead phones for duplicate detection
 */
function getExistingLeadPhones(): string[] {
  return dummyLead.map((l: Lead) => l.phone).filter(Boolean);
}

/**
 * Lead bulk import configuration
 */
export const leadImportConfig: BulkImportConfig<Lead> = {
  module: "leads",
  fields: LEAD_IMPORT_FIELDS,
  validateRow: validateLeadRow,
  onImport: importLeads,
  sampleData: LEAD_SAMPLE_DATA,
  label: "Leads",
  description: "Import lead records from CSV or Excel file.",
};

/**
 * Extract existing emails and phones for duplicate detection
 */
export function getLeadExistingData() {
  return {
    emails: getExistingLeadEmails(),
    phones: getExistingLeadPhones(),
  };
}

