import { api } from "@/lib/axios";
import type { TalkType } from "@/types";

class TalkService {
  async getGenericTalks(): Promise<TalkType[]> {
    const response = await api.get<TalkType[]>(`/talks`);
    return response.data;
  }
}

export const talkService = new TalkService();
