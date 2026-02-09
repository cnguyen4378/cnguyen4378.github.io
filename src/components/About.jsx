export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-slate-800/80 bg-slate-900/30 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-mono text-sm font-medium text-cyan-400">About Me</h2>
        <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Building things that matter
        </h3>
        <div className="mt-8 space-y-6 text-slate-400 leading-relaxed">
          <p>
            I'm a Computer Science student at James Madison University who enjoys building practical, people-focused
            software—most recently a campus ride-sharing platform and a lightweight 2D game engine. As a first-
            generation American, I’m driven by consistency, real-world impact, and growing as a full-stack developer.
          </p>
          <p>
            Outside of class and coding, I spend time with friends, working on personal
            projects, and staying active through the gym and the outdoors.
          </p>
          <p>
            I'm always open to collaboration and new opportunities. If you have a
            project in mind or just want to connect, feel free to reach out.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-4 py-2 font-medium text-emerald-400 ring-1 ring-emerald-500/30 transition hover:bg-emerald-500/25"
          >
            Let's talk
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
