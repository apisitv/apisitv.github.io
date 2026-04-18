import { sections } from "./data/sections.js";
import { iconMarkup } from "./data/icons.js";
import { profile } from "./data/profile.js";
import { getDomRefs } from "./utils/dom.js";
import { createAppState } from "./app-state.js";
import { renderPanel } from "./ui/panel.js";
import { renderNav, layoutArcItems } from "./ui/nav.js";
import { HeroViewer } from "./three/viewer.js";

const STORAGE_KEY = "resume-active-section";
const refs = getDomRefs();
const savedSectionId = window.localStorage.getItem(STORAGE_KEY) || "experience";
const initialSectionId = sections.some((section) => section.id === savedSectionId)
  ? savedSectionId
  : "experience";
const state = createAppState(initialSectionId);
const viewer = new HeroViewer(refs);

function renderIdentity() {
  const avatar = document.getElementById("identityAvatar");
  const name = document.getElementById("identityName");
  const role = document.getElementById("identityRole");

  if (avatar) {
    avatar.src = profile.avatarSrc;
    avatar.alt = profile.avatarAlt;
  }

  if (name) {
    name.textContent = profile.name;
  }

  if (role) {
    role.textContent = profile.role;
  }
}

function getSectionById(sectionId) {
  return sections.find((entry) => entry.id === sectionId) || sections[0];
}

function focusSectionByOffset(offset) {
  const currentIndex = sections.findIndex(
    (section) => section.id === state.activeSectionId,
  );
  const nextIndex = (currentIndex + offset + sections.length) % sections.length;
  setActiveSection(sections[nextIndex].id, { focusButton: true });
}

function render() {
  renderNav({
    sections,
    activeSectionId: state.activeSectionId,
    refs,
    iconMarkup,
    onSelect: setActiveSection,
    onFocusOffset: focusSectionByOffset,
  });

  renderPanel(getSectionById(state.activeSectionId), refs, iconMarkup);
}

function syncHeroAsset(section) {
  viewer.loadModel(section.modelSrc);
}

function setActiveSection(sectionId, options = {}) {
  state.activeSectionId = sectionId;
  window.localStorage.setItem(STORAGE_KEY, sectionId);
  render();

  const section = getSectionById(sectionId);
  syncHeroAsset(section);

  if (options.playAnimation !== false) {
    if (viewer.activeAssetPath === section.modelSrc) {
      viewer.playSectionAnimation(section.animationClip);
    } else {
      window.setTimeout(() => viewer.playSectionAnimation(section.animationClip), 280);
    }
  }

  if (options.focusButton) {
    document.getElementById(`tab-${sectionId}`)?.focus();
  }
}

viewer.init();
renderIdentity();
window.addEventListener("resize", () => window.requestAnimationFrame(() => layoutArcItems(refs)));
setActiveSection(state.activeSectionId, { playAnimation: false });
