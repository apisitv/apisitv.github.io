export function renderTimeline(items) {
  const wrapper = document.createElement("div");
  wrapper.className = "timeline";

  items.forEach((item) => {
    const node = document.createElement("article");
    node.className = `timeline-item${item.active ? " is-active" : ""}`;
    node.innerHTML = `
      <div class="timeline-line">
        <div class="timeline-dot" aria-hidden="true"></div>
      </div>
      <div class="timeline-card">
        <h3>${item.title}</h3>
        <p>${item.company}</p>
        <span>${item.period}</span>
      </div>
    `;
    wrapper.appendChild(node);
  });

  return wrapper;
}

export function renderHighlights(items) {
  const wrapper = document.createElement("div");
  wrapper.className = "highlights";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "highlight-card";
    const points = item.points.map((point) => `<li>${point}</li>`).join("");
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <ul>${points}</ul>
    `;
    wrapper.appendChild(card);
  });

  return wrapper;
}

export function renderPanel(section, refs, iconMarkup) {
  const {
    panelHeading,
    panelTitle,
    panelDescription,
    panelRoot,
    panelBadge,
    panelMeta,
    panelBody,
  } = refs;

  panelHeading.textContent = section.heading;
  panelTitle.textContent = section.title;
  panelDescription.textContent = section.description;
  panelRoot.setAttribute("aria-labelledby", `tab-${section.id}`);
  panelBadge.innerHTML =
    iconMarkup[section.layout === "timeline" ? "bag" : section.icon] ||
    iconMarkup.bag;

  panelMeta.innerHTML = "";
  (section.meta || []).forEach((item) => {
    const pill = document.createElement("span");
    pill.className = "meta-pill";
    pill.textContent = item;
    panelMeta.appendChild(pill);
  });

  panelBody.innerHTML = "";
  const view = document.createElement("div");
  view.className = "panel-view";

  if (section.layout === "timeline") {
    view.appendChild(renderTimeline(section.timeline));
  } else {
    view.appendChild(renderHighlights(section.highlights));
  }

  panelBody.appendChild(view);
}
