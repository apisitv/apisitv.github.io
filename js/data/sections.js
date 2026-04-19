// export const sections = [
//   {
//     id: "frontend",
//     label: "Frontend Engineer",
//     heading: "Frontend Engineer",
//     title: "Interfaces that feel fast, clear, and intentional",
//     description:
//       "This section is the default hero state. It focuses on interface design, component architecture, and the interaction quality that makes a product feel finished.",
//     modelSrc: "./assets/models/pok_demo_with_animate.glb",
//     animationClip: "Phone_Conversation",
//     layout: "highlights",
//     icon: "monitor",
//     meta: ["UI Systems", "Interaction Detail", "Responsive Design"],
//     highlights: [
//       {
//         title: "UI Engineering",
//         description:
//           "Build reusable interface systems with clean state transitions, crisp spacing, and strong visual hierarchy.",
//         points: [
//           "Component-driven development",
//           "Accessible interactions",
//           "Responsive layout strategy",
//         ],
//       },
//       {
//         title: "Interaction Detail",
//         description:
//           "Treat motion and feedback as product behavior, not decoration.",
//         points: [
//           "Hover and selected states",
//           "Micro-transition tuning",
//           "Visual consistency across views",
//         ],
//       },
//     ],
//   },
//   {
//     id: "architecture",
//     label: "System Architecture",
//     heading: "System Architecture",
//     title: "From screen-level concerns to product structure",
//     description:
//       "Use this state to explain how the frontend fits into a larger system: modules, integration boundaries, and delivery decisions.",
//     modelSrc: "./assets/models/pok_demo_with_animate.glb",
//     animationClip: "Shrug",
//     layout: "highlights",
//     icon: "spark",
//     meta: ["Scalable Frontend", "Integration Boundaries", "Pattern Layer"],
//     highlights: [
//       {
//         title: "Module Boundaries",
//         description:
//           "Separate view concerns, data contracts, and service orchestration so the UI can evolve without forcing rewrites.",
//         points: [
//           "Feature-based composition",
//           "Shared token and pattern layer",
//           "Stable render contracts",
//         ],
//       },
//       {
//         title: "Scale Considerations",
//         description:
//           "Keep the page ready for more sections, more media states, and richer cards on the right panel.",
//         points: [
//           "Data-driven sections",
//           "Model source abstraction",
//           "Future-proof content schema",
//         ],
//       },
//     ],
//   },
//   {
//     id: "logic",
//     label: "Application Logic",
//     heading: "Application Logic",
//     title: "State, switching, and behavior live here",
//     description:
//       "The left menu, central media, and right card all depend on the same state. This section is where the interaction model is explained.",
//     modelSrc: "./assets/models/pok_demo_with_animate.glb",
//     animationClip: "Sword_Parry_Backward",
//     layout: "highlights",
//     icon: "crown",
//     meta: ["State Flow", "UI Behavior", "View Coordination"],
//     highlights: [
//       {
//         title: "Single Source of Truth",
//         description:
//           "A single active section controls navigation, card rendering, and which media asset should be shown.",
//         points: [
//           "Predictable UI updates",
//           "Low coupling between blocks",
//           "Easy section expansion",
//         ],
//       },
//       {
//         title: "Interaction Flow",
//         description:
//           "Click left item, update active styling, rerender right panel, then trigger the relevant model animation.",
//         points: [
//           "Minimal JS surface area",
//           "Declarative render path",
//           "Ready for async media later",
//         ],
//       },
//     ],
//   },
//   {
//     id: "analytics",
//     label: "Data & Analytics",
//     heading: "Data & Analytics",
//     title: "A place for metrics, outcomes, and signal",
//     description:
//       "This panel can shift from timeline content to decision-support content without changing the base shell of the UI.",
//     modelSrc: "./assets/models/pok_demo_with_animate.glb",
//     animationClip: "Talk_Passionately",
//     layout: "highlights",
//     icon: "mute",
//     meta: ["Decision Support", "Behavior Signal", "Readable Summaries"],
//     highlights: [
//       {
//         title: "User Signal",
//         description:
//           "Explain how data validates design choices or informs the next interface iteration.",
//         points: [
//           "Behavioral patterns",
//           "Conversion or engagement metrics",
//           "Observed friction points",
//         ],
//       },
//       {
//         title: "Presentation Layer",
//         description:
//           "Even analytical content should feel aligned with the same visual system as the rest of the page.",
//         points: [
//           "Card-based summaries",
//           "Readable supporting text",
//           "Consistent density and rhythm",
//         ],
//       },
//     ],
//   },
//   {
//     id: "experience",
//     label: "Timeline Experience",
//     heading: "Experience",
//     title: "Relevant roles arranged as a readable timeline",
//     description:
//       "This is the timeline card matching the original concept. It remains one of several view modes for the right-side panel.",
//     modelSrc: "./assets/models/pok_demo_with_animate.glb",
//     animationClip: "Motivational_Cheer",
//     layout: "timeline",
//     icon: "stack",
//     meta: ["Career Snapshot", "Timeline View", "Readable Density"],
//     timeline: [
//       {
//         title: "Software Engineer",
//         company: "Internet Thailand Public Company Limited",
//         period: "Mar 2024 - Present - 2 years",
//         active: true,
//       },
//       {
//         title: "Programmer",
//         company: "Premier System Engineering Co., Ltd.",
//         period: "May 2023 - Mar 2024 - 11 months",
//         active: false,
//       },
//       {
//         title: "Research Assistant",
//         company: "National Electronics and Computer Technology Center (NECTEC)",
//         period: "Jan 2021 - Apr 2021 - 4 months",
//         active: false,
//       },
//     ],
//   },
// ];

export const sections = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    heading: "Frontend Engineering",
    title: "Build data-heavy interfaces that perform in real-world usage",
    description:
      "Develop scalable frontend systems focused on dashboards, large datasets, and complex interactions. Emphasis on performance, clarity, and maintainable component architecture.",
    modelSrc: "./assets/models/pok_demo_with_animate.glb",
    animationClip: "Phone_Conversation",
    layout: "highlights",
    icon: "monitor",
    meta: ["React", "Performance", "Data Visualization"],
    highlights: [
      {
        title: "Scalable UI Systems",
        description:
          "Design reusable components that support complex workflows and dynamic data.",
        points: [
          "Reusable DataTable with filtering & selection",
          "Dynamic multi-level filter tree",
          "Component-driven architecture (MUI + custom hooks)",
        ],
      },
      {
        title: "Performance Optimization",
        description:
          "Ensure smooth user experience under heavy data and frequent state updates.",
        points: [
          "Memoization (useMemo, useCallback)",
          "Lazy loading & code splitting",
          "Chart optimization (ApexCharts)",
        ],
      },
    ],
  },
  {
    id: "system",
    label: "System Design & Architecture",
    heading: "System Design",
    title: "Design systems that scale with business complexity",
    description:
      "Translate business requirements into structured systems with clear boundaries, maintainable architecture, and extensible design.",
    modelSrc: "./assets/models/pok_demo_with_animate.glb",
    animationClip: "Shrug",
    layout: "highlights",
    icon: "spark",
    meta: ["Architecture", "Modular Design", "System Thinking"],
    highlights: [
      {
        title: "System Architecture",
        description:
          "Design backend and frontend systems with clear separation of concerns.",
        points: [
          "Controller / Service / Repository pattern",
          "Modular API design",
          "Separation of UI, logic, and data layers",
        ],
      },
      {
        title: "System Modeling",
        description:
          "Use structured approaches to define system behavior and flows.",
        points: [
          "DFD, Use Case, and System Flow",
          "Business process mapping",
          "Scalable feature design",
        ],
      },
    ],
  },
  {
    id: "data",
    label: "Data & Backend Logic",
    heading: "Data & Logic",
    title: "Handle data flow, business rules, and dynamic queries",
    description:
      "Build backend logic and data processing systems that transform raw data into structured, queryable, and meaningful outputs.",
    modelSrc: "./assets/models/pok_demo_with_animate.glb",
    animationClip: "Sword_Parry_Backward",
    layout: "highlights",
    icon: "crown",
    meta: ["Backend", "API Design", "Query Engine"],
    highlights: [
      {
        title: "Query Engine",
        description:
          "Develop flexible query systems for dynamic reporting and analytics.",
        points: [
          "Dynamic SQL generation",
          "Aggregation, grouping, filtering",
          "Pagination & performance optimization",
        ],
      },
      {
        title: "API & Business Logic",
        description:
          "Design APIs that align with real-world business workflows.",
        points: [
          "REST API with Express & TypeScript",
          "Validation & middleware layer",
          "Business rule implementation",
        ],
      },
    ],
  },
  {
    id: "fintech",
    label: "FinTech & Payment Systems",
    heading: "FinTech Domain",
    title: "Solve real payment and reconciliation problems",
    description:
      "Experience building systems related to payment processing, virtual accounts, and reconciliation workflows in B2B environments.",
    modelSrc: "./assets/models/pok_demo_with_animate.glb",
    animationClip: "Talk_Passionately",
    layout: "highlights",
    icon: "stack",
    meta: ["Payment", "Reconciliation", "Financial Systems"],
    highlights: [
      {
        title: "Payment Flow",
        description: "Understand and design end-to-end payment processes.",
        points: [
          "Invoice → Payment → Verification flow",
          "Virtual Account integration",
          "Handling multi-invoice payments",
        ],
      },
      {
        title: "Reconciliation",
        description:
          "Match incoming payments with invoices and financial records.",
        points: [
          "Statement matching",
          "Slip verification",
          "Payment-to-invoice mapping",
        ],
      },
      {
        title: "Fraud & Risk",
        description: "Detect abnormal transaction behavior and manage risk.",
        points: [
          "Rule-based detection",
          "Scoring system",
          "Case management flow",
        ],
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    heading: "Experience",
    title: "Professional journey in software engineering",
    description:
      "Hands-on experience in building systems, designing architecture, and solving real business problems.",
    modelSrc: "./assets/models/pok_demo_with_animate.glb",
    animationClip: "Motivational_Cheer",
    layout: "timeline",
    icon: "stack",
    meta: ["Career", "Timeline", "Experience"],
    timeline: [
      {
        title: "Software Engineer",
        company: "Internet Thailand Public Company Limited",
        period: "Mar 2024 - Present",
        active: true,
      },
      {
        title: "Programmer",
        company: "Premier System Engineering Co., Ltd.",
        period: "May 2023 - Mar 2024",
        active: false,
      },
      {
        title: "Research Assistant",
        company: "National Electronics and Computer Technology Center (NECTEC)",
        period: "Jan 2021 - Apr 2021",
        active: false,
      },
    ],
  },
];
