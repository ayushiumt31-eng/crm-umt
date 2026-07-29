import type { SalaryStructure } from "../types/salaryStructure";
import { dummySalaryStructures, calculateGrossSalary, calculateTotalDeductions, calculateNetSalary } from "../data/dummy-salary-structures";

class SalaryStructureService {
  private structures: SalaryStructure[] = [...dummySalaryStructures];

  getSalaryStructures(): Promise<SalaryStructure[]> {
    return Promise.resolve([...this.structures]);
  }

  getSalaryStructureById(id: string): Promise<SalaryStructure | undefined> {
    return Promise.resolve(this.structures.find((s) => s.id === id));
  }

  createSalaryStructure(payload: Omit<SalaryStructure, "id" | "grossSalary" | "totalDeductions" | "netSalary" | "createdAt" | "updatedAt">): Promise<SalaryStructure> {
    const grossSalary = calculateGrossSalary({
      basicSalary: payload.basicSalary,
      hra: payload.hra,
      conveyanceAllowance: payload.conveyanceAllowance,
      medicalAllowance: payload.medicalAllowance,
      specialAllowance: payload.specialAllowance,
      otherAllowances: payload.otherAllowances,
      bonus: payload.bonus,
    });
    const totalDeductions = calculateTotalDeductions({
      providentFund: payload.providentFund,
      professionalTax: payload.professionalTax,
      incomeTax: payload.incomeTax,
      otherDeductions: payload.otherDeductions,
    });
    const netSalary = calculateNetSalary(grossSalary, totalDeductions);

    const newStructure: SalaryStructure = {
      ...payload,
      id: `ss-${Date.now()}`,
      grossSalary,
      totalDeductions,
      netSalary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.structures.push(newStructure);
    return Promise.resolve(newStructure);
  }

  updateSalaryStructure(id: string, updates: Partial<SalaryStructure>): Promise<SalaryStructure> {
    const index = this.structures.findIndex((s) => s.id === id);
    if (index === -1) return Promise.reject(new Error("Salary structure not found"));

    const updated = { ...this.structures[index], ...updates };

    // Recalculate if salary components changed
    if (updates.basicSalary !== undefined || updates.hra !== undefined || 
        updates.conveyanceAllowance !== undefined || updates.medicalAllowance !== undefined ||
        updates.specialAllowance !== undefined || updates.otherAllowances !== undefined ||
        updates.bonus !== undefined) {
      updated.grossSalary = calculateGrossSalary(updated);
    }
    if (updates.providentFund !== undefined || updates.professionalTax !== undefined ||
        updates.incomeTax !== undefined || updates.otherDeductions !== undefined) {
      updated.totalDeductions = calculateTotalDeductions(updated);
    }
    if (updates.grossSalary !== undefined || updates.totalDeductions !== undefined) {
      updated.netSalary = calculateNetSalary(updated.grossSalary, updated.totalDeductions);
    }

    updated.updatedAt = new Date().toISOString();
    this.structures[index] = updated;
    return Promise.resolve(updated);
  }

  activateSalaryStructure(id: string): Promise<SalaryStructure> {
    return this.updateSalaryStructure(id, { status: "ACTIVE" });
  }

  deactivateSalaryStructure(id: string): Promise<SalaryStructure> {
    return this.updateSalaryStructure(id, { status: "INACTIVE" });
  }

  deleteSalaryStructure(id: string): Promise<void> {
    this.structures = this.structures.filter((s) => s.id !== id);
    return Promise.resolve();
  }
}

export const salaryStructureService = new SalaryStructureService();
