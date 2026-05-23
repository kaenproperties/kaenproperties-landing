const whatsappMessages = {
  en: {
    quote:
      "Hi KAEN, I want a quotation. Project: ____ Unit size: ____ Target: Whole/Rooms Timeline: ____ Need management: Yes/No",
    plan:
      "Hi KAEN, I want a hands-off plan (renovation + rental + management). My unit is:",
  },
  zh: {
    quote:
      "Hi KAEN，我想获取报价。项目：____ 单位面积：____ 目标：整租/分租 时间线：____ 是否需要管理：是/否",
    plan:
      "Hi KAEN，我想了解省心方案（装修 + 出租 + 管理）。我的单位是：",
  },
};

function setWaLink(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = `https://wa.me/601136111763?text=${encodeURIComponent(text)}`;
}

function applyLanguage(lang) {
  const dict = i18n[lang];
  if (!dict) return;

  document.documentElement.lang = lang === "zh" ? "zh" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const attr = el.getAttribute("data-i18n-attr");

    if (!dict[key]) return;

    if (attr) {
      el.setAttribute(attr, dict[key]);
    } else {
      el.innerHTML = dict[key];
    }
  });

  const langToggle = document.getElementById("langToggle");
  const langToggleMobile = document.getElementById("langToggleMobile");

  if (langToggle) {
    langToggle.textContent = lang === "en" ? "中文" : "EN";
  }

  if (langToggleMobile) {
    langToggleMobile.textContent = lang === "en" ? "中文" : "EN";
  }

  setWaLink("waFloating", whatsappMessages[lang].quote);
  setWaLink("waHero", whatsappMessages[lang].quote);
  setWaLink("waQuote", whatsappMessages[lang].quote);
  setWaLink("waManagementPlan", whatsappMessages[lang].plan);

  localStorage.setItem("kaen_lang", lang);
}

document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });
}

const langToggle = document.getElementById("langToggle");
const langToggleMobile = document.getElementById("langToggleMobile");

let currentLang = localStorage.getItem("kaen_lang") || "en";
applyLanguage(currentLang);

function toggleLanguage() {
  currentLang = currentLang === "en" ? "zh" : "en";
  applyLanguage(currentLang);
}

if (langToggle) {
  langToggle.addEventListener("click", toggleLanguage);
}

if (langToggleMobile) {
  langToggleMobile.addEventListener("click", toggleLanguage);
}

function initProjectCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (!track || !prev || !next) return;

  let isMoving = false;
  let startX = 0;

  function slideNext() {
    if (isMoving) return;
    isMoving = true;

    const cardWidth = track.children[0].offsetWidth + 20;
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${cardWidth}px)`;

    setTimeout(() => {
      track.appendChild(track.firstElementChild);
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      isMoving = false;
    }, 400);
  }

  function slidePrev() {
    if (isMoving) return;
    isMoving = true;

    const cardWidth = track.children[0].offsetWidth + 20;
    track.prepend(track.lastElementChild);
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth}px)`;

    requestAnimationFrame(() => {
      track.style.transition = "transform 0.4s ease";
      track.style.transform = "translateX(0)";
    });

    setTimeout(() => {
      isMoving = false;
    }, 400);
  }

  next.addEventListener("click", slideNext);
  prev.addEventListener("click", slidePrev);

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) slideNext();
    if (endX - startX > 50) slidePrev();
  });
}