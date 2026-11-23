export type ProjectAccent = "lime" | "lavender" | "coral";

export type ProjectVisual = "phone-chart" | "phone-map" | "phone-stories" | "terminal";

export type ProjectCaseStudy = {
  problem: string;
  motivation: string;
  solution: string;
  architecture: string[];
  decisions: string[];
  challenges: string[];
  outcomes: string[];
  lessons: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  accent: ProjectAccent;
  visual: ProjectVisual;
  shortDescription: string;
  featured: boolean;
  tech: string[];
  highlights: string[];
  caseStudy: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    slug: "urec-radar",
    title: "UREC Radar",
    category: "AI + Data",
    accent: "lime",
    visual: "phone-chart",
    shortDescription:
      "Predicts gym crowd levels at JMU using machine learning.",
    featured: true,
    tech: [
      "Python",
      "LightGBM",
      "FastAPI",
      "React",
      "Three.js",
      "Local LLM",
    ],
    highlights: [
      "430K+ simulated training records",
      "Placed second at Fall 2026 Madison Make-A-Thon",
    ],
    caseStudy: {
      problem:
        "JMU students often show up to the UREC gym without knowing how crowded it will be, which wastes time and makes workouts harder to plan.",
      motivation:
        "I wanted a practical campus tool that used real ML techniques on a problem students actually feel every week — not a demo model with no user.",
      solution:
        "UREC Radar predicts gym crowd levels from historical and simulated patterns, then surfaces those predictions in a clean mobile-first dashboard with visual crowd indicators.",
      architecture: [
        "LightGBM model trained on simulated gym traffic features",
        "FastAPI inference service for prediction requests",
        "React frontend with crowd-level charts and status indicators",
        "Three.js visuals for exploratory dashboard moments",
        "Local LLM integration for natural-language crowd insights",
      ],
      decisions: [
        "Used LightGBM for tabular prediction speed and interpretability on structured gym features",
        "Simulated large training sets when live historical volume was limited, then validated against plausible campus patterns",
        "Kept the product mobile-first so students could check before walking over",
      ],
      challenges: [
        "Balancing simulated data volume with realistic campus seasonality",
        "Communicating prediction confidence without overclaiming accuracy",
        "Shipping a polished demo under Make-A-Thon time pressure",
      ],
      outcomes: [
        "Second place at the Fall 2026 Madison Make-A-Thon",
        "End-to-end pipeline from model training to interactive student-facing UI",
      ],
      lessons: [
        "Campus problems make great product constraints — the user is never abstract",
        "A clear visual metaphor for crowd level matters as much as the model",
        "Hackathon speed still benefits from deliberate architecture choices",
      ],
    },
  },
  {
    slug: "roamer",
    title: "Roamer",
    category: "Product",
    accent: "lavender",
    visual: "phone-map",
    shortDescription:
      "A campus mobility platform for students, by students.",
    featured: true,
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    highlights: [
      "100+ ride coordination requests per week",
      "CI/CD with GitHub Actions for lint, typecheck, and deploy",
      "Dec 2025 – Present",
    ],
    caseStudy: {
      problem:
        "Getting around campus for org events is fragmented — riders, drivers, and admins juggle group chats instead of a purpose-built workflow.",
      motivation:
        "I cared about designing something students would actually trust: invite-only, role-aware, and focused on safe campus mobility rather than generic ride-hailing.",
      solution:
        "Roamer is a campus-first mobility platform built with Next.js and PostgreSQL — coordinating rides with realtime updates, structured data models, and automated deployment.",
      architecture: [
        "Next.js backend in TypeScript with API routes and realtime updates for ride coordination",
        "PostgreSQL schemas for ride, org, and coordination data (300+ rows in active use)",
        "GitHub Actions CI/CD enforcing linting and type checks on every PR, then auto-deploying validated code",
        "Tailwind CSS for a clean, mobile-friendly student interface",
      ],
      decisions: [
        "Chose Next.js end-to-end so the product API and UI could ship as one system",
        "Modeled ride coordination in PostgreSQL early to keep requests, roles, and history consistent",
        "Invested in CI/CD so campus iteration wouldn't break on every merge",
      ],
      challenges: [
        "Designing for multiple roles without making the interface feel heavy",
        "Keeping realtime coordination reliable under weekly campus demand",
        "Balancing safety constraints with a frictionless student experience",
      ],
      outcomes: [
        "Handled 100+ ride coordination requests per week",
        "PostgreSQL-backed data model supporting ongoing campus usage",
        "Automated lint, typecheck, and deploy pipeline on every pull request",
      ],
      lessons: [
        "Product clarity beats feature count for campus tools",
        "Realtime UX only works if the data model is honest about roles and state",
        "CI/CD is part of the product when you're iterating with real users",
      ],
    },
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    category: "AI Infrastructure",
    accent: "coral",
    visual: "terminal",
    shortDescription:
      "Building AI agents, developer tools, and intelligent infrastructure.",
    featured: false,
    tech: [
      "Python",
      "FastAPI",
      "A2A Protocol",
      "MCP",
      "Qdrant",
      "Docker",
      "Kubernetes",
      "MLflow",
    ],
    highlights: [
      "5 multi-agent systems with A2A + FastAPI",
      "42% reduction in LLM token consumption via MCP",
      "Semantic search over 2700+ documents",
    ],
    caseStudy: {
      problem:
        "Shipping useful AI systems requires more than a prompt — agents need tooling, evaluation, observability, and reliable infrastructure.",
      motivation:
        "At Dark Wolf Solutions I wanted to deepen the layer behind AI products: how agents communicate, retrieve context, get evaluated, and run in production-minded environments.",
      solution:
        "Built multi-agent systems, an MCP-powered tool server, semantic search infrastructure, and an MLflow benchmarking framework for observability and workflow optimization.",
      architecture: [
        "5 AI agents orchestrated with A2A protocol, FastAPI, and Python",
        "MCP server for on-demand tool calls and structured retrieval instead of oversized prompt context",
        "Semantic search platform over 2700+ documents using Qdrant, embeddings, and computer vision pipelines",
        "Docker and Kubernetes deployment for search and agent infrastructure",
        "MLflow-based agent benchmarking with automated evaluation, execution tracing, and performance analytics",
      ],
      decisions: [
        "Used MCP so agents could fetch structured data on demand instead of stuffing prompts",
        "Made evaluation and tracing first-class through MLflow rather than treating observability as optional",
        "Containerized search and agent services for repeatable deployment",
      ],
      challenges: [
        "Keeping multi-agent communication scalable without opaque failure modes",
        "Cutting token cost without hurting answer quality",
        "Turning benchmark insights into concrete workflow improvements",
      ],
      outcomes: [
        "Built and orchestrated 5 AI agents for multi-agent communication",
        "Reduced LLM token consumption by 42% with MCP-based tool access",
        "Deployed semantic search over 2700+ documents",
        "Improved agent observability by 15%+ and reduced tool calls by 10%+ via MLflow insights",
      ],
      lessons: [
        "Infrastructure and evaluation are part of the product experience for AI systems",
        "Tool boundaries beat giant prompts for cost, clarity, and control",
        "Benchmarking only matters if it changes how the agents actually run",
      ],
    },
  },
  {
    slug: "git-ai",
    title: "Git AI",
    category: "Open Source",
    accent: "lime",
    visual: "terminal",
    shortDescription:
      "Open-source AI-powered Git CLI with multi-provider LLM support and terminal commit workflows.",
    featured: false,
    tech: ["Shell", "LLMs", "Bash", "Git"],
    highlights: [
      "Supports 3+ LLM providers",
      "June 2026 – Present",
      "Improved commit/PR prompt quality across 5 templates",
    ],
    caseStudy: {
      problem:
        "AI Git assistants often break in real terminals — interactive editing, piped workflows, and commit/PR quality vary wildly across environments.",
      motivation:
        "I wanted to harden an open-source AI Git CLI so developers get reliable commit editing and better generated messages, not fragile demos.",
      solution:
        "Enhanced an open-source AI-powered Git CLI with terminal-based commit editing, cross-environment reliability fixes, and redesigned prompt templates.",
      architecture: [
        "Shell/Bash CLI with raw TTY control and Git editor integration",
        "Support for 3+ LLM providers",
        "Prompt templates for commit and pull request generation",
      ],
      decisions: [
        "Treated terminal I/O edge cases as product bugs, not user error",
        "Redesigned prompts across 5 templates to reduce commit-type misclassification",
        "Prioritized concise developer-facing output over verbose AI prose",
      ],
      challenges: [
        "Interactive vs piped workflow differences across shells and editors",
        "Keeping multi-provider behavior consistent",
        "Debugging TTY and editor invocation without breaking core Git flows",
      ],
      outcomes: [
        "Implemented terminal-based commit editing workflows with Bash, raw TTY control, and Git editor integration",
        "Resolved 4 critical CLI edge cases affecting interactive and piped workflows",
        "Improved AI-generated commit and PR quality across 5 redesigned prompt templates",
      ],
      lessons: [
        "CLI reliability lives in the boring edge cases",
        "Prompt design is product design when the user is a developer mid-flow",
        "Open source is a forcing function for clarity and portability",
      ],
    },
  },
  {
    slug: "stori",
    title: "Stori",
    category: "AI + Product",
    accent: "lavender",
    visual: "phone-stories",
    shortDescription:
      "Helping first-generation students share and discover real-world guidance through semantic search.",
    featured: true,
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ChromaDB",
      "SQLite",
      "Google Gemini",
    ],
    highlights: [
      "RAG + ChromaDB semantic search",
      "Video transcription and embedding pipeline",
      "Mar 2026 – May 2026",
    ],
    caseStudy: {
      problem:
        "First-generation students often lack access to lived guidance from people who have already navigated school, careers, and unfamiliar systems.",
      motivation:
        "I wanted to build something that made peer experience searchable — less about impressive AI, more about helping students find relevant stories when they need them.",
      solution:
        "Stori is a full-stack app where first-gen students share experiences and discover relevant guidance through RAG-powered semantic search over transcribed media.",
      architecture: [
        "Next.js + TypeScript + Tailwind CSS application",
        "RAG pipeline with ChromaDB for semantic retrieval",
        "Video transcription and embedding creation workflow",
        "SQLite for application data",
        "Google Gemini for generative/AI workflow support",
      ],
      decisions: [
        "Centered the product on first-gen student stories instead of generic Q&A",
        "Used embeddings so discovery worked by meaning, not just keywords",
        "Kept the stack pragmatic so an end-to-end media → search pipeline could ship",
      ],
      challenges: [
        "Turning unstructured audio/video into reliable searchable knowledge",
        "Keeping retrieval relevant without overcomplicating the UX",
        "Designing for trust and usefulness around personal stories",
      ],
      outcomes: [
        "Shipped a full-stack experience-sharing product for first-generation students",
        "Built a semantic search system with transcription and embedding pipelines",
        "Made peer guidance easier to retrieve by meaning rather than exact phrasing",
      ],
      lessons: [
        "AI is most valuable when it removes friction from a human need",
        "RAG quality depends as much on ingestion as on the model",
        "Product framing matters — who it's for changes every technical choice",
      ],
    },
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export const accentClasses: Record<
  ProjectAccent,
  { bg: string; soft: string; ring: string }
> = {
  lime: {
    bg: "bg-lime",
    soft: "bg-[#E8F7B8]",
    ring: "ring-lime/60",
  },
  lavender: {
    bg: "bg-lavender",
    soft: "bg-[#DDD3F8]",
    ring: "ring-lavender/60",
  },
  coral: {
    bg: "bg-coral",
    soft: "bg-[#FFC4AE]",
    ring: "ring-coral/60",
  },
};
