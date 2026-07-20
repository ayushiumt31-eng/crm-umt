import { LocalDataService } from "./baseService";
import type { Report } from "@/types/reports";
import { dummyReports } from "@/data/reports";

class ReportService extends LocalDataService<Report> {
  getDummyData(): Report[] {
    return dummyReports;
  }
}

export const reportService = new ReportService();
