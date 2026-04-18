import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sections = [
  {
    id: "frontend",
    label: "Frontend Engineer",
    heading: "Frontend Engineer",
    title: "Interfaces that feel fast, clear, and intentional",
    description:
      "This section is the default hero state. It focuses on interface design, component architecture, and the interaction quality that makes a product feel finished.",
    modelSrc: "./idle_two.glb",
    animationClip: "Personalized_Gesture",
    layout: "highlights",
    icon: "monitor",
    meta: ["UI Systems", "Interaction Detail", "Responsive Design"],
    highlights: [
      {
        title: "UI Engineering",
        description:
          "Build reusable interface systems with clean state transitions, crisp spacing, and strong visual hierarchy.",
        points: [
          "Component-driven development",
          "Accessible interactions",
          "Responsive layout strategy",
        ],
      },
      {
        title: "Interaction Detail",
        description:
          "Treat motion and feedback as product behavior, not decoration.",
        points: [
          "Hover and selected states",
          "Micro-transition tuning",
          "Visual consistency across views",
        ],
      },
    ],
  },
  {
    id: "architecture",
    label: "System Architecture",
    heading: "System Architecture",
    title: "From screen-level concerns to product structure",
    description:
      "Use this state to explain how the frontend fits into a larger system: modules, integration boundaries, and delivery decisions.",
    modelSrc: "./idle_two.glb",
    animationClip: "Mirror_Viewing",
    layout: "highlights",
    icon: "spark",
    meta: ["Scalable Frontend", "Integration Boundaries", "Pattern Layer"],
    highlights: [
      {
        title: "Module Boundaries",
        description:
          "Separate view concerns, data contracts, and service orchestration so the UI can evolve without forcing rewrites.",
        points: [
          "Feature-based composition",
          "Shared token and pattern layer",
          "Stable render contracts",
        ],
      },
      {
        title: "Scale Considerations",
        description:
          "Keep the page ready for more sections, more media states, and richer cards on the right panel.",
        points: [
          "Data-driven sections",
          "Video source abstraction",
          "Future-proof content schema",
        ],
      },
    ],
  },
  {
    id: "logic",
    label: "Application Logic",
    heading: "Application Logic",
    title: "State, switching, and behavior live here",
    description:
      "The left menu, central media, and right card all depend on the same state. This section is where the interaction model is explained.",
    modelSrc: "./idle_two.glb",
    animationClip: "Victory_Fist_Pump",
    layout: "highlights",
    icon: "crown",
    meta: ["State Flow", "UI Behavior", "View Coordination"],
    highlights: [
      {
        title: "Single Source of Truth",
        description:
          "A single active section controls navigation, card rendering, and which media asset should be shown.",
        points: [
          "Predictable UI updates",
          "Low coupling between blocks",
          "Easy section expansion",
        ],
      },
      {
        title: "Interaction Flow",
        description:
          "Click left item, update active styling, rerender right panel, then prepare media switch.",
        points: [
          "Minimal JS surface area",
          "Declarative render path",
          "Ready for async media later",
        ],
      },
    ],
  },
  {
    id: "analytics",
    label: "Data & Analytics",
    heading: "Data & Analytics",
    title: "A place for metrics, outcomes, and signal",
    description:
      "This panel can shift from timeline content to decision-support content without changing the base shell of the UI.",
    modelSrc: "./idle_two.glb",
    animationClip: "Archery_Aim_with_Lateral_Scan",
    layout: "highlights",
    icon: "mute",
    meta: ["Decision Support", "Behavior Signal", "Readable Summaries"],
    highlights: [
      {
        title: "User Signal",
        description:
          "Explain how data validates design choices or informs the next interface iteration.",
        points: [
          "Behavioral patterns",
          "Conversion or engagement metrics",
          "Observed friction points",
        ],
      },
      {
        title: "Presentation Layer",
        description:
          "Even analytical content should feel aligned with the same visual system as the rest of the page.",
        points: [
          "Card-based summaries",
          "Readable supporting text",
          "Consistent density and rhythm",
        ],
      },
    ],
  },
  {
    id: "experience",
    label: "Timeline Experience",
    heading: "Experience",
    title: "Relevant roles arranged as a readable timeline",
    description:
      "This is the timeline card matching the original concept. It remains one of several view modes for the right-side panel.",
    modelSrc: "./idle_two.glb",
    animationClip: "Hello_Run",
    layout: "timeline",
    icon: "stack",
    meta: ["Career Snapshot", "Timeline View", "Readable Density"],
    timeline: [
      {
        title: "Software Engineer",
        company: "Internet Thailand Public Company Limited",
        period: "มี.ค. 2024 - ปัจจุบัน • 2 ปี",
        active: true,
      },
      {
        title: "Programmer",
        company: "Premier System Engineering Co., Ltd.",
        period: "พ.ค. 2023 - มี.ค. 2024 • 11 เดือน",
        active: false,
      },
      {
        title: "Research Assistant",
        company: "National Electronics and Computer Technology Center (NECTEC)",
        period: "ม.ค. 2021 - เม.ย. 2021 • 4 เดือน",
        active: false,
      },
    ],
  },
];

const iconMarkup = {
  monitor:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="11" rx="2"></rect><path d="M8 20h8"></path><path d="M12 16v4"></path></svg>',
  spark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2.5 5L5 9.5l4 3.2L8 18l5-3 5 3-1-5.3 4-3.2-5.5-2.5L13 2Z"></path></svg>',
  crown:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8 4.5 4L12 6l4.5 6L21 8l-2 10H5L3 8Z"></path><path d="M5 18h14"></path></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"></path><path d="m16 9 5 5"></path><path d="m21 9-5 5"></path></svg>',
  stack:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"></path><path d="m3 12 9 4.5 9-4.5"></path><path d="m3 16.5 9 4.5 9-4.5"></path></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7V6a4 4 0 1 1 8 0v1"></path><path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"></path><path d="M9 12h.01"></path><path d="M15 12h.01"></path></svg>',
};

const navCluster = document.getElementById("navCluster");
const iconRail = document.getElementById("iconRail");
const panelHeading = document.getElementById("panelHeading");
const panelTitle = document.getElementById("panelTitle");
const panelDescription = document.getElementById("panelDescription");
const panelBody = document.getElementById("panelBody");
const panelBadge = document.getElementById("panelBadge");
const panelMeta = document.getElementById("panelMeta");
const videoShell = document.querySelector(".video-shell");
const heroStage = document.querySelector(".hero-stage");
const heroOrbit = document.getElementById("heroOrbit");
const heroOrbitPath = document.getElementById("heroOrbitPath");
const panelRoot = document.getElementById("panelRoot");
const videoStatusText = document.getElementById("videoStatusText");
const heroCanvas = document.getElementById("heroCanvas");
const STORAGE_KEY = "resume-active-section";

let renderer;
let scene;
let camera;
let controls;
let mixer;
let clipActions = new Map();
let currentAction = null;
let idleAction = null;
let activeModel;
let activeAssetPath = null;
const clock = new THREE.Clock();
let resizeObserver;
// const IDLE_CLIP_NAME = "Idle_13";
const IDLE_CLIP_NAME = "Mirror_Viewing";

function setViewerState(state, text) {
  videoShell.classList.toggle("is-loading", state === "loading");
  videoShell.classList.toggle("is-fallback", state === "fallback");
  videoStatusText.textContent = text;
}

function fadeToAction(nextAction, fadeDuration = 0.22) {
  if (!nextAction || currentAction === nextAction) return;

  const previousAction = currentAction;
  currentAction = nextAction;
  currentAction.reset().fadeIn(fadeDuration).play();

  if (previousAction) {
    previousAction.fadeOut(fadeDuration);
  }
}

function playIdleAnimation() {
  if (!idleAction) return;

  idleAction.enabled = true;
  idleAction.setLoop(THREE.LoopRepeat, Infinity);
  idleAction.clampWhenFinished = false;
  fadeToAction(idleAction);
}

function playSectionAnimation(clipName) {
  const nextAction = clipActions.get(clipName);
  if (!nextAction) {
    playIdleAnimation();
    return;
  }

  nextAction.enabled = true;
  nextAction.setLoop(THREE.LoopOnce, 1);
  nextAction.clampWhenFinished = true;
  nextAction.reset();
  fadeToAction(nextAction, 0.18);
}

function initThree() {
  renderer = new THREE.WebGLRenderer({
    canvas: heroCanvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 1.02, 5.45);

  controls = new OrbitControls(camera, heroCanvas);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.enableRotate = true;
  controls.target.set(0, 0.9, 0);
  controls.minAzimuthAngle = -0.45;
  controls.maxAzimuthAngle = 0.45;
  controls.minPolarAngle = 1.05;
  controls.maxPolarAngle = 1.65;

  const ambient = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambient);

  const hemiLight = new THREE.HemisphereLight(0xfff6e7, 0xd7d2cb, 0.9);
  hemiLight.position.set(0, 4, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.55);
  keyLight.position.set(2.8, 5.5, 4.5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xfff4de, 0.72);
  fillLight.position.set(-3.5, 2.8, 3.2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xdde6ff, 0.82);
  rimLight.position.set(-2.2, 2, -3.2);
  scene.add(rimLight);

  const groundGlow = new THREE.PointLight(0xfff2dd, 0.7, 18);
  groundGlow.position.set(0, 0.8, 3.5);
  scene.add(groundGlow);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 64),
    new THREE.MeshBasicMaterial({
      color: 0xe4dfd8,
      transparent: true,
      opacity: 0.35,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.55, 0);
  scene.add(floor);

  resizeRenderer();
  window.addEventListener("resize", resizeRenderer);
  resizeObserver = new ResizeObserver(() => resizeRenderer());
  resizeObserver.observe(heroCanvas.parentElement);
  animate();
}

function resizeRenderer() {
  const bounds = heroCanvas.parentElement.getBoundingClientRect();
  const width = Math.max(Math.floor(bounds.width), 320);
  const height = Math.max(Math.floor(bounds.height), 420);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function frameModel(model) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const pivot = new THREE.Group();
  pivot.add(model);
  scene.add(pivot);

  model.position.set(-center.x, -box.min.y, -center.z);

  const normalizedBox = new THREE.Box3().setFromObject(pivot);
  const normalizedSize = new THREE.Vector3();
  const normalizedCenter = new THREE.Vector3();
  normalizedBox.getSize(normalizedSize);
  normalizedBox.getCenter(normalizedCenter);

  const targetHeight = 3.5;
  const scale = targetHeight / normalizedSize.y;
  pivot.scale.setScalar(scale);

  const scaledBox = new THREE.Box3().setFromObject(pivot);
  const scaledSize = new THREE.Vector3();
  const scaledCenter = new THREE.Vector3();
  scaledBox.getSize(scaledSize);
  scaledBox.getCenter(scaledCenter);

  const halfHeight = scaledSize.y * 0.5;
  const halfWidth = scaledSize.x * 0.5;
  const verticalFov = THREE.MathUtils.degToRad(camera.fov);
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
  const fitHeightDistance = halfHeight / Math.tan(verticalFov * 0.5);
  const fitWidthDistance = halfWidth / Math.tan(horizontalFov * 0.5);
  const distance = Math.max(fitHeightDistance, fitWidthDistance) * 0.75;

  pivot.position.set(0, -scaledBox.min.y - 1.2, 0);
  pivot.rotation.y = 0.02;

  controls.target.set(0, scaledCenter.y * 0.46, 0);
  camera.position.set(0, scaledCenter.y * 0.42, distance);
  controls.update();

  activeModel = pivot;
}

async function loadModel(assetPath) {
  if (!assetPath || assetPath === activeAssetPath) return;

  setViewerState("loading", "Loading 3D preview...");
  videoShell.classList.add("is-switching");

  if (activeModel) {
    scene.remove(activeModel);
    activeModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose?.();
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose?.());
        } else {
          child.material?.dispose?.();
        }
      }
    });
    activeModel = null;
  }

  if (mixer) {
    mixer.stopAllAction();
    mixer = null;
  }

  clipActions = new Map();
  currentAction = null;
  idleAction = null;

  const loader = new GLTFLoader();

  try {
    const gltf = await loader.loadAsync(assetPath);
    activeAssetPath = assetPath;
    const modelScene = gltf.scene;

    modelScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          child.material.side = THREE.FrontSide;
        }
      }
    });

    frameModel(modelScene);

    const animationNames = (gltf.animations || []).map(
      (clip, index) => clip.name || `unnamed_${index}`,
    );
    window.__modelAnimationNames = animationNames;
    console.log("[resume] Loaded model:", assetPath);
    console.log("[resume] Animation names:", animationNames);

    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(activeModel);
      gltf.animations.forEach((clip, index) => {
        const clipName = clip.name || `unnamed_${index}`;
        clipActions.set(clipName, mixer.clipAction(clip));
      });

      mixer.addEventListener("finished", (event) => {
        if (event.action !== idleAction) {
          playIdleAnimation();
        }
      });

      idleAction =
        clipActions.get(IDLE_CLIP_NAME) ||
        clipActions.get(animationNames[0]) ||
        null;
      playIdleAnimation();
    } else {
      mixer = null;
    }

    setViewerState("ready", "3D preview ready");
  } catch (error) {
    activeAssetPath = null;
    mixer = null;
    console.error(error);
    setViewerState(
      "fallback",
      "3D model failed to load. Try opening this page through a local server.",
    );
  } finally {
    window.setTimeout(() => {
      videoShell.classList.remove("is-switching");
    }, 220);
  }
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  mixer?.update(delta);
  controls?.update();
  renderer?.render(scene, camera);
}

let activeSectionId = window.localStorage.getItem(STORAGE_KEY) || "experience";

if (!sections.some((section) => section.id === activeSectionId)) {
  activeSectionId = "experience";
}

function focusSectionByOffset(offset) {
  const currentIndex = sections.findIndex(
    (section) => section.id === activeSectionId,
  );
  const nextIndex = (currentIndex + offset + sections.length) % sections.length;
  setActiveSection(sections[nextIndex].id, { focusButton: true });
}

function renderOrbitIcons() {
  iconRail.innerHTML = "";

  sections.forEach((section) => {
    const icon = document.createElement("div");
    icon.className = `icon-node${section.id === activeSectionId ? " is-active" : ""}`;
    icon.innerHTML = iconMarkup[section.icon] || iconMarkup.monitor;
    iconRail.appendChild(icon);
  });
}

function updateOrbitPath() {
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

  heroOrbit.setAttribute(
    "viewBox",
    `0 0 ${stageRect.width} ${stageRect.height}`,
  );
  heroOrbitPath.setAttribute("d", d);

  return { stageRect, pathLength: heroOrbitPath.getTotalLength() };
}

function layoutArcItems() {
  if (window.innerWidth <= 760) return;

  const orbit = updateOrbitPath();
  if (!orbit) return;

  const { stageRect, pathLength } = orbit;
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

function renderNav() {
  navCluster.innerHTML = "";
  iconRail.innerHTML = "";

  sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `nav-item${section.id === activeSectionId ? " is-active" : ""}`;
    button.dataset.section = section.id;
    button.id = `tab-${section.id}`;
    button.setAttribute("role", "tab");
    button.setAttribute(
      "tabindex",
      section.id === activeSectionId ? "0" : "-1",
    );
    button.setAttribute(
      "aria-selected",
      String(section.id === activeSectionId),
    );
    button.setAttribute("aria-controls", "panelRoot");
    button.setAttribute("aria-pressed", String(section.id === activeSectionId));
    button.innerHTML = `
                    <span class="nav-item-icon" aria-hidden="true">${iconMarkup[section.icon] || iconMarkup.monitor}</span>
                    <span class="nav-item-label">${section.label}</span>
                `;
    button.addEventListener("click", () => setActiveSection(section.id));
    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        focusSectionByOffset(1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        focusSectionByOffset(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActiveSection(sections[0].id, { focusButton: true });
      }

      if (event.key === "End") {
        event.preventDefault();
        setActiveSection(sections[sections.length - 1].id, {
          focusButton: true,
        });
      }
    });
    navCluster.appendChild(button);
  });

  renderOrbitIcons();
  window.requestAnimationFrame(layoutArcItems);
}

function renderTimeline(items) {
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

function renderHighlights(items) {
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

function renderPanel() {
  const section =
    sections.find((entry) => entry.id === activeSectionId) || sections[0];
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

function syncHeroAsset(section) {
  const nextModel = section.modelSrc || "./idle_two.glb";
  loadModel(nextModel);
}

function setActiveSection(sectionId, options = {}) {
  activeSectionId = sectionId;
  window.localStorage.setItem(STORAGE_KEY, sectionId);
  renderNav();
  renderPanel();
  const section =
    sections.find((entry) => entry.id === sectionId) || sections[0];
  syncHeroAsset(section);

  if (options.playAnimation !== false) {
    if (activeAssetPath === section.modelSrc) {
      playSectionAnimation(section.animationClip);
    } else {
      window.setTimeout(() => playSectionAnimation(section.animationClip), 280);
    }
  }

  if (options.focusButton) {
    document.getElementById(`tab-${sectionId}`)?.focus();
  }
}

initThree();
window.addEventListener("resize", () =>
  window.requestAnimationFrame(layoutArcItems),
);
setActiveSection(activeSectionId, { playAnimation: false });
