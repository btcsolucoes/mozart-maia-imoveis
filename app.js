"use strict";
const i18n = window.MozartI18n;
const t = (key, params) => i18n.t(key, params);
const root = document.documentElement;
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const motionToggle = document.getElementById("motion-toggle");
let motionReduced = motionPreference.matches;
function applyMotionPreference() {
  root.classList.toggle("motion-off", motionReduced);
  motionToggle.setAttribute("aria-pressed", String(motionReduced));
  document.dispatchEvent(
    new CustomEvent("mozart:motionchange", {
      detail: { reduced: motionReduced },
    }),
  );
}
motionToggle.addEventListener("click", () => {
  motionReduced = !motionReduced;
  applyMotionPreference();
});
motionPreference.addEventListener("change", (event) => {
  motionReduced = event.matches;
  applyMotionPreference();
});
applyMotionPreference();
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("site-nav");
const mobileViewport = matchMedia("(max-width: 1100px)");
function menuText() {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute(
    "aria-label",
    t(open ? "menuCloseLabel" : "menuLabel"),
  );
  menuButton.textContent = t(open ? "menuClose" : "menuOpen");
}
function closeMenu({ returnFocus = false } = {}) {
  navigation.removeAttribute("data-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuText();
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  if (menuButton.getAttribute("aria-expanded") === "true") return closeMenu();
  navigation.dataset.open = "true";
  menuButton.setAttribute("aria-expanded", "true");
  menuText();
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  )
    closeMenu({ returnFocus: true });
});
document.addEventListener("click", (event) => {
  if (mobileViewport.matches && !event.target.closest(".site-header"))
    closeMenu();
});
mobileViewport.addEventListener("change", () => closeMenu());
const intentKeys = {
  comprar: "intentComprar",
  vender: "intentVender",
  avaliar: "intentAvaliar",
  pericia: "intentPericia",
};
const initialIntent = new URL(location.href).searchParams.get("objetivo");
if (Object.hasOwn(intentKeys, initialIntent))
  document.querySelector(
    `input[name="objetivo"][value="${initialIntent}"]`,
  ).checked = true;
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("nome");
const nameError = document.getElementById("nome-error");
const formStatus = document.getElementById("form-status");
nameInput.addEventListener("input", () => {
  nameInput.removeAttribute("aria-invalid");
  nameError.textContent = "";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.setAttribute("aria-invalid", "true");
    nameError.textContent = t("nameError");
    formStatus.textContent = "";
    nameInput.focus();
    return;
  }
  const intent = new FormData(form).get("objetivo");
  const extra = document.getElementById("mensagem").value.trim();
  const message =
    t("messageIntro", { name }) +
    t(intentKeys[intent] || "intentComprar") +
    "." +
    (extra ? "\n\n" + extra : "");
  const url = "https://wa.me/5581999712940?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
  const recoveryLink = document.createElement("a");
  recoveryLink.href = url;
  recoveryLink.target = "_blank";
  recoveryLink.rel = "noopener noreferrer";
  recoveryLink.textContent = t("recoveryLink");
  formStatus.replaceChildren(
    document.createTextNode(t("recoveryPrefix")),
    recoveryLink,
    document.createTextNode("."),
  );
});
document.addEventListener("mozart:languagechange", () => {
  menuText();
  if (nameInput.getAttribute("aria-invalid") === "true")
    nameError.textContent = t("nameError");
  formStatus.replaceChildren();
});
menuText();
form.querySelector('button[type="submit"]').disabled = false;
document.getElementById("year").textContent = new Date().getFullYear();
