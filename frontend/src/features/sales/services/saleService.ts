import type { Sale } from "../types/sale";
import { dummySales } from "../data/dummy-sales";

// Simulating API service
class SaleService {
  async getSales(): Promise<Sale[]> {
    // Return dummy data
    return dummySales;
  }

  async getSaleById(id: string): Promise<Sale | null> {
    const sale = dummySales.find(s => s.id === id);
    return sale || null;
  }

  async createSale(data: Partial<Sale>): Promise<Sale> {
    const newSale = {
      ...data,
      id: `sale-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as Sale;
    dummySales.push(newSale);
    return newSale;
  }

  async updateSale(id: string, data: Partial<Sale>): Promise<Sale> {
    const index = dummySales.findIndex(s => s.id === id);
    if (index === -1) throw new Error("Sale not found");
    
    dummySales[index] = { ...dummySales[index], ...data, updatedAt: new Date().toISOString() };
    return dummySales[index];
  }

  async deleteSale(id: string): Promise<void> {
    const index = dummySales.findIndex(s => s.id === id);
    if (index !== -1) {
      dummySales.splice(index, 1);
    }
  }
}

export const saleService = new SaleService();
