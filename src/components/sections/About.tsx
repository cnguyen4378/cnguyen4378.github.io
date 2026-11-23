import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/lib/cms/types";

export function About({ site }: { site: SiteContent }) {
  const accentPhotos = site.lifePhotos.slice(0, 5);

  return (
    <section id="about" className="section border-t border-border" aria-labelledby="about-heading">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 id="about-heading" className="display display-lg text-foreground">
              About
            </h2>
            <p className="mt-5 text-lg font-medium tracking-[-0.02em] text-foreground/90 md:text-xl">
              Builder first. Student always.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="text-[1.125rem] leading-relaxed text-foreground/90 md:text-[1.2rem]">
              {site.about}
            </p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{site.aboutMore}</p>
          </Reveal>
        </div>

        {accentPhotos.length > 0 ? (
          <Reveal className="mt-16 md:mt-24" delay={0.1}>
            <h3 className="mb-6 text-base font-medium tracking-[-0.02em] text-muted">
              Outside the editor
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {accentPhotos.map((photo, i) => (
                <figure
                  key={photo.src}
                  className={
                    i === 0
                      ? "relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl md:col-span-2 md:aspect-[4/3]"
                      : "relative aspect-[4/5] overflow-hidden rounded-2xl"
                  }
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    priority={i === 0}
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]"
                  />
                </figure>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
