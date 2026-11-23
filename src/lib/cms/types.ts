export type ContentStatus = "draft" | "published";
export type ExperienceStatus = "upcoming" | "completed" | "ongoing";
export type ProjectVisual = "phone-chart" | "phone-map" | "phone-stories" | "terminal";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type LifePhoto = {
  src: string;
  alt: string;
};

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

export type SiteContent = {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  headshot: string;
  headline: string;
  roleLine: string;
  about: string;
  aboutMore: string;
  contactHeading: string;
  contactNote: string;
  footerNote: string;
  navLinks: NavLink[];
  lifePhotos: LifePhoto[];
};

export type ProjectContent = {
  id: string;
  slug: string;
  title: string;
  category: string;
  visual: ProjectVisual;
  shortDescription: string;
  featured: boolean;
  sortOrder: number;
  tech: string[];
  highlights: string[];
  caseStudy: ProjectCaseStudy;
  coverUrl?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  externalUrl?: string | null;
  status: ContentStatus;
};

export type ExperienceContent = {
  id: string;
  slug: string;
  org: string;
  role: string;
  period: string;
  location?: string;
  status: ExperienceStatus;
  summary: string;
  responsibilities: string[];
  tools: string[];
  lessons: string[];
  sortOrder: number;
  publishStatus: ContentStatus;
};

export type PortfolioContent = {
  site: SiteContent;
  projects: ProjectContent[];
  experience: ExperienceContent[];
  source: "database" | "static";
};

export type MediaAsset = {
  id: string;
  path: string;
  filename: string;
  alt: string;
  category: string;
  mimeType?: string | null;
  sizeBytes?: number | null;
  publicUrl: string;
};
