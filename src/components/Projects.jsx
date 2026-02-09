const projects = [
  {
    title: 'Roamer',
    description: 'Built a campus-first ride-sharing platform for student organizations that manages event-based driver pools, rider queues, and role-based access (rider/driver/admin) to streamline safe, invite-only transportation at JMU.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    link: '#',
    repo: '#',
  },
  {
    title: '2D Game Engine',
    description: 'Designed and implemented a lightweight 2D game engine featuring a modular entity-component system, real-time input and collision handling, and a render/update loop to support rapid prototyping of interactive games.',
    tech: ['Python'],
    link: '#',
    repo: '#',
  },
  // {
  //   title: 'Project Three',
  //   description: 'Mobile-first dashboard for data visualization. Responsive design with charts and real-time updates.',
  //   tech: ['React', 'TypeScript', 'D3.js', 'Vite'],
  //   link: '#',
  //   repo: '#',
  // },
]

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-slate-800/80 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-mono text-sm font-medium text-cyan-400">Projects</h2>
        <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Things I've built
        </h3>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-500/30 hover:bg-slate-900/80"
            >
              <h4 className="text-xl font-semibold text-white group-hover:text-cyan-400">
                {project.title}
              </h4>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <a
                  href={project.link}
                  className="text-sm font-medium text-cyan-400 hover:underline"
                >
                  {/* Live demo */}
                </a>
                <a
                  href={project.repo}
                  className="text-sm font-medium text-slate-500 hover:text-slate-300"
                >
                  {/* Source */}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
