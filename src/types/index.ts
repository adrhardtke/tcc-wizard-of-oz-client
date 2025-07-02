export type SimulationActionButtonType = {
  id: string;
  title: string;
  unity_code: string;
};

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

export interface TalkType extends SimulationActionButtonType {
  id: string;
  title: string;
  description: string;
  unity_code: string;
}

export interface ReactionType extends SimulationActionButtonType {
  id: string;
  title: string;
  description: string;
  unity_code: string;
}

export interface SymptomType extends SimulationActionButtonType {
  id: string;
  title: string;
  description: string;
  unity_code: string;
}

export type SimulationType = {
  id: string;
  title: string;
  medical: {
    name: string;
  };
  scenery: {
    code: string;
    title: string;
  };
  historical: {
    code: string;
    title: string;
  };
  talks: TalkType[];
  reactions: ReactionType[];
  symptoms: SymptomType[];
};
