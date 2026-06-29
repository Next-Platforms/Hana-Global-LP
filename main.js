function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");

  if (!menuBtn || !mobileMenu || !backdrop) return;

  if (menuBtn.dataset.menuBound === "true") return;
  menuBtn.dataset.menuBound = "true";

  const isOpen = () => mobileMenu.classList.contains("translate-x-0");

  const setMenuOpen = (open) => {
    mobileMenu.classList.toggle("translate-x-0", open);
    mobileMenu.classList.toggle("translate-x-full", !open);
    backdrop.classList.toggle("opacity-100", open);
    backdrop.classList.toggle("visible", open);
    backdrop.classList.toggle("opacity-0", !open);
    backdrop.classList.toggle("invisible", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute(
      "aria-label",
      open ? "メニューを閉じる" : "メニューを開く",
    );
    mobileMenu.setAttribute("aria-hidden", String(!open));
    backdrop.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenuOpen(!isOpen());
  });

  closeBtn?.addEventListener("click", () => setMenuOpen(false));
  backdrop.addEventListener("click", () => setMenuOpen(false));

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenuOpen(false);
  });
}

document.addEventListener("DOMContentLoaded", initMobileMenu);
document.addEventListener("partials:loaded", initMobileMenu);

// News Carousel (home page only)
document.addEventListener("DOMContentLoaded", () => {
  const splideEl = document.getElementById("news-splide");
  if (!splideEl) return;

  const splide = new Splide(splideEl, {
    type: "slide",
    perPage: 5,
    perMove: 1,
    gap: "40px",
    arrows: false,
    pagination: false,
    rewind: false,
    breakpoints: {
      1399: { gap: "24px" },
      1023: { perPage: 4, gap: "20px" },
      899: { perPage: 3, gap: "18px" },
      749: { perPage: 2, gap: "16px" },
      479: { perPage: 2, gap: "12px" },
    },
  }).mount();

  const dotsContainer = document.getElementById("news-dots");
  const prevBtn = document.getElementById("news-prev");
  const nextBtn = document.getElementById("news-next");

  const totalPages = splide.Components.Controller.getEnd() + 1;

  const dots = [];
  for (let i = 0; i < totalPages; i++) {
    const img = document.createElement("img");
    img.src =
      i === 0
        ? "./images/home-page/07-news/carousel/active-dot.svg"
        : "./images/home-page/07-news/carousel/dot.svg";
    img.alt = "";
    img.className = "w-[8px] h-[8px] cursor-pointer";
    img.addEventListener("click", () => splide.go(i));
    dots.push(img);
    dotsContainer.appendChild(img);
  }

  const updateDots = (index) => {
    dots.forEach((d, i) => {
      d.src =
        i === index
          ? "./images/home-page/07-news/carousel/active-dot.svg"
          : "./images/home-page/07-news/carousel/dot.svg";
    });
  };

  splide.on("moved", (index) => updateDots(index));

  prevBtn?.addEventListener("click", () => splide.go("<"));
  nextBtn?.addEventListener("click", () => splide.go(">"));
});
