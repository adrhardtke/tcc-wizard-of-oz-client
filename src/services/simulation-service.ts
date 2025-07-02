import { api } from "@/lib/axios";
import type { SimulationType } from "@/types";

class SimulationService {
  async find(id: string): Promise<SimulationType> {
    const response = await api.get<SimulationType>(`/simulations/${id}`);
    return response.data;
  }

  async sendTalk(id: string): Promise<void> {
    await api.get<SimulationType>(`/talks/${id}`);
  }

  async sendReaction(id: string): Promise<void> {
    await api.get<SimulationType>(`/reactions/${id}`);
  }

  async sendSymptom(id: string): Promise<void> {
    await api.get<SimulationType>(`/symptoms/${id}`);
  }
}

export const simulationService = new SimulationService();
