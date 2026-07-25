import type { ImportField } from "../types";

/**
 * Validates a single email address
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === "") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a phone number (at least 10 digits)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.trim() === "") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

/**
 * Validates a row of data against field definitions
 */
export function validateRow(
  row: Record<string, unknown>,
  fields: ImportField[],
  rowNumber: number
): string[] {
  const errors: string[] = [];

  for (const field of fields) {
    const value = row[field.key] !== undefined ? String(row[field.key]).trim() : "";

    // Check required fields
    if (field.required && !value) {
      errors.push(`${field.label} is required.`);
      continue;
    }

    if (!value) continue; // Skip further validation for empty optional fields

    // Type-specific validation
    switch (field.type) {
      case "email": {
        if (!isValidEmail(value)) {
          errors.push(`Invalid email format for ${field.label}.`);
        }
        break;
      }
      case "phone": {
        if (!isValidPhone(value)) {
          errors.push(`Invalid phone number for ${field.label}.`);
        }
        break;
      }
      case "select": {
        if (field.options && field.options.length > 0) {
          const validValues = field.options.map((o) => o.value);
          if (!validValues.includes(value)) {
            errors.push(
              `Invalid ${field.label}. Valid values: ${validValues.join(", ")}`
            );
          }
        }
        break;
      }
      case "number": {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
          errors.push(`${field.label} must be a valid positive number.`);
        }
        break;
      }
      case "date": {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          errors.push(`Invalid date format for ${field.label}. Use YYYY-MM-DD.`);
        }
        break;
      }
    }
  }

  return errors;
}

/**
 * Detects duplicate emails in the import data
 */
export function detectDuplicateEmails(
  rows: Record<string, unknown>[],
  emailField: string = "email"
): Map<number, string[]> {
  const emailMap = new Map<string, number[]>();
  const result = new Map<number, string[]>();

  rows.forEach((row, index) => {
    const email = row[emailField] ? String(row[emailField]).trim().toLowerCase() : "";
    if (!email) return;

    if (emailMap.has(email)) {
      emailMap.get(email)!.push(index);
    } else {
      emailMap.set(email, [index]);
    }
  });

  emailMap.forEach((indices) => {
    if (indices.length > 1) {
      indices.forEach((idx) => {
        const rowNum = idx + 2; // +2 because row 1 is header, data starts at row 2
        if (!result.has(idx)) {
          result.set(idx, []);
        }
        result.get(idx)!.push(`Duplicate email found in row ${rowNum}.`);
      });
    }
  });

  return result;
}

/**
 * Detects duplicate phones in the import data
 */
export function detectDuplicatePhones(
  rows: Record<string, unknown>[],
  phoneField: string = "phone"
): Map<number, string[]> {
  const phoneMap = new Map<string, number[]>();
  const result = new Map<number, string[]>();

  rows.forEach((row, index) => {
    const phone = row[phoneField] ? String(row[phoneField]).trim() : "";
    if (!phone) return;

    if (phoneMap.has(phone)) {
      phoneMap.get(phone)!.push(index);
    } else {
      phoneMap.set(phone, [index]);
    }
  });

  phoneMap.forEach((indices) => {
    if (indices.length > 1) {
      indices.forEach((idx) => {
        const rowNum = idx + 2;
        if (!result.has(idx)) {
          result.set(idx, []);
        }
        result.get(idx)!.push(`Duplicate phone found in row ${rowNum}.`);
      });
    }
  });

  return result;
}

/**
 * Compares imported emails against existing data to find duplicates
 */
export function detectExistingEmailDuplicates(
  rows: Record<string, unknown>[],
  existingEmails: string[],
  emailField: string = "email"
): Map<number, string[]> {
  const result = new Map<number, string[]>();
  const existingSet = new Set(existingEmails.map((e) => e.toLowerCase().trim()));

  rows.forEach((row, index) => {
    const email = row[emailField] ? String(row[emailField]).trim().toLowerCase() : "";
    if (!email) return;

    if (existingSet.has(email)) {
      if (!result.has(index)) {
        result.set(index, []);
      }
      result.get(index)!.push(`Email "${email}" already exists in the system.`);
    }
  });

  return result;
}

/**
 * Validates headers against expected fields
 */
export function validateHeaders(
  headers: string[],
  fields: ImportField[]
): string[] {
  const errors: string[] = [];
  const fieldKeys = fields.map((f) => f.key);
  const headerSet = new Set(headers);

  const requiredFields = fields.filter((f) => f.required);
  for (const field of requiredFields) {
    if (!headerSet.has(field.key)) {
      errors.push(`Required column "${field.key}" (${field.label}) is missing.`);
    }
  }

  const unexpectedHeaders = headers.filter((h) => !fieldKeys.includes(h));
  if (unexpectedHeaders.length > 0) {
    errors.push(
      `Unexpected columns found: ${unexpectedHeaders.join(", ")}. These will be ignored.`
    );
  }

  return errors;
}

