import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/lib/cms/types";

function LinkIcon({ name }: { name: "mail" | "github" | "linkedin" }) {
  if (name === "mail") return <Mail size={16} strokeWidth={1.75} aria-hidden />;
  if (name === "github") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.537 2.865 8.387 6.839 9.747.5.094.683-.222.683-.48 0-.237-.009-.866-.014-1.7-2.782.62-3.369-1.38-3.369-1.38-.455-1.181-1.11-1.495-1.11-1.495-.908-.638.069-.625.069-.625 1.003.072 1.53 1.06 1.53 1.06.892 1.57 2.341 1.116 2.91.854.091-.662.35-1.116.636-1.372-2.22-.259-4.555-1.143-4.555-5.087 0-1.124.39-2.043 1.029-2.763-.103-.26-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.055A9.27 9.27 0 0 1 12 6.918a9.27 9.27 0 0 1 2.504.346c1.909-1.331 2.747-1.055 2.747-1.055.546 1.411.203 2.453.1 2.713.64.72 1.028 1.639 1.028 2.763 0 3.953-2.338 4.825-4.566 5.079.359.317.679.943.679 1.902 0 1.373-.012 2.48-.012 2.817 0 .26.18.578.688.48A10.27 10.27 0 0 0 22 12.253C22 6.586 17.523 2 12 2Z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Contact({ site }: { site: SiteContent }) {
  const links = [
    {
      label: "Email",
      href: `mailto:${site.email}`,
      detail: site.email,
      icon: "mail" as const,
    },
    {
      label: "GitHub",
      href: site.github,
      detail: "GitHub",
      icon: "github" as const,
      external: true,
    },
    {
      label: "LinkedIn",
      href: site.linkedin,
      detail: "LinkedIn",
      icon: "linkedin" as const,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section border-t border-border" aria-labelledby="contact-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="contact-heading" className="display display-lg max-w-[16ch] text-foreground">
            {site.contactHeading}
          </h2>
          <p className="lede mt-5">{site.contactNote}</p>
        </Reveal>

        <ul className="mt-14 grid gap-3 sm:grid-cols-3 lg:mt-20">
          {links.map((link, i) => (
            <li key={link.label}>
              <Reveal delay={i * 0.05}>
                <a
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-transparent px-5 py-5 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] hover:border-white/20 hover:bg-white/[0.03] active:scale-[0.99]"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="flex items-center gap-3.5">
                    <span className="flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 group-hover:text-foreground">
                      <LinkIcon name={link.icon} />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-foreground">
                        {link.label}
                      </span>
                      <span className="block text-sm text-muted">{link.detail}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    className="text-muted transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
