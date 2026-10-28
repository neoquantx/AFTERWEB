from fastapi import APIRouter
from typing import List
from app.models.schemas import CityResponse, CityNode, CityRoute
from app.db.database import get_db_connection

router = APIRouter(tags=["City"])


@router.get("/city", response_model=CityResponse)
def get_city():
    """Return nodes, observed link routes, and district coordinates for the 3D map."""
    with get_db_connection() as conn:
        # 1. Fetch sites (districts)
        site_rows = conn.execute("SELECT id, slug, title, era_label, district_color FROM sites").fetchall()
        districts = [dict(r) for r in site_rows]

        # 2. Fetch pages (captured nodes)
        page_rows = conn.execute("""
            SELECT 
                p.id, p.site_id, p.title, p.canonical_url,
                cap.archive_url, cap.timestamp, cap.fetch_state,
                s.district_color
            FROM pages p
            JOIN captures cap ON cap.id = p.capture_id
            JOIN sites s ON s.id = p.site_id
        """).fetchall()

        nodes: List[CityNode] = []
        node_pos_map = {}

        # Lay out nodes deterministically per district
        district_indices = {d["id"]: i for i, d in enumerate(districts)}
        district_counts = {d["id"]: 0 for d in districts}

        for r in page_rows:
            dist_idx = district_indices.get(r["site_id"], 0)
            item_idx = district_counts[r["site_id"]]
            district_counts[r["site_id"]] += 1

            # Grid offset: each district has its own zone
            base_x = (dist_idx - 1) * 35.0
            pos_x = base_x + (item_idx % 4) * 7.0 - 10.0
            pos_z = (item_idx // 4) * 8.0 - 5.0

            node_pos_map[r["id"]] = [pos_x, 0.0, pos_z]

            nodes.append(CityNode(
                id=r["id"],
                site_id=r["site_id"],
                label=r["title"][:24],
                title=r["title"],
                original_url=r["canonical_url"],
                archive_url=r["archive_url"],
                timestamp=r["timestamp"],
                node_type="captured" if r["fetch_state"] == "captured" else "alternate_capture",
                lookup_state=r["fetch_state"],
                position=[pos_x, 0.0, pos_z],
                district_color=r["district_color"]
            ))

        # 3. Fetch observed links & ghost plots
        edge_rows = conn.execute("""
            SELECT 
                le.id, le.source_page_id, le.anchor_text, le.target_url,
                le.edge_type, le.lookup_state, le.target_site_id,
                p.site_id AS source_site_id, s.district_color
            FROM link_edges le
            JOIN pages p ON p.id = le.source_page_id
            JOIN sites s ON s.id = p.site_id
        """).fetchall()

        routes: List[CityRoute] = []
        ghost_counter = 0

        for r in edge_rows:
            target_node_id = f"ghost_{r['id']}"
            
            # If target has no page node, instantiate a ghost plot node
            if target_node_id not in node_pos_map:
                source_pos = node_pos_map.get(r["source_page_id"], [0.0, 0.0, 0.0])
                ghost_counter += 1
                # Place ghost plot near source
                ghost_x = source_pos[0] + 5.0 + (ghost_counter % 3) * 3.0
                ghost_z = source_pos[2] + 4.0 + (ghost_counter % 2) * 3.0
                
                node_pos_map[target_node_id] = [ghost_x, 0.0, ghost_z]

                nodes.append(CityNode(
                    id=target_node_id,
                    site_id=r["source_site_id"],
                    label=r["anchor_text"][:24],
                    title=f"Ghost: {r['anchor_text']}",
                    original_url=r["target_url"],
                    node_type="ghost_plot",
                    lookup_state=r["lookup_state"],
                    position=[ghost_x, 0.0, ghost_z],
                    district_color="#9AA2B1"
                ))

            routes.append(CityRoute(
                id=r["id"],
                source_node_id=r["source_page_id"],
                target_node_id=target_node_id,
                anchor_text=r["anchor_text"],
                target_url=r["target_url"],
                edge_type=r["edge_type"],
                lookup_state=r["lookup_state"]
            ))

        return CityResponse(
            districts=districts,
            nodes=nodes,
            routes=routes
        )
