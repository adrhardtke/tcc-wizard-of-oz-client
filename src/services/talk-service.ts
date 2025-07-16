import { api } from "@/lib/axios";
import type { TalkType } from "@/types";

class TalkService {
  async getPositiveTalks(): Promise<TalkType[]> {
    const response = await api.get<TalkType[]>(`/talks/positive`);
    return response.data;
  }

  async getNegativeTalks(): Promise<TalkType[]> {
    const response = await api.get<TalkType[]>(`/talks/negative`);
    return response.data;
  }

  async getGenericTalks(): Promise<TalkType[]> {
    const response = await api.get<TalkType[]>(`/talks/neutral`);
    return response.data;
  }

  async getQuestionTalks(): Promise<TalkType[]> {
    const response = await api.get<TalkType[]>(`/talks/question`);
    return response.data;
  }

  async getLatestTalks(talkId: string): Promise<TalkType[]> {
    const response = await api.get<TalkType[]>(`/talks/latest/${talkId}`);
    return response.data;
  }
}

export const talkService = new TalkService();
