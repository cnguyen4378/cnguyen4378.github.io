import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]
const vp = { once: true, margin: '-60px' }

const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'Shell'] },
  { title: 'Frontend', items: ['React', 'Vue', 'Tailwind CSS', 'Vite', 'Next.js'] },
  { title: 'Backend & Tools', items: ['Node.js', 'FastAPI', 'REST APIs', 'Git', 'Docker', 'Linux'] },
  { title: 'CS Fundamentals', items: ['Data Structures', 'Algorithms', 'OS', 'Databases', 'Networking'] },
]

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-8 py-40">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase"
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mt-6 text-4xl font-bold text-white md:text-5xl"
        >
          What I work with
        </motion.h2>

        <div className="mt-16 space-y-12">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease, delay: i * 0.07 }}
            >
              <p className="font-mono text-xs tracking-widest text-slate-500 uppercase mb-4">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-800/70 px-4 py-1.5 text-sm text-slate-300 ring-1 ring-slate-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
