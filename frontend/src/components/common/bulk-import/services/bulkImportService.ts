import type { Customer } from "@/features/customers/types/customer";
import type { Lead } from "@/features/lead/types/lead";
import type { Sale } from "@/features/sales/types/sale";
import type { Employee } from "@/features/employees/types/employee";
import { dummyCustomers } from "@/features/customers/data/dummy-customers";
import { dummyLead } from "@/features/lead/data/dummy-lead";
import { dummySales } from "@/features/sales/data/dummy-sales";
import { dummyEmployees } from "@/features/employees/data/dummy-employees";
import type { ImportResult } from "../types";

/**
 * Generate a unique ID for new records
 */
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Import customers from validated rows into local dummy data
 */
export async function importCustomers(rows: Record<string, unknown>[]): Promise<ImportResult> {
  const errors: string[] = [];

  for (const row of rows) {
    try {
      const firstName = String(row.firstName ?? "").trim();
      const lastName = String(row.lastName ?? "").trim();
      const name = lastName ? `${firstName} ${lastName}` : firstName;

      const newCustomer: Customer = {
        id: generateId("cust"),
        name,
        email: String(row.email ?? "").trim(),
        phone: String(row.phone ?? "").trim(),
        company: String(row.company ?? "").trim(),
        status: (String(row.status ?? "Active").trim() as "Active" | "Inactive"),
        createdAt: new Date().toISOString(),
      };

      dummyCustomers.push(newCustomer);
    } catch (error) {
      errors.push(`Failed to import row: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return {
    importedCount: rows.length - errors.length,
    failedCount: errors.length,
    errors,
  };
}

/**
 * Import leads from validated rows into local dummy data
 */
export async function importLeads(rows: Record<string, unknown>[]): Promise<ImportResult> {
  const errors: string[] = [];

  for (const row of rows) {
    try {
      const newLead: Lead = {
        id: generateId("lead"),
        firstName: String(row.firstName ?? "").trim(),
        lastName: String(row.lastName ?? "").trim(),
        email: String(row.email ?? "").trim(),
        phone: String(row.phone ?? "").trim(),
        company: String(row.company ?? "").trim() || undefined,
        source: (String(row.source ?? "OTHER").trim() as Lead["source"]),
        status: (String(row.status ?? "NEW").trim() as Lead["status"]),
        priority: "MEDIUM",
        assignedTo: String(row.assignedTo ?? "").trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      dummyLead.push(newLead);
    } catch (error) {
      errors.push(`Failed to import row: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return {
    importedCount: rows.length - errors.length,
    failedCount: errors.length,
    errors,
  };
}

/**
 * Import sales from validated rows into local dummy data.
 * Resolves related entities by ID or email/name.
 */
export async function importSales(rows: Record<string, unknown>[]): Promise<ImportResult> {
  const errors: string[] = [];

  for (const row of rows) {
    try {
      const customerIdOrEmail = String(row.customerId ?? "").trim();
      const assignedToId = String(row.assignedTo ?? "").trim();

      // Resolve customer
      let customerId = customerIdOrEmail;
      let customerName = "";

      // Check if customerIdOrEmail is an email
      if (customerIdOrEmail.includes("@")) {
        const customer = dummyCustomers.find(
          (c) => c.email.toLowerCase() === customerIdOrEmail.toLowerCase()
        );
        if (customer) {
          customerId = customer.id;
          customerName = customer.name;
        } else {
          errors.push(`Customer with email "${customerIdOrEmail}" not found.`);
          continue;
        }
      } else {
        // It's an ID
        const customer = dummyCustomers.find((c) => c.id === customerIdOrEmail);
        if (customer) {
          customerName = customer.name;
        } else {
          errors.push(`Customer with ID "${customerIdOrEmail}" not found.`);
          continue;
        }
      }

      // Resolve employee for assignedTo
      let assignedToName = "";
      const employee = dummyEmployees.find(
        (e: Employee) =>
          e.id === assignedToId || e.email === assignedToId
      );
      if (employee) {
        assignedToName = `${employee.firstName} ${employee.lastName}`;
      } else {
        errors.push(`Employee "${assignedToId}" not found.`);
        continue;
      }

      const amount = Number(row.amount) || 0;
      const saleNumber = `SALE-${String(Date.now()).slice(-6)}`;

      const newSale: Sale = {
        id: generateId("sale"),
        saleNumber,
        customerId,
        customerName,
        amount,
        discount: 0,
        tax: 0,
        finalAmount: amount,
        paymentStatus: (String(row.paymentStatus ?? "PENDING").trim() as Sale["paymentStatus"]),
        paymentMethod: (String(row.paymentMethod ?? "OTHER").trim() as Sale["paymentMethod"]),
        saleDate: String(row.saleDate ?? new Date().toISOString().split("T")[0]).trim(),
        assignedTo: assignedToId,
        assignedToName,
        status: (String(row.status ?? "DRAFT").trim() as Sale["status"]),
        notes: String(row.notes ?? "").trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      dummySales.push(newSale);
    } catch (error) {
      errors.push(`Failed to import row: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return {
    importedCount: rows.length - errors.length,
    failedCount: errors.length,
    errors,
  };
}

