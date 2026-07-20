import { LocalDataService } from "./baseService";
import type { Payroll } from "@/types/payroll";
import { dummyPayroll } from "@/data/payroll";

class PayrollService extends LocalDataService<Payroll> {
  getDummyData(): Payroll[] {
    return dummyPayroll;
  }
}

export const payrollService = new PayrollService();
