export const site = {
  name: "Carter Nguyen",
  shortName: "Carter",
  title: "Carter Nguyen — Software Engineer",
  description:
    "Software engineer at JMU building AI systems, campus products, and tools people actually use.",
  url: "https://carternguyen.dev",
  email: "cnguyen4378@gmail.com",
  github: "https://github.com/cnguyen4378",
  linkedin: "https://www.linkedin.com/in/carternguyen/",
  headshot: "/profile.jpg",
  headline: "Engineering ideas into reality.",
  roleLine: "Software Engineer | AI & Data | Creative Problem Solver",
  about:
    "Computer Science at James Madison University, with a math minor. I care about software that solves real problems — campus tools students trust, AI systems that stay observable, and products that feel considered end to end.",
  aboutMore:
    "I learn by building: ship something useful, notice where it breaks, refine the craft. Outside of code I’m usually outside — climbing, skiing, hiking — or behind a set figuring out pacing and energy.",
  contactHeading: "Let's build something meaningful.",
  contactNote: "Open to internships, collaborations, and curious conversations.",
  footerNote: "Designed and built by Carter Nguyen.",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const lifePhotos = [
  {
    src: "/images/life/makeathon.jpg",
    alt: "At Madison Make-A-Thon",
  },
  {
    src: "/images/life/climbing-gym.jpg",
    alt: "Indoor bouldering",
  },
  {
    src: "/images/life/skiing.jpg",
    alt: "On-mountain skiing",
  },
  {
    src: "/images/life/djing.jpg",
    alt: "DJing a set",
  },
  {
    src: "/images/life/vietnam-temple.jpg",
    alt: "Temple visit in Vietnam",
  },
  {
    src: "/images/life/sunset-hike.jpg",
    alt: "Mountain overlook hike",
  },
  {
    src: "/images/life/waterfall-hike.jpg",
    alt: "Woods waterfall hike",
  },
] as const;
