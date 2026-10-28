import sys
from app.db.database import get_db_connection


def validate_pack():
    print("=== Validating Local Archive Pack ===")
    errors = 0

    with get_db_connection() as conn:
        # Check sites
        sites = conn.execute("SELECT COUNT(*) FROM sites").fetchone()[0]
        print(f"Sites: {sites} (Target: 3)")
        if sites != 3:
            print("  Warning: Expected exactly 3 curated neighborhoods.")
            errors += 1

        # Check pages
        pages = conn.execute("SELECT COUNT(*) FROM pages").fetchone()[0]
        print(f"Pages indexed: {pages}")
        if pages == 0:
            print("  Error: No pages found in database.")
            errors += 1

        # Check chunks and FTS
        chunks = conn.execute("SELECT COUNT(*) FROM chunks").fetchone()[0]
        print(f"Chunks indexed: {chunks}")
        if chunks == 0:
            print("  Error: No text chunks found in database.")
            errors += 1

        # Check observed routes
        links = conn.execute("SELECT COUNT(*) FROM link_edges").fetchone()[0]
        ghost_plots = conn.execute("SELECT COUNT(*) FROM link_edges WHERE lookup_state = 'not_found_in_query'").fetchone()[0]
        print(f"Observed links: {links}")
        print(f"Ghost plots ('not_found_in_query'): {ghost_plots}")

        if links == 0:
            print("  Error: No observed routes extracted.")
            errors += 1

    if errors == 0:
        print("\n✓ Archive pack validation PASSED. Ready for offline exploration.")
        sys.exit(0)
    else:
        print(f"\n✗ Validation failed with {errors} issue(s).")
        sys.exit(1)


if __name__ == "__main__":
    validate_pack()
