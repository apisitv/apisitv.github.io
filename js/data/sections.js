export const sections = [
  {
    id: "frontend",
    label: "Frontend Engineer",
    heading: "Frontend Engineer",
    title: "Interfaces that feel fast, clear, and intentional",
    description:
      "This section is the default hero state. It focuses on interface design, component architecture, and the interaction quality that makes a product feel finished.",
    modelSrc: "./assets/models/idle_two.glb",
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
    modelSrc: "./assets/models/idle_two.glb",
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
          "Model source abstraction",
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
    modelSrc: "./assets/models/idle_two.glb",
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
          "Click left item, update active styling, rerender right panel, then trigger the relevant model animation.",
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
    modelSrc: "./assets/models/idle_two.glb",
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
    modelSrc: "./assets/models/idle_two.glb",
    animationClip: "Hello_Run",
    layout: "timeline",
    icon: "stack",
    meta: ["Career Snapshot", "Timeline View", "Readable Density"],
    timeline: [
      {
        title: "Software Engineer",
        company: "Internet Thailand Public Company Limited",
        period: "Mar 2024 - Present - 2 years",
        active: true,
      },
      {
        title: "Programmer",
        company: "Premier System Engineering Co., Ltd.",
        period: "May 2023 - Mar 2024 - 11 months",
        active: false,
      },
      {
        title: "Research Assistant",
        company: "National Electronics and Computer Technology Center (NECTEC)",
        period: "Jan 2021 - Apr 2021 - 4 months",
        active: false,
      },
    ],
  },
];
