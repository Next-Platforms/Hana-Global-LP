document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");

  if (!menuBtn || !mobileMenu || !backdrop) return;

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
});
