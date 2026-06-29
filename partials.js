/**
 * Loads shared HTML partials on all pages.
 * Set data-active-page on <body> to highlight nav in header + footer.
 * Values: home | strengths | candidates | flow-costs | company
 */
(function () {
  var PARTIALS = [
    { id: "site-header", url: "./partials/header.html" },
    { id: "site-cta-closing", url: "./partials/cta-closing.html" },
    { id: "site-banner-cta", url: "./partials/banner-cta.html" },
    { id: "site-footer", url: "./partials/footer.html" },
  ];

  var DESKTOP_ACTIVE =
    "text-[#990033] font-noto-sans-b whitespace-nowrap hover:opacity-60 transition-opacity text-[13px] leading-[48px] tracking-[0.13px] xl:text-[14px] xl:leading-[54px] xl:tracking-[0.14px] 2xl:text-[18px] 2xl:leading-[63px] 2xl:tracking-[0.18px]";
  var DESKTOP_INACTIVE =
    "text-[#1A1A1A] font-noto-sans-r whitespace-nowrap hover:opacity-60 transition-opacity text-[13px] leading-[48px] tracking-[0.13px] xl:text-[14px] xl:leading-[54px] xl:tracking-[0.14px] 2xl:text-[18px] 2xl:leading-[63px] 2xl:tracking-[0.18px]";
  var MOBILE_ACTIVE =
    "font-noto-sans-b text-[#990033] border-b border-gray-100 hover:opacity-60 transition-opacity text-[15px] leading-[48px] tracking-[0.15px] xs:text-[16px] xs:leading-[52px] xs:tracking-[0.16px] sm:text-[17px] sm:leading-[56px] sm:tracking-[0.17px] sm2:text-[18px] sm2:leading-[60px] sm2:tracking-[0.18px] md:text-[18px] md:leading-[63px] md:tracking-[0.18px]";
  var MOBILE_INACTIVE =
    "font-noto-sans-r text-[#1A1A1A] border-b border-gray-100 hover:opacity-60 transition-opacity text-[15px] leading-[48px] tracking-[0.15px] xs:text-[16px] xs:leading-[52px] xs:tracking-[0.16px] sm:text-[17px] sm:leading-[56px] sm:tracking-[0.17px] sm2:text-[18px] sm2:leading-[60px] sm2:tracking-[0.18px] md:text-[18px] md:leading-[63px] md:tracking-[0.18px]";
  var FOOTER_ACTIVE =
    "font-noto-sans-b text-[#990033] text-[16px] leading-none tracking-[0.16px] underline hover:opacity-60 transition-opacity whitespace-nowrap";
  var FOOTER_INACTIVE =
    "font-noto-sans-r text-[#1A1A1A] text-[16px] leading-none tracking-[0.16px] underline hover:opacity-60 transition-opacity whitespace-nowrap";

  function navContext(el) {
    if (el.closest("footer")) return "footer";
    if (el.closest("#mobile-menu")) return "mobile";
    return "desktop";
  }

  function classesFor(context, isActive) {
    if (context === "footer") return isActive ? FOOTER_ACTIVE : FOOTER_INACTIVE;
    if (context === "mobile") return isActive ? MOBILE_ACTIVE : MOBILE_INACTIVE;
    return isActive ? DESKTOP_ACTIVE : DESKTOP_INACTIVE;
  }

  function highlightActiveNav() {
    var active = document.body.dataset.activePage;
    if (!active) return;

    document.querySelectorAll("[data-nav]").forEach(function (el) {
      var isActive = el.getAttribute("data-nav") === active;
      el.className = classesFor(navContext(el), isActive);
    });
  }

  function loadPartial(spec) {
    var el = document.getElementById(spec.id);
    if (!el) return Promise.resolve();

    return fetch(spec.url)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + spec.url);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      });
  }

  function init() {
    var needed = PARTIALS.some(function (p) {
      return document.getElementById(p.id);
    });
    if (!needed) return;

    document.body.classList.add("partials-loading");

    Promise.all(PARTIALS.map(loadPartial))
      .then(function () {
        highlightActiveNav();
        document.body.classList.remove("partials-loading");
        document.dispatchEvent(new CustomEvent("partials:loaded"));
      })
      .catch(function (err) {
        console.error("[partials.js]", err);
        document.body.classList.remove("partials-loading");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
