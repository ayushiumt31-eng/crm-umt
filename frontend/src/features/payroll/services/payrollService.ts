import type { Payroll } from "../types/payroll";
import { dummyPayrolls } from "../data/dummy-payroll";

class PayrollService {
  private payrolls: Payroll[] = [...dummyPayrolls];

  getPayrolls(): Promise<Payroll[]> {
    return Promise.resolve([...this.payrolls]);
  }

  getPayrollById(id: string): Promise<Payroll | undefined> {
    return Promise.resolve(this.payrolls.find((p) => p.id === id));
  }

  createPayroll(payload: Omit<Payroll, "id" | "createdAt" | "updatedAt">): Promise<Payroll> {
    const newPayroll: Payroll = {
      ...payload,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.payrolls.push(newPayroll);
    return Promise.resolve(newPayroll);
  }

  updatePayroll(id: string, updates: Partial<Payroll>): Promise<Payroll> {
    const index = this.payrolls.findIndex((p) => p.id === id);
    if (index === -1) return Promise.reject(new Error("Payroll not found"));
    this.payrolls[index] = {
      ...this.payrolls[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(this.payrolls[index]);
  }

  processPayroll(ids: string[]): Promise<Payroll[]> {
    const processed: Payroll[] = [];
    ids.forEach((id) => {
      const index = this.payrolls.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.payrolls[index] = {
          ...this.payrolls[index],
          status: "PROCESSED",
          processedBy: "admin-001",
          processedByName: "Admin User",
          processedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        processed.push(this.payrolls[index]);
      }
    });
    return Promise.resolve(processed);
  }

  approvePayroll(id: string): Promise<Payroll> {
    return this.updatePayroll(id, {
      status: "APPROVED",
      approvedBy: "admin-001",
      approvedByName: "Admin User",
      approvedAt: new Date().toISOString(),
    });
  }

  rejectPayroll(id: string, reason: string): Promise<Payroll> {
    return this.updatePayroll(id, {
      status: "REJECTED",
      rejectionReason: reason,
      approvedBy: "admin-001",
      approvedByName: "Admin User",
      approvedAt: new Date().toISOString(),
    });
  }

  markPayrollAsPaid(id: string): Promise<Payroll> {
    return this.updatePayroll(id, {
      status: "PAID",
    });
  }

  deletePayroll(id: string): Promise<void> {
    this.payrolls = this.payrolls.filter((p) => p.id !== id);
    return Promise.resolve();
  }
}

export const payrollService = new PayrollService();
