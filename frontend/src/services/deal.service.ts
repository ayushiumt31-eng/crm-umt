import { LocalDataService } from "./baseService";
import type { Deal } from "@/types/sales";
import { dummyDeals } from "@/data/deals";

class DealService extends LocalDataService<Deal> {
  getDummyData(): Deal[] {
    return dummyDeals;
  }
}

export const dealService = new DealService();
