// NEXUS // High-Interactivity Dark Neumorphic Game Concept Generator

let isSpinning = false;
let turboMode = false;
const lockedReels = [false, false, false];
let currentCombination = null; // Başlangıçta null (çevrilmedi)
const STORAGE_KEY = "animesquad_jackpot_logs_v20";
let history = [];

// DOM Elemanları
const reelStrips = [
  document.getElementById("reel-strip-1"),
  document.getElementById("reel-strip-2"),
  document.getElementById("reel-strip-3")
];
const reelBoxes = [
  document.getElementById("reel-box-1"),
  document.getElementById("reel-box-2"),
  document.getElementById("reel-box-3")
];
const lockBtns = [
  document.getElementById("lock-btn-1"),
  document.getElementById("lock-btn-2"),
  document.getElementById("lock-btn-3")
];

const chassis = document.querySelector(".hardware-chassis");
const lever = document.getElementById("slot-lever");
const spinBtn = document.getElementById("spin-btn");
const captureBtn = document.getElementById("capture-btn");
const copyTextBtn = document.getElementById("copy-text-btn");
const turboBtn = document.getElementById("turbo-btn");
const muteBtn = document.getElementById("mute-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const toast = document.getElementById("toast-notice");
const shutterFlash = document.getElementById("shutter-flash");
const ideaCard = document.getElementById("capture-target");
const historyList = document.getElementById("history-list");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");
const sessionSeed = document.getElementById("session-seed");

// Başlangıç Soru İşareti Öğeleri
const PLACEHOLDERS = [
  { icon: "❓", name: "1. Tema", desc: "Kolu çekmeyi bekliyor..." },
  { icon: "❓", name: "2. Tema", desc: "Kolu çekmeyi bekliyor..." },
  { icon: "❓", name: "Oyun Türü", desc: "Kolu çekmeyi bekliyor..." }
];

// Mobilde 140px, Masaüstünde 195px
function getSlotHeight() {
  return window.innerWidth <= 768 ? 140 : 195;
}

function generateSeed() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, "0").slice(0, 4);
}

function populateReelStrip(stripEl, defaultItem) {
  stripEl.innerHTML = "";
  const itemEl = createSlotItemNode(defaultItem);
  stripEl.appendChild(itemEl);
  stripEl.style.transform = "translateY(0px)";
}

function createSlotItemNode(item) {
  const div = document.createElement("div");
  div.className = "slot-item";
  div.innerHTML = `
    <div class="slot-item-icon">${item.icon}</div>
    <div class="slot-item-title">${item.name}</div>
    <div class="slot-item-tag">${item.desc}</div>
  `;
  return div;
}

// ==========================================================================
// Mekanik Kol (Lever) Sürükle-Bırak (Drag-to-Pull) Fiziği
// ==========================================================================
function setupLeverDrag() {
  let isDragging = false;
  let startY = 0;
  const arm = lever.querySelector(".lever-arm-wrapper");

  lever.addEventListener("mousedown", (e) => {
    if (isSpinning) return;
    isDragging = true;
    startY = e.clientY;
    lever.style.cursor = "grabbing";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaY = Math.max(0, Math.min(e.clientY - startY, 70));
    const progress = deltaY / 70; // 0 to 1

    const rotX = progress * 65;
    const scaleY = 1 - progress * 0.6;
    const transY = progress * 45;

    arm.style.transition = "none";
    arm.style.transform = `rotateX(${rotX}deg) scaleY(${scaleY}) translateY(${transY}px)`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    lever.style.cursor = "grab";
    const deltaY = e.clientY - startY;

    // Yeterince aşağı çekildiyse çevir
    if (deltaY > 30 && !isSpinning) {
      arm.style.transition = "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
      arm.style.transform = "";
      spinJackpot();
    } else {
      // Geri yaylan
      arm.style.transition = "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
      arm.style.transform = "";
    }
  });
}

// 3D Tilt Efekti
function setup3DTilt() {
  if (!chassis || window.innerWidth <= 768) return;

  chassis.addEventListener("mousemove", (e) => {
    if (isSpinning) return;
    const rect = chassis.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 4;
    const rotY = (x / rect.width) * 4;

    chassis.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.006, 1.006, 1.006)`;
  });

  chassis.addEventListener("mouseleave", () => {
    chassis.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

// Başlangıç Kurulumu (Sayfa yenilendiğinde "?" leri koy)
function initEngine() {
  populateReelStrip(reelStrips[0], PLACEHOLDERS[0]);
  populateReelStrip(reelStrips[1], PLACEHOLDERS[1]);
  populateReelStrip(reelStrips[2], PLACEHOLDERS[2]);

  currentCombination = null;
  captureBtn.disabled = true;
  copyTextBtn.disabled = true;

  setup3DTilt();
  setupLeverDrag();

  // Kilit Dinleyicileri
  lockBtns.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isSpinning) return;
      if (!currentCombination) {
        showToast("⚠️ Çarkları kilitlemeden önce ilk kez kolu çekmelisin!");
        return;
      }
      lockedReels[idx] = !lockedReels[idx];
      btn.classList.toggle("locked", lockedReels[idx]);
      btn.querySelector(".lock-text").innerText = lockedReels[idx] ? "LOCKED" : "LOCK";
      btn.querySelector(".lock-icon").innerText = lockedReels[idx] ? "🔐" : "🔒";
      window.soundFX.playTick();
    });
  });

  // Hover sesleri
  document.querySelectorAll(".spin-btn, .capture-btn, .tool-btn, .lock-btn").forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (!isSpinning) window.soundFX.playTick();
    });
  });

  // Cihazdaki kayıtlı logları yükle
  loadHistoryFromStorage();

  // Geçmişi Temizle Butonu
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearAllHistory);
  }
}

// Fikir Kartını Güncelle (Sade, kısıtlamasız, temiz)
function updateIdeaCard(t1, t2, genre) {
  currentCombination = { t1, t2, genre };
  const pitch = generatePitch(t1, t2, genre);

  document.getElementById("tag-t1").innerHTML = `${t1.icon} ${t1.name}`;
  document.getElementById("tag-t2").innerHTML = `${t2.icon} ${t2.name}`;
  document.getElementById("tag-genre").innerHTML = `${genre.icon} ${genre.name}`;

  document.getElementById("idea-title").innerText = pitch.title;
  document.getElementById("idea-desc").innerText = pitch.description;

  ideaCard.classList.add("revealed");
}

// ==========================================================================
// ÇARK DÖNDÜRME & SES / ANİMASYON TAM SENKRONİZASYONU
// ==========================================================================
async function spinJackpot() {
  if (isSpinning) return;

  if (lockedReels[0] && lockedReels[1] && lockedReels[2]) {
    showToast("⚠️ Tüm slotlar kilitli! En az birinin kilidini açın.");
    return;
  }

  isSpinning = true;

  // UI durumunu güncelle
  spinBtn.disabled = true;
  captureBtn.disabled = true;
  copyTextBtn.disabled = true;
  statusDot.className = "status-indicator spinning";
  statusText.innerText = "STATUS: GENERATING...";
  ideaCard.classList.remove("revealed");

  // Lever animasyonu
  lever.classList.add("pulling");
  window.soundFX.playLeverPull();
  setTimeout(() => lever.classList.remove("pulling"), 280);

  // Kazananları önceden belirle
  const win1 = (lockedReels[0] && currentCombination) ? currentCombination.t1 : THEMES_1[Math.floor(Math.random() * THEMES_1.length)];
  const win2 = (lockedReels[1] && currentCombination) ? currentCombination.t2 : THEMES_2[Math.floor(Math.random() * THEMES_2.length)];
  const win3 = (lockedReels[2] && currentCombination) ? currentCombination.genre : GENRES[Math.floor(Math.random() * GENRES.length)];

  const slotH = getSlotHeight();

  // Strip kurucu
  function setupSpinStrip(stripEl, dataset, targetWin, count, isLocked) {
    if (isLocked) return 1;

    stripEl.innerHTML = "";
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(dataset[Math.floor(Math.random() * dataset.length)]);
    }
    items.push(targetWin);

    items.forEach(it => stripEl.appendChild(createSlotItemNode(it)));
    stripEl.style.transition = "none";
    stripEl.style.transform = "translateY(0px)";
    stripEl.classList.add("spinning");

    return items.length;
  }

  // Strip uzunlukları
  const c1 = turboMode ? 16 : 26;
  const c2 = turboMode ? 24 : 38;
  const c3 = turboMode ? 32 : 50;

  const count1 = setupSpinStrip(reelStrips[0], THEMES_1, win1, c1, lockedReels[0]);
  const count2 = setupSpinStrip(reelStrips[1], THEMES_2, win2, c2, lockedReels[1]);
  const count3 = setupSpinStrip(reelStrips[2], GENRES, win3, c3, lockedReels[2]);

  // Kesin Milisaniye Süreleri (Dramatik aralıklar)
  const t1 = lockedReels[0] ? 0 : (turboMode ? 700 : 2000);
  const t2 = lockedReels[1] ? 0 : (turboMode ? 1200 : 3600);
  const t3 = lockedReels[2] ? 0 : (turboMode ? 1700 : 5200);

  // Ses Motorunu Başlat (3 çark aynı anda yoğun TIRRRRRRR)
  window.soundFX.startSpinSound(turboMode ? 20 : 26);

  // Cubic-bezier: Yaylanmadan önce kararlı ve net bir kilitlenme için
  const spinBezier = "cubic-bezier(0.2, 0.88, 0.35, 1.04)";

  requestAnimationFrame(() => {
    if (!lockedReels[0]) {
      reelStrips[0].style.transition = `transform ${t1}ms ${spinBezier}`;
      reelStrips[0].style.transform = `translateY(-${(count1 - 1) * slotH}px)`;
    }
    if (!lockedReels[1]) {
      reelStrips[1].style.transition = `transform ${t2}ms ${spinBezier}`;
      reelStrips[1].style.transform = `translateY(-${(count2 - 1) * slotH}px)`;
    }
    if (!lockedReels[2]) {
      reelStrips[2].style.transition = `transform ${t3}ms ${spinBezier}`;
      reelStrips[2].style.transform = `translateY(-${(count3 - 1) * slotH}px)`;
    }
  });

  // 1. ÇARK SENKRONİZASYONU:
  if (!lockedReels[0]) {
    // Çark durmadan 120ms önce blur'u kaldır (görsel netleşsin)
    setTimeout(() => {
      reelStrips[0].classList.remove("spinning");
    }, Math.max(0, t1 - 120));

    // Tam t1 anında: Çark yerine oturur, CLACK sesi çalar, ses seyrekleşir
    setTimeout(() => {
      reelBoxes[0].className = "reel-box stopped";
      window.soundFX.playReelStop(0);
      window.soundFX.slowDownSpinSound(44); // 2 çark kaldı
    }, t1);
  }

  // 2. ÇARK SENKRONİZASYONU:
  if (!lockedReels[1]) {
    setTimeout(() => {
      reelStrips[1].classList.remove("spinning");
    }, Math.max(0, t2 - 120));

    setTimeout(() => {
      reelBoxes[1].className = "reel-box stopped";
      window.soundFX.playReelStop(1);
      window.soundFX.slowDownSpinSound(72); // Son 1 çark kaldı (tr--tr--tr)
    }, t2);
  }

  // 3. ÇARK SENKRONİZASYONU (BÜYÜK FİNAL):
  if (!lockedReels[2]) {
    setTimeout(() => {
      reelStrips[2].classList.remove("spinning");
    }, Math.max(0, t3 - 120));

    setTimeout(() => {
      // 3. Çark durduğu AN: Tıkırtı sesini BIÇAK GİBİ KES!
      window.soundFX.stopSpinSound();
      
      reelBoxes[2].className = "reel-box stopped";
      window.soundFX.playReelStop(2); // Tok CLACK!
      window.soundFX.playJackpotWin(); // Onay melodisi
      triggerMinimalConfetti();

      // UI ve kartı aç
      sessionSeed.innerText = `SEED: ${generateSeed()}`;
      statusDot.className = "status-indicator";
      statusText.innerText = "STATUS: READY";

      updateIdeaCard(win1, win2, win3);
      addToHistory(win1, win2, win3);

      isSpinning = false;
      spinBtn.disabled = false;
      captureBtn.disabled = false;
      copyTextBtn.disabled = false;
    }, t3);
  } else {
    // 3. çark zaten kilitliyse
    setTimeout(() => {
      window.soundFX.stopSpinSound();
      window.soundFX.playJackpotWin();
      triggerMinimalConfetti();
      updateIdeaCard(win1, win2, win3);
      addToHistory(win1, win2, win3);
      isSpinning = false;
      spinBtn.disabled = false;
      captureBtn.disabled = false;
      copyTextBtn.disabled = false;
    }, Math.max(t1, t2));
  }
}

// Zarif Kıvılcım
function triggerMinimalConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 35,
      spread: 60,
      colors: ["#ffffff", "#f59e0b", "#94a3b8"],
      origin: { y: 0.65 },
      ticks: 130
    });
  }
}

// ==========================================================================
// Cihaz Hafızasında (LocalStorage) Son 20 Log Yönetimi
// ==========================================================================
function loadHistoryFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      history = JSON.parse(raw);
      if (!Array.isArray(history)) history = [];
    }
  } catch (e) {
    history = [];
  }
  renderHistory();
}

function addToHistory(t1, t2, genre) {
  const pitch = generatePitch(t1, t2, genre);
  const logItem = {
    t1: { icon: t1.icon, name: t1.name, desc: t1.desc },
    t2: { icon: t2.icon, name: t2.name, desc: t2.desc },
    genre: { icon: genre.icon, name: genre.name, desc: genre.desc },
    title: pitch.title,
    desc: pitch.description,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    date: new Date().toLocaleDateString()
  };

  history.unshift(logItem);
  if (history.length > 20) {
    history = history.slice(0, 20); // Kesinlikle son 20 log tutulur
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("LocalStorage yazma hatası:", e);
  }

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `
      <div style="text-align: center; padding: 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--text-muted);">
        [ Henüz kaydedilmiş bir oyun fikri yok. Kolu çek ve üret! ]
      </div>
    `;
    return;
  }

  history.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.title = "Bu fikri tekrar görüntülemek için tıkla";
    div.innerHTML = `
      <div class="history-item-content">
        <span style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; color:var(--text-muted); width: 22px;">#${String(index + 1).padStart(2, '0')}</span>
        <span><strong>${item.t1.icon} ${item.t1.name}</strong> &bull; <strong>${item.t2.icon} ${item.t2.name}</strong> &rarr; <span style="color:#f59e0b; font-weight:700;">${item.genre.icon} ${item.genre.name}</span></span>
      </div>
      <span class="history-item-time">${item.time}</span>
    `;

    // Tıklanınca o eski fikri ekrana yükle
    div.addEventListener("click", () => {
      if (isSpinning) return;
      updateIdeaCard(item.t1, item.t2, item.genre);
      // İlgili çarkları da güncelle
      populateReelStrip(reelStrips[0], item.t1);
      populateReelStrip(reelStrips[1], item.t2);
      populateReelStrip(reelStrips[2], item.genre);
      captureBtn.disabled = false;
      copyTextBtn.disabled = false;
      window.soundFX.playTick();
      showToast(`✓ #${index + 1} nolu oyun fikri yüklendi!`);
    });

    historyList.appendChild(div);
  });
}

function clearAllHistory() {
  if (history.length === 0) {
    showToast("⚠️ Temizlenecek geçmiş kaydı yok.");
    return;
  }
  if (confirm("Cihazda kayıtlı son 20 oyun fikri logunu temizlemek istiyor musunuz?")) {
    history = [];
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
    showToast("✓ Cihazdaki tüm geçmiş kayıtlar silindi.");
  }
}

// Toast
let toastTimer = null;
function showToast(message) {
  const toastText = document.getElementById("toast-text");
  toastText.innerText = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Ekran Resmi / Clipboard
async function captureToClipboard() {
  if (isSpinning) return;
  if (!currentCombination) {
    showToast("⚠️ Önce kolu çekerek bir oyun fikri üretmelisin!");
    return;
  }

  window.soundFX.playCameraShutter();
  shutterFlash.classList.add("flash");
  setTimeout(() => shutterFlash.classList.remove("flash"), 80);

  const captureTarget = document.getElementById("jackpot-capture-wrapper");

  try {
    const canvas = await html2canvas(captureTarget, {
      backgroundColor: "#121418",
      scale: 2,
      useCORS: true,
      logging: false,
      borderRadius: 20
    });

    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast("⚠️ Render başarısız.");
        return;
      }

      let copied = false;
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          copied = true;
          showToast("✓ Ekran görüntüsü panoya kopyalandı! (Ctrl+V)");
        } catch (err) {
          console.warn("ClipboardItem write error:", err);
        }
      }

      if (!copied) {
        const link = document.createElement("a");
        link.download = `nexus-concept-${Date.now()}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        showToast("✓ Görüntü PNG olarak indirildi!");
      }
    }, "image/png");

  } catch (error) {
    console.error("Yakalama hatası:", error);
    showToast("⚠️ Ekran yakalanırken hata oluştu.");
  }
}

// Metin Kopyalama
async function copyAsText() {
  if (!currentCombination) {
    showToast("⚠️ Önce kolu çekerek bir oyun fikri üretmelisin!");
    return;
  }
  const t = currentCombination;
  const title = document.getElementById("idea-title").innerText;
  const desc = document.getElementById("idea-desc").innerText;

  const markdown = `## 🎮 OYUN FİKRİ\n**Formül:** ${t.t1.name} × ${t.t2.name} → ${t.genre.name}\n**Başlık:** ${title}\n**Özet:** ${desc}`;

  try {
    await navigator.clipboard.writeText(markdown);
    showToast("✓ Metin Markdown formatında panoya kopyalandı!");
  } catch (e) {
    showToast("⚠️ Metin kopyalanamadı.");
  }
}

// Turbo Modu
turboBtn.addEventListener("click", () => {
  turboMode = !turboMode;
  turboBtn.classList.toggle("active", turboMode);
  showToast(turboMode ? "⚡ Turbo Hız Modu Aktif" : "⏳ Normal Dramatik Mod Aktif");
});

// Event Listeners
lever.addEventListener("click", spinJackpot);
spinBtn.addEventListener("click", spinJackpot);
captureBtn.addEventListener("click", captureToClipboard);
copyTextBtn.addEventListener("click", copyAsText);

window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !e.repeat && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    spinJackpot();
  }
});

muteBtn.addEventListener("click", () => {
  const isMuted = window.soundFX.toggleMute();
  muteBtn.innerHTML = isMuted ? "🔇" : "🔊";
  muteBtn.title = isMuted ? "Sesi Aç" : "Sesi Kapat";
});

window.addEventListener("DOMContentLoaded", initEngine);
