# Productivity + Wellness MVP — Figma Prototype Builder


This repo contains a Figma plugin that builds a clickable prototype from a JSON spec.


## Quick Start
1. Clone this repo locally.
2. Open **Figma Desktop**.
3. Go to **Plugins → Development → Import plugin from manifest…** and select `plugin/manifest.json`.
4. Open any Figma file → **Plugins → Development → JSON Prototype Builder (MVP)**.
5. Paste the contents of `prototype/prototype.json` into the textarea → **Build**.


The plugin will create four frames with clickable hotspots: Board v1 → Wellness → Dashboard, and Board v1 → Board v2 (simulating task movement).


## JSON Schema (Minimal)
- `frames[]`: List of frames.
- `name`: Frame name.
- `size`: `{ w, h }` in px.
- `bg`: Background color (hex).
- `layers[]`: Drawn elements in Z-order.
- `type`: `text | rect | button`
- `name`: Node name (must be unique per frame for hotspot targets).
- Position/size fields depending on type.
- `hotspots[]`: Click navigation links.
- `from`: Node name (e.g., a button or card)
- `toFrame`: Destination frame name.


## Customize
- Edit `prototype/prototype.json` to change copy, layout, or flows.
- Extend `plugin/code.js` to support additional layer types (images, icons, etc.).


## Notes
- This uses Figma Plugin API to create nodes and set `reactions` for prototype links.
- Ensure **Internet access is not required** to run — everything is local.


## License
MIT — see `LICENSE`.