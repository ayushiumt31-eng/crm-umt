import type { BulkImportConfig, ImportField } from "../types";
import { CUSTOMER_IMPORT_FIELDS, CUSTOMER_SAMPLE_DATA } from "../constants";
import { isValidEmail, isValidPhone } from "../utils/validateImportData";
import { importCustomers } from "../services/bulkImportService";
import type { Customer } from "@/features/customers/types/customer";
import { dummyCustomers } from "@/features/customers/data/dummy-customers";

/**
 * Validate a customer import row
 */
function validateCustomerRow(
  row: Record<string, unknown>,
  _rowNumber: number
): string[] {
  const errors: string[] = [];
  const firstName = String(row.firstName ?? "").trim();
  const email = String(row.email ?? "").trim();
  const phone = String(row.phone ?? "").trim();

  // First name is required for customers (to build the "name" field)
  if (!firstName) {
    errors.push("First name is required.");
  }

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
 * Get existing customer emails for duplicate detection
 */
function getExistingCustomerEmails(): string[] {
  return dummyCustomers.map((c: Customer) => c.email).filter(Boolean);
}

/**
 * Get existing customer phones for duplicate detection
 */
function getExistingCustomerPhones(): string[] {
  return dummyCustomers.map((c: Customer) => c.phone).filter(Boolean);
}

/**
 * Customer bulk import configuration
 */
export const customerImportConfig: BulkImportConfig<Customer> = {
  module: "customers",
  fields: CUSTOMER_IMPORT_FIELDS,
  validateRow: validateCustomerRow,
  onImport: importCustomers,
  sampleData: CUSTOMER_SAMPLE_DATA,
  label: "Customers",
  description: "Import customer records from CSV or Excel file.",
};

/**
 * Extract existing emails and phones for duplicate detection
 */
export function getCustomerExistingData() {
  return {
    emails: getExistingCustomerEmails(),
    phones: getExistingCustomerPhones(),
  };
}

