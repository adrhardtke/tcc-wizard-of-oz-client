import type {
  MedicalHistoryType,
  MedicalSceneryType,
  MedicalType,
} from "@/types";

export const MedicalMock: MedicalType[] = [
  {
    id: "mock-medical-id",
    name: "John Doe",
  },
  {
    id: "mock-medical-id-2",
    name: "Jane Smith",
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
        description: "Dor abdominal intensa, febre moderada.",
      },
      {
        id: "mock-item-2",
        title: "Queixas atuais",
        description: "Desmaio recente, dor ao urinar.",
      },
    ],
  },
  {
    id: "mock-scenery-id-2",
    title: "Paciente com pneumonia",
    list: [
      {
        id: "mock-item-3",
        title: "Sintomas iniciais:",
        description: "Tosse persistente, febre alta.",
      },
      {
        id: "mock-item-4",
        title: "Queixas atuais",
        description: "Dificuldade para respirar, dor no peito.",
      },
    ],
  },
];

export const MedicalHistoryMock: MedicalHistoryType[] = [
  {
    id: "mock-history-id",
    title: "Paciente alergico a medicação",
    list: [
      {
        id: "mock-history-item-2",
        title: "Alergia a penicilina",
      },
    ],
  },
  {
    id: "mock-history-id-2",
    title: "Paciente com histórico de diabetes",
    list: [
      {
        id: "mock-history-item-3",
        title: "Diabetes tipo 2 diagnosticado em 2015",
      },
    ],
  },
  {
    id: "mock-history-id-3",
    title: "Sem comorbidades conhecidas",
    list: [],
  },
];
