import { experience as staticExperience } from "@/data/experience";
import { projects as staticProjects } from "@/data/projects";
import { lifePhotos, navLinks, site as staticSite } from "@/data/site";
import type {
  ExperienceContent,
  PortfolioContent,
  ProjectContent,
  SiteContent,
} from "@/lib/cms/types";

export function getStaticSite(): SiteContent {
  return {
    name: staticSite.name,
    shortName: staticSite.shortName,
    title: staticSite.title,
    description: staticSite.description,
    url: staticSite.url,
    email: staticSite.email,
    github: staticSite.github,
    linkedin: staticSite.linkedin,
    headshot: staticSite.headshot,
    headline: staticSite.headline,
    roleLine: staticSite.roleLine,
    about: staticSite.about,
    aboutMore: staticSite.aboutMore,
    contactHeading: staticSite.contactHeading,
    contactNote: staticSite.contactNote,
    footerNote: staticSite.footerNote,
    navLinks: navLinks.map((link) => ({ ...link })),
    lifePhotos: lifePhotos.map((photo) => ({ ...photo })),
  };
}

export function getStaticProjects(): ProjectContent[] {
  return staticProjects.map((project, index) => ({
    id: project.slug,
    slug: project.slug,
    title: project.title,
    category: project.category,
    visual: project.visual,
    shortDescription: project.shortDescription,
    featured: project.featured,
    sortOrder: index,
    tech: [...project.tech],
    highlights: [...project.highlights],
    caseStudy: {
      problem: project.caseStudy.problem,
      motivation: project.caseStudy.motivation,
      solution: project.caseStudy.solution,
      architecture: [...project.caseStudy.architecture],
      decisions: [...project.caseStudy.decisions],
      challenges: [...project.caseStudy.challenges],
      outcomes: [...project.caseStudy.outcomes],
      lessons: [...project.caseStudy.lessons],
    },
    status: "published",
  }));
}

export function getStaticExperience(): ExperienceContent[] {
  return staticExperience.map((item, index) => ({
    id: item.id,
    slug: item.id,
    org: item.org,
    role: item.role,
    period: item.period,
    location: item.location,
    status: item.status,
    summary: item.summary,
    responsibilities: item.responsibilities.filter((line) => !line.includes("//")),
    tools: [...item.tools],
    lessons: [...item.lessons],
    sortOrder: index,
    publishStatus: "published",
  }));
}

export function getStaticPortfolio(): PortfolioContent {
  return {
    site: getStaticSite(),
    projects: getStaticProjects(),
    experience: getStaticExperience(),
    source: "static",
  };
}
