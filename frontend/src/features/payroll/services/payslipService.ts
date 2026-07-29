import type { Payslip } from "../types/payslip";
import { dummyPayslips } from "../data/dummy-payslips";

class PayslipService {
  private payslips: Payslip[] = [...dummyPayslips];

