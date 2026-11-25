/* 渐进增强：导航、正文和 FAQ 在关闭 JavaScript 时仍可访问。 */
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const mobile = window.matchMedia("(max-width: 760px)");
  if (toggle && nav) {
    const closeMenu = () => {
      nav.hidden = mobile.matches;
      toggle.setAttribute("aria-expanded", "false");
    };
    closeMenu();
    if (mobile.addEventListener) mobile.addEventListener("change", closeMenu);
    else mobile.addListener(closeMenu);
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.hidden = expanded;
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && mobile.matches) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobile.matches && !nav.hidden) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  const english = document.documentElement.lang === "en";
  const title = english ? "The download link is not available yet" : "下载入口准备中";
  const message = english
    ? "Nianji’s App Store link has not been announced. We will update this page when it is available."
    : "念记的 App Store 链接尚未公布。下载开放后，我们会在这里更新入口。";
  let dialog;
  let returnFocus;
  document.querySelectorAll('[data-pending="app-store"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (typeof HTMLDialogElement === "undefined") {
        window.alert(message);
        return;
      }
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.className = "modal";
        dialog.setAttribute("aria-labelledby", "download-title");
        dialog.setAttribute("aria-describedby", "download-message");
        const heading = document.createElement("h2");
        heading.id = "download-title";
        heading.textContent = title;
        const text = document.createElement("p");
        text.id = "download-message";
        text.textContent = message;
        const close = document.createElement("button");
        close.type = "button";
        close.className = "button";
        close.textContent = english ? "Got it" : "知道了";
        close.autofocus = true;
        close.addEventListener("click", () => dialog.close());
        dialog.append(heading, text, close);
        dialog.addEventListener("close", () => returnFocus?.focus());
        document.body.append(dialog);
      }
      returnFocus = link;
      if (!dialog.open) dialog.showModal();
    });
  });
})();
