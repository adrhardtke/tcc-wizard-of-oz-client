export type MedicalType = {
  id: string;
  name: string;
};

export type MedicalSceneryType = {
  id: string;
  title: string;
  list: {
    id: string;
    title: string;
    description?: string;
  }[];
};

export type MedicalHistoryType = {
  id: string;
  title: string;
  list: {
    id: string;
    title: string;
    description?: string;
  }[];
};
