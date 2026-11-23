export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  period: string;
  location?: string;
  status: "upcoming" | "completed" | "ongoing";
  summary: string;
  responsibilities: string[];
  tools: string[];
  lessons: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "deloitte",
    org: "Deloitte",
    role: "Incoming AI & Data Engineering Summer Scholar",
    period: "Summer 2027",
    status: "upcoming",
    summary:
      "Incoming AI & Data Engineering Summer Scholar role focused on applied AI and data engineering.",
    responsibilities: [
      "Contribute to AI and data engineering project work in a professional services environment",
      // Confirm exact team focus closer to start — not listed on current résumé
    ],
    tools: ["AI / ML", "Data Engineering"],
    lessons: [
      "Preparing to translate internship and research experience into client-facing engineering work",
    ],
  },
  {
    id: "dark-wolf",
    org: "Dark Wolf Solutions",
    role: "Software Engineer Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Herndon, VA",
    status: "completed",
    summary:
      "Software engineering internship building multi-agent systems, semantic search infrastructure, and AI evaluation tooling.",
    responsibilities: [
      "Orchestrated and built 5 AI agents using A2A protocol, FastAPI, and Python for scalable multi-agent communication systems",
      "Developed and deployed a semantic search platform processing 2700+ documents with Qdrant, embedding models, and computer vision pipelines via Docker and Kubernetes",
      "Reduced LLM token consumption by 42% by building an MCP server that replaced large prompt context with on-demand tool calls and structured data retrieval",
      "Constructed an MLflow-based AI agent benchmarking framework that improved agent observability by 15%+ through automated evaluation, execution tracing, and performance analytics",
      "Used MLflow benchmark insights to reduce AI agent tool calls by 10%+ by identifying execution inefficiencies and optimizing agent workflows",
    ],
    tools: [
      "Python",
      "FastAPI",
      "A2A Protocol",
      "MCP",
      "Qdrant",
      "Docker",
      "Kubernetes",
      "MLflow",
    ],
    lessons: [
      "Production AI work is as much about tooling and observability as model quality",
      "Replacing giant prompts with structured tool access can cut cost and improve reliability",
    ],
  },
  {
    id: "jmu-research",
    org: "James Madison University",
    role: "Undergraduate Research Assistant",
    period: "Jan 2026 – May 2026",
    location: "Harrisonburg, VA",
    status: "completed",
    summary:
      "Research assistantship focused on terrain visibility analysis — mapping, heatmaps, and geometric edge cases across elevation datasets.",
    responsibilities: [
      "Designed a Python mapping program connecting 4 input points to generate visual heatmaps for terrain analysis",
      "Visualized visibility probability across hundreds of terrain models",
      "Analyzed elevation datasets and geometric representations to identify 5+ edge cases and visibility constraints within complex terrain",
    ],
    tools: ["Python", "Data visualization", "Geometric analysis"],
    lessons: [
      "Research problems reward careful edge-case thinking as much as core algorithms",
      "Clear visualization turns dense spatial data into something people can reason about",
    ],
  },
  {
    id: "pure-shine",
    org: "Pure Shine Pressure Washing",
    role: "Founder",
    period: "Entrepreneurial",
    status: "completed",
    summary:
      "Founded and operated a local pressure washing service — sales, ops, customer experience, and delivery.",
    responsibilities: [
      "Built and ran day-to-day operations for a local service business",
      "Handled customer acquisition, scheduling, and service delivery",
      "Learned pricing, reliability, and what it takes to earn repeat trust",
    ],
    tools: ["Operations", "Customer service", "Sales"],
    lessons: [
      "Shipping for real customers teaches accountability faster than any classroom project",
      "Entrepreneurship sharpens product instincts: clarity, reliability, and follow-through",
    ],
  },
  {
    id: "jmu",
    org: "James Madison University",
    role: "B.S. Computer Science, Minor in Math",
    period: "Aug 2024 – May 2028",
    location: "Harrisonburg, VA",
    status: "ongoing",
    summary:
      "Computer Science major with a math minor, building practical software, AI tools, and campus products.",
    responsibilities: [
      "Relevant coursework: Advanced Programming, Discrete Structures I & II, Algorithms and Data Structures, Software Engineering, Computer Systems I",
      "Independent and team projects spanning AI, product, and infrastructure",
      "Campus entrepreneurship and leadership experiences outside the classroom",
    ],
    tools: [
      "Java",
      "Python",
      "C++",
      "JavaScript",
      "TypeScript",
      "PostgreSQL",
      "Next.js",
      "React",
      "Git",
    ],
    lessons: [
      "The best learning comes from building things people can actually use",
      "Technical depth and product judgment reinforce each other",
    ],
  },
];
