import type {
  MedicalHistoryType,
  MedicalSceneryType,
  MedicalType,
} from "@/types";

export const MedicalMock: MedicalType[] = [
  {
    id: "mock-medical-id",
    name: "John Smith",
  },
];

export const MedicalSceneryMock: MedicalSceneryType[] = [
  {
    id: "mock-scenery-id",
    title: "Paciente com apendicite",
    list: [
      {
        id: "mock-item-1",
        title: "Sintomas iniciais:",
        description:
          "Dor abdominal difusa, principalmente na região inferior direita. Náusea, falta de apetite e desconforto ao caminhar.",
      },
      {
        id: "mock-item-2",
        title: "Queixas atuais",
        description:
          "Dor abdominal em progressão, sensibilidade ao toque, náusea persistente, dificuldade para dormir.",
      },
    ],
  },
];

export const MedicalHistoryMock: MedicalHistoryType[] = [
  {
    id: "mock-history-id-3",
    title: "Paciente sem doenças prévias conhecidas, sem alergias.",
    list: [],
  },
];
