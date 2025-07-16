import type {
  MedicalHistoryType,
  MedicalSceneryType,
  MedicalType,
} from "@/types";
import { create } from "zustand";

export type SimulationConfigStore = {
  medical?: MedicalType;
  medicalScenery?: MedicalSceneryType;
  medicalHistory?: MedicalHistoryType;
  addMedical: (medicalName: MedicalType) => void;
  addMedicalScenery: (medicalScenery: MedicalSceneryType) => void;
  addMedicalHistory: (medicalHistory: MedicalHistoryType) => void;
};

export const useSimulationConfigStore = create<SimulationConfigStore>(
  (set) => ({
    medical: undefined,
    medicalScenery: undefined,
    medicalHistory: undefined,
    addMedical: (medical: MedicalType) => set({ medical }),
    addMedicalScenery: (medicalScenery?: MedicalSceneryType) =>
      set({ medicalScenery }),
    addMedicalHistory: (medicalHistory?: MedicalHistoryType) =>
      set({ medicalHistory }),
  })
);
