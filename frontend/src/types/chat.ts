import { CitationData } from "./evidence";

export interface ChatMessageData {
  id: string;
  sender: "user" | "assistant";
  text: string;
  citations?: CitationData[];
  abstained?: boolean;
  latency_ms?: number;
}

export interface ChatApiResponse {
  answer: string;
  citations: CitationData[];
  abstained: boolean;
  model: string;
  latency_ms: number;
}
