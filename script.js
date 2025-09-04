// ====== TUS CANALES ======
const CHANNELS = [
  { name: "Todo Noticias (TN)", url: "https://bestleague.one/cvatt.html?get=VG9kb05vdGljaWFz" },
  { name: "Telefe HD",          url: "https://bestleague.one/cvatt.html?get=VGVsZWZlSEQ=" },
  { name: "Canal 9",            url: "https://bestleague.one/cvatt.html?get=Q2FuYWw5" },
  { name: "Canal 26 HD",        url: "https://bestleague.one/cvatt.html?get=MjZfVFZfSEQ" },
  { name: "Crónica TV",         url: "https://bestleague.one/cvatt.html?get=Q3JvbmljYVRW" },
  { name: "Artear HD",          url: "https://bestleague.one/cvatt.html?get=QXJ0ZWFySEQ" },
  { name: "Cartoon Network",    url: "https://bestleague.one/cvatt.html?get=Q2FydG9vbk5ldHdvcms=" },
  { name: "C5N",                url: "https://bestleague.one/cvatt.html?get=QzVO" },
  { name: "TyC Sports",         url: "https://bestleague.one/cvatt.html?get=VHlDU3BvcnQ" },
  { name: "Canal RU 76",        url: "https://rereyano.ru/player/3/76" },
  { name: "TNT Sports HD",      url: "https://bestleague.one/cvatt.html?get=VE5UX1Nwb3J0c19IRA&lang=1" },
  { name: "Canal RU 94",        url: "https://rereyano.ru/player/3/94" },
];

const iframe   = document.getElementById("player-frame");
const badge    = document.getElementById("badge");
const prevBtn  = document.getElementById("prevBtn");
const nextBtn  = document.getElementById("nextBtn");
const fsBtn    = document.getElementById("fsBtn");
const reloadBtn= document.getElementById("reloadBtn");
const listBtn  = document.getElementById("listBtn");
const drawer   = document.getElementById("drawer");
const grid     = document.getElementById("channelGrid");
const startOverlay = document.getElementById("startOverlay");
const startBtn  = document.getElementById("startBtn");
const controls  = document.getElementById("controls");

let current = 0;

function loadChannel(i) {
  current = (i + CHANNELS.length) % CHANNELS.length;
  const ch = CHANNELS[current];
  badge.textContent = `Canal: ${ch.name}`;
  iframe.src = ch.url;
}

function buildGrid() {
  grid.innerHTML = "";
  CHANNELS.forEach((ch, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = `${i + 1}. ${ch.name}`;
    div.onclick = () => { loadChannel(i); toggleDrawer(false); };
    grid.appendChild(div);
  });
}
buildGrid();

function toggleDrawer(open) {
  drawer.classList.toggle("open", open ?? !drawer.classList.contains("open"));
  drawer.setAttribute("aria-hidden", drawer.classList.contains("open") ? "false" : "true");
}

prevBtn.onclick   = () => loadChannel(current - 1);
nextBtn.onclick   = () => loadChannel(current + 1);
reloadBtn.onclick = () => (iframe.src = iframe.src);
listBtn.onclick   = () => toggleDrawer();

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
  else document.exitFullscreen().catch(()=>{});
});

async function startPlayback() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(()=>{});
    }
  } catch {}
  controls.hidden = false;
  badge.hidden = false;
  startOverlay.remove();
  loadChannel(0);
}
startBtn.addEventListener("click", startPlayback);
startOverlay.addEventListener("keydown", (e) => { if (e.key === "Enter") startPlayback(); });

document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (k === "ArrowLeft")  loadChannel(current - 1);
  if (k === "ArrowRight") loadChannel(current + 1);
  if (k.toLowerCase?.() === "f") fsBtn.click();
  if (/^[1-9]$/.test(k)) { const idx = parseInt(k,10)-1; if (CHANNELS[idx]) loadChannel(idx); }
});

let sx = null;
document.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive:true });
document.addEventListener("touchend", (e) => {
  if (sx === null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (dx > 50)  loadChannel(current - 1);   // desliza derecha → anterior
  if (dx < -50) loadChannel(current + 1);   // desliza izquierda → siguiente
  sx = null;
}, { passive:true });

startBtn.focus();
