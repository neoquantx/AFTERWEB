export type NodeState = "captured" | "alternate_capture" | "ghost_plot";

export interface CityNodeData {
  id: string;
  site_id: string;
  label: string;
  title: string;
  original_url: string;
  archive_url?: string;
  timestamp?: string;
  node_type: NodeState;
  lookup_state: string;
  position: [number, number, number];
  district_color: string;
}

export interface CityRouteData {
  id: string;
  source_node_id: string;
  target_node_id: string;
  anchor_text: string;
  target_url: string;
  edge_type: "observed" | "inferred";
  lookup_state: "captured" | "alternate_capture" | "not_found_in_query" | "lookup_failed" | "not_checked";
}

export interface DistrictData {
  id: string;
  slug: string;
  title: string;
  era_label: string;
  district_color: string;
}

export interface CityDataResponse {
  districts: DistrictData[];
  nodes: CityNodeData[];
  routes: CityRouteData[];
}
