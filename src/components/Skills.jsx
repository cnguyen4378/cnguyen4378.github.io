const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Vite', 'Next.js'],
  },
  {
    title: 'Backend & Tools',
    items: ['Node.js', 'REST APIs', 'Git', 'Docker', 'Linux'],
  },
  {
    title: 'CS Fundamentals',
    items: ['Data Structures', 'Algorithms', 'OS', 'Databases', 'Networking'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-slate-800/80 bg-slate-900/30 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-mono text-sm font-medium text-cyan-400">Skills</h2>
        <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          What I work with
        </h3>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
              <h4 className="font-mono text-sm font-medium text-amber-400/90">
                {group.title}
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-slate-800/80 px-3 py-1.5 text-sm text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
