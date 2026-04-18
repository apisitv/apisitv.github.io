function renderOrbitIcons(sections, activeSectionId, refs, iconMarkup) {
  const { iconRail } = refs;
  iconRail.innerHTML = "";

  sections.forEach((section) => {
    const icon = document.createElement("div");
    icon.className = `icon-node${section.id === activeSectionId ? " is-active" : ""}`;
    icon.innerHTML = iconMarkup[section.icon] || iconMarkup.monitor;
    iconRail.appendChild(icon);
  });
}

function updateOrbitPath(refs) {
  const { heroStage, videoShell, heroOrbit, heroOrbitPath } = refs;

  if (window.innerWidth <= 760) {
    heroOrbitPath.setAttribute("d", "");
    return null;
  }

  const stageRect = heroStage.getBoundingClientRect();
  const modelRect = videoShell.getBoundingClientRect();
  const centerX = modelRect.left - stageRect.left + modelRect.width / 2 - 40;
  const centerY = modelRect.top - stageRect.top + modelRect.height / 2 - 35;
  const radius = Math.min(stageRect.width, stageRect.height) * 0.345;
  const startX = centerX;
  const startY = centerY + radius;
  const endX = centerX;
  const endY = centerY - radius;
  const d = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;

  heroOrbit.setAttribute("viewBox", `0 0 ${stageRect.width} ${stageRect.height}`);
  heroOrbitPath.setAttribute("d", d);

  return { stageRect, pathLength: heroOrbitPath.getTotalLength() };
}

export function layoutArcItems(refs) {
  if (window.innerWidth <= 760) return;

  const orbit = updateOrbitPath(refs);
  if (!orbit) return;

  const { stageRect, pathLength } = orbit;
  const { navCluster, iconRail, heroOrbitPath } = refs;
  const navButtons = Array.from(navCluster.querySelectorAll(".nav-item"));
  const iconNodes = Array.from(iconRail.querySelectorAll(".icon-node"));
  const padding = 0.3;

  iconNodes.forEach((iconNode, index) => {
    const t =
      iconNodes.length === 1
        ? 0.5
        : padding + (index / (iconNodes.length - 1)) * (1 - padding * 2);

    const point = heroOrbitPath.getPointAtLength(pathLength * (1 - t));
    const iconCenterX = point.x;
    const iconCenterY = point.y;

    iconNode.style.left = `${iconCenterX - iconNode.offsetWidth / 2}px`;
    iconNode.style.top = `${iconCenterY - iconNode.offsetHeight / 2}px`;

    const button = navButtons[index];
    if (button) {
      const gap = Math.max(42, stageRect.width * 0.022);
      button.style.left = `${iconCenterX - button.offsetWidth - gap}px`;
      button.style.top = `${iconCenterY - button.offsetHeight / 2}px`;
    }
  });
}

export function renderNav({
  sections,
  activeSectionId,
  refs,
  iconMarkup,
  onSelect,
  onFocusOffset,
}) {
  const { navCluster } = refs;
  navCluster.innerHTML = "";

  sections.forEach((section, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `nav-item${section.id === activeSectionId ? " is-active" : ""}`;
    button.dataset.section = section.id;
    button.id = `tab-${section.id}`;
    button.setAttribute("role", "tab");
    button.setAttribute("tabindex", section.id === activeSectionId ? "0" : "-1");
    button.setAttribute("aria-selected", String(section.id === activeSectionId));
    button.setAttribute("aria-controls", "panelRoot");
    button.setAttribute("aria-pressed", String(section.id === activeSectionId));
    button.innerHTML = `
      <span class="nav-item-icon" aria-hidden="true">${iconMarkup[section.icon] || iconMarkup.monitor}</span>
      <span class="nav-item-label">${section.label}</span>
    `;
    button.addEventListener("click", () => onSelect(section.id));
    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        onFocusOffset(1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        onFocusOffset(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        onSelect(sections[0].id, { focusButton: true });
      }

      if (event.key === "End") {
        event.preventDefault();
        onSelect(sections[sections.length - 1].id, { focusButton: true });
      }
    });
    navCluster.appendChild(button);
  });

  renderOrbitIcons(sections, activeSectionId, refs, iconMarkup);
  window.requestAnimationFrame(() => layoutArcItems(refs));
}
