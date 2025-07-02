import type { SimulationType } from "@/types";
import { create } from "zustand";

export type SimulationStore = {
  simulation?: SimulationType;
  addSimulation: (simulation: SimulationType) => void;
  lastSymptom?: string;
  lastReaction?: string;
  setLastSymptom: (symptom: string) => void;
  setLastReaction: (reaction: string) => void;
};

export const useSimulationStore = create<SimulationStore>((set) => ({
  simulation: undefined,
  lastSymptom: "-",
  lastReaction: "-",
  addSimulation: (simulation: SimulationType) => set({ simulation }),
  setLastSymptom: (symptom: string) => set({ lastSymptom: symptom }),
  setLastReaction: (reaction: string) => set({ lastReaction: reaction }),
}));
