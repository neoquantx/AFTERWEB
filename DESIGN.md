# DESIGN.md: AFTERWEB Design System & Visual Specification
*Source of Truth: Google Stitch Design System ("Cozy Haunted Web Diorama")*

---

## 1. Stitch Project & Screen Registry

- **Stitch Project Name**: `AFTERWEB - Cozy Haunted Internet Village`
- **Stitch Project Resource**: `projects/4857621467508605728`
- **Stitch Project ID**: `4857621467508605728`
- **Design System Asset**: `assets/947622d13e694656818f9a4cb3337a02` (`Cozy Haunted Web Diorama`)
- **Theme Color Mode**: `LIGHT`
- **Primary Aesthetic**: Tactile Storybook Skeuomorphism + Whimsical Vintage-Web Neomorphism

### Coordinated Screens Created in Stitch:
1. **Screen 1: Main Exploration Screen (Immersive 3D Village & Field Journal)**
   - Resource: `projects/4857621467508605728/screens/a19be205356446a1a437af295f9bc548`
   - HTML File: `projects/4857621467508605728/files/9b6148fefb8543a9b29d16499297909e`
   - Screenshot File: `projects/4857621467508605728/files/04dde25616e049c5b456a4b725e72b5a`

2. **Screen 2: Object Inspection Screen (Selected Cottage & Conduits)**
   - Resource: `projects/4857621467508605728/screens/0688f11cbf0d4bc5ad66e295db2ccc97`
   - HTML File: `projects/4857621467508605728/files/061dc3b392d74a408181ef230583fdeb`
   - Screenshot File: `projects/4857621467508605728/files/f26900b6737c493e8b04a3d0bf41cf7c`

3. **Screen 3: Ghost Archivist AI Terminal (Curator Panel)**
   - Resource: `projects/4857621467508605728/screens/a4f7812c9d4c453c8253ffa9e444b6d7`
   - HTML File: `projects/4857621467508605728/files/280caa1380b7467b8b3ff3661381b19a`
   - Screenshot File: `projects/4857621467508605728/files/5f6213e12be148f2beeac13b3fe36d6a`

4. **Screen 4: 2D Dossier & Field Scrapbook (Archive Browser View)**
   - Resource: `projects/4857621467508605728/screens/fc37c574912e4ee58912fb58e1963b70`
   - HTML File: `projects/4857621467508605728/files/407a3a246e2e496fb83606d0d9e20f27`
   - Screenshot File: `projects/4857621467508605728/files/bb5f2c52e8ee4f5583fc2bca10a1e958`

---

## 2. Color Palette & Design Tokens

### Core Surfaces & Inks
| Token | Hex | Role |
| :--- | :--- | :--- |
| `surface` | `#FFF9F0` | Warm ivory paperboard (primary interface cards, headers, drawers) |
| `surface-container-low` | `#F7F1FF` | Tinted parchment underlay for drawers and toolbars |
| `surface-container` | `#F2EBFF` | Soft lavender container fill |
| `surface-container-high`| `#ECE4FE` | Segmented pill track backgrounds |
| `on-surface` | `#1D192B` / `#393548` | Deep charcoal ink for high-contrast, comfortable reading |
| `on-surface-variant` | `#49454F` / `#6E6780` | Muted secondary charcoal for descriptions and metadata |
| `outline-variant` | `#CAC4D0` / `#EEE7DB` | Subtle hairline dividers and card outlines |

### Whimsical Truth States & Accents
| Token | Hex | Role |
| :--- | :--- | :--- |
| `primary` / `primary-container` | `#B6A5E8` | Lilac dusk: Spiritual luminescence, active buttons, ghost badges |
| `primary-dark` | `#645592` | Deep lilac text on light containers |
| `secondary-container` | `#F2AE78` / `#FDB881` | Pumpkin pastel: Hearth-glow, unread notes, 'Ask' action buttons |
| `tertiary` / `tertiary-fixed` | `#B9E5D1` / `#C0ECD8` | Ghost mint: Preserved 1990s website snapshots, living links |
| `butter-yellow` | `#F5DB91` | Warm window light, golden fireflies, mid-air lantern glows |
| `peach-bubble` | `#FFD6C2` / `#FDECDB` | User speech bubbles in the Ghost Archivist chat |
| `diorama-canvas` | `#191C2B` | Atmospheric twilight dusk canvas for the Three.js 3D viewport |

---

## 3. Typography Hierarchy

Imported from Google Fonts:
- **Headlines (`Epilogue`)**: Sculptural storybook title voice with gentle curves and sturdy terminals.
  - Display Hero: `56px`, `lineHeight: 64px`, `fontWeight: 700`, `letterSpacing: -0.02em`
  - Headline Lg: `32px`, `lineHeight: 40px`, `fontWeight: 600`, `letterSpacing: -0.015em`
  - Headline Md: `24px`, `lineHeight: 32px`, `fontWeight: 600`
  - Headline Sm: `20px`, `lineHeight: 28px`, `fontWeight: 600`
- **Body (`Plus Jakarta Sans`)**: Soft-edged humanist geometry for effortless reading.
  - Body Lg: `18px`, `lineHeight: 28px`, `fontWeight: 400`
  - Body Md: `15px`, `lineHeight: 24px`, `fontWeight: 400`
  - Body Sm: `13px`, `lineHeight: 20px`, `fontWeight: 400`
- **Diagnostic Metadata (`Space Mono`)**: Archaeological terminal voice for URLs, CDX timestamps, chunk IDs, and citations.
  - Label Lg: `14px`, `lineHeight: 20px`, `fontWeight: 700`, `letterSpacing: 0.02em`
  - Label Md: `12px`, `lineHeight: 16px`, `fontWeight: 400`, `letterSpacing: 0.04em`
  - Label Sm: `10px`, `lineHeight: 14px`, `fontWeight: 400`, `letterSpacing: 0.06em`

---

## 4. Component & Shape Specifications

### Buttons
- **Pill Primitives (`rounded-full` / `9999px`)**:
  - Primary ('Light Lantern', 'Ask'): `#F2AE78` background, `#393548` text, hover scale `1.02x` with candlelit shadow.
  - Secondary ('Examine Artifact', 'Inspect'): Ivory `#FFF9F0`, border `1.5px solid #B6A5E8`, text `#393548`.
  - Segmented View Toggle: Track in `#ECE4FE`, active pill in `#B6A5E8` with `#473873` text and soft drop shadow.

### Status Pills & Postage Stamp Badges
- **Status Pills (`rounded-full`, `4px 12px` pad, Space Mono text)**:
  - Living Snapshot: `#B9E5D1` background, `#1D4A3E` text, `🏡 PRESERVED SITE`.
  - Ghost Spirit: `#F2AE78` / `#E9E2FF` background, `👻 GHOST LOT • UNCAPTURED`.
  - Lantern Path: `#F5DB91` background, `🏮 LANTERN TRAIL`.
- **Citation Chips (`[E1]`, `[E2]`)**:
  - Postage stamp rectangular badge with dashed border, butter-yellow `#F5DB91` fill, transition to solid `#E8984E` on hover.

### Drawers & Cards
- **Large Containers (`rounded-2xl` / `2rem` / `32px`)**:
  - Background `#FFF9F0` with `1px solid rgba(182, 165, 232, 0.35)` and diffused ambient shadow `0 8px 24px -4px rgba(25, 28, 43, 0.12)`.
  - Contextual Evidence Drawer: `380px` wide, pinned right, smooth internal scroll.
  - Curator Panel: `420px` wide, pinned right with conversational peach and cream bubbles.

---

## 5. Three.js 3D Diorama Architecture

Stitch defined the exact spatial composition for the center-stage viewport:
1. **Atmosphere**:
   - Background Color: `#191C2B`
   - Fog: `THREE.FogExp2(0x191c2b, 0.015)`
   - Camera: Isometric-like perspective `position: [0, 18, 38]`, `lookAt: [0, 2, 0]`.
2. **Lighting**:
   - Ambient Light: `0xd5c9f5`, intensity `0.85`
   - Moon Directional Light: `0xe4d8ff`, intensity `1.2`, cast shadow
   - Warm Point Lights: `0xf5db91` (left), `0xf2ae78` (right), `0xb9e5d1` (center)
3. **The Three Floating Village Islands**:
   - Island Plinths: Grassy cylinder top (`radius: 6.5 - 7.5`, `height: 1.2`), rocky earthen cone underside (`cliffMat: 0x2b2438`).
   - Space Jam Cinema Cottage: Timber walls (`0xded2c0`), pumpkin cone roof (`0xf2ae78`), glowing screen window, twin V-antennas.
   - GeoCities Homestead Cottage: Mint walls (`0xb9e5d1`), lavender pitched roof (`0xb6a5e8`), CRT monitor window with glowing screen, flowerbox.
   - NCSA Mosaic Library: Ivory stone body (`0xfff9f0`), lilac dome (`0xb6a5e8`), arched portico with 4 classical columns.
4. **Friendly 3D Ghosts & Ghost Plots**:
   - 3D Ghost Mesh: Smooth rounded sphere head + wavy cylinder skirt + two floating arm spheres + cute dark dot eyes + pink blush marks (`#ffa5bb`).
   - Bobbing animation: Sinusoidal vertical hover with slight wobble.
   - Ghost Plot Base: Circular tilled soil patch + wooden signboard with `?` anchor text.
5. **Lantern Arcs & Fairy Fireflies**:
   - Catenary quadratic bezier arcs between islands with mid-air floating lanterns.
   - 90 golden fireflies drifting with subtle horizontal and vertical particle oscillation.

---

## 6. Implementation Notes & Architecture Compatibility

- **Backend Integration**: All FastAPI endpoints (`/api/v1/city`, `/api/v1/evidence/{id}`, `/api/v1/chat`, `/api/v1/health`) remain untouched and supply real SQLite FTS5 data and Ollama inference.
- **Font Availability**: `Epilogue`, `Plus Jakarta Sans`, and `Space Mono` are loaded via Google Fonts in `index.html`.
- **CSS Architecture**: Implemented via CSS variables in `variables.css` and CSS Modules to ensure zero regression in React 19 / Vite.
