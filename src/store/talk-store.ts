import type { TalkType } from "@/types";
import { create } from "zustand";

export type TalkStore = {
  positive: TalkType[];
  setPositive: (talks: TalkType[]) => void;
  negative: TalkType[];
  setNegative: (talks: TalkType[]) => void;
  generic: TalkType[];
  setGeneric: (talks: TalkType[]) => void;
  question: TalkType[];
  setQuestion: (talks: TalkType[]) => void;
  currentTalks: TalkType[];
  setCurrentTalks: (talks: TalkType[]) => void;
};

export const useTalkStore = create<TalkStore>((set) => ({
  positive: [],
  setPositive: (talks: TalkType[]) => set({ positive: talks }),
  negative: [],
  setNegative: (talks: TalkType[]) => set({ negative: talks }),
  generic: [],
  setGeneric: (talks: TalkType[]) => set({ generic: talks }),
  question: [],
  setQuestion: (talks: TalkType[]) => set({ question: talks }),
  currentTalks: [],
  setCurrentTalks: (talks: TalkType[]) => set({ currentTalks: talks }),
}));
