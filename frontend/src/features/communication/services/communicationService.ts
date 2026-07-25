import type { Communication } from "../types/communication";
import { dummyCommunications } from "../data/dummy-communications";

class CommunicationService {
  private communications: Communication[] = [...dummyCommunications];

  async getCommunications(): Promise<Communication[]> {
    return [...this.communications];
  }

  async getCommunicationById(id: string): Promise<Communication | null> {
    const communication = this.communications.find((c) => c.id === id);
    return communication || null;
  }

  async createCommunication(data: Partial<Communication>): Promise<Communication> {
    const newCommunication: Communication = {
      ...data,
      id: `comm-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as Communication;
    this.communications.push(newCommunication);
    return newCommunication;
  }

  async updateCommunication(id: string, data: Partial<Communication>): Promise<Communication> {
    const index = this.communications.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Communication not found");

    this.communications[index] = {
      ...this.communications[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.communications[index];
  }

  async deleteCommunication(id: string): Promise<void> {
    const index = this.communications.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.communications.splice(index, 1);
    }
  }
}

export const communicationService = new CommunicationService();

