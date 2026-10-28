import { CityDataResponse } from "../types/city";
import { EvidenceSearchResponse } from "../types/evidence";
import { ChatApiResponse } from "../types/chat";

const API_BASE = "/api";

export interface HealthData {
  api: string;
  database: string;
  archive_pack: string;
  ollama: string;
  model: string;
  model_available: boolean;
  internet_required_for_core_flow: boolean;
}

export async function fetchHealth(): Promise<HealthData> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}

export async function fetchCityData(): Promise<CityDataResponse> {
  const res = await fetch(`${API_BASE}/city`);
  if (!res.ok) throw new Error("Failed to load city map");
  return res.json();
}

export async function searchEvidence(q: string, siteId?: string): Promise<EvidenceSearchResponse> {
  const params = new URLSearchParams({ q });
  if (siteId) params.append("site_id", siteId);
  const res = await fetch(`${API_BASE}/evidence?${params.toString()}`);
  if (!res.ok) throw new Error("Evidence search failed");
  return res.json();
}

export async function sendChatMessage(question: string, activeNodeId?: string): Promise<ChatApiResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, active_node_id: activeNodeId })
  });
  if (!res.ok) throw new Error("Chat request failed");
  return res.json();
}
