// JSON Prototype Builder (MVP)
await loadFonts();


const nodeIndex = {}; // name -> Node
const frames = data.frames || [];


// Layout frames in a grid
frames.forEach((f, i) => {
const frame = figma.createFrame();
frame.name = f.name;
frame.resize(f.size.w, f.size.h);
frame.fills = [{ type: "SOLID", color: hexToRGB(f.bg || "#FFFFFF") }];
frame.x = (i % 2) * (f.size.w + 80);
frame.y = Math.floor(i / 2) * (f.size.h + 80);
figma.currentPage.appendChild(frame);


// Layers
(f.layers || []).forEach(L => {
if (L.type === "text") {
makeText(frame, L.text, L.x, L.y, L.fontSize || 14, !!L.bold, L.opacity ?? 1, L.name);
} else if (L.type === "rect") {
makeRect(frame, L.x, L.y, L.w, L.h, L.fill || "#FFFFFF", L.radius || 0, L.stroke || null, L.name);
} else if (L.type === "button") {
makeButton(frame, L.x, L.y, L.w, L.h, L.label, L.name);
}
});


nodeIndex[f.name] = frame;
for (const child of frame.children) nodeIndex[child.name] = child;
});


// Hotspots (prototype links)
frames.forEach(f => {
(f.hotspots || []).forEach(h => {
const from = nodeIndex[h.from];
const to = nodeIndex[h.toFrame];
if (from && to) {
// Apply reaction
from.reactions = [{
action: { type: "NODE", destinationId: to.id, navigation: "NAVIGATE" },
trigger: { type: "ON_CLICK" }
}];
}
});
});
}


// UI bootstrap
figma.showUI(__html__, { width: 520, height: 420 });


figma.ui.onmessage = async (msg) => {
try {
if (msg.type === 'build') {
const data = JSON.parse(msg.json);
await buildFromJSON(data);
figma.notify('Prototype built ✅');
// Keep plugin open so user can rebuild if needed
}
} catch (e) {
figma.notify('Error: ' + e.message);
}
};