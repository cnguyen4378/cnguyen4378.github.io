import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const projects = [
  {
    index: '01',
    title: 'Stori',
    description:
      'AI-powered platform helping first-generation students access real-world guidance from graduates. Transcribes audio/video stories, auto-generates summaries and tags, and surfaces relevant advice through semantic vector search.',
    tech: ['Next.js', 'TypeScript', 'ChromaDB', 'Gemini 2.5', 'SQLite'],
    accent: 'from-violet-500/20 to-cyan-500/10',
  },
  {
    index: '02',
    title: 'Roamer',
    description:
      'Campus-first ride-sharing platform for student organizations. Manages event-based driver pools, rider queues, and role-based access (rider / driver / admin) to streamline safe, invite-only transportation at JMU.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    accent: 'from-cyan-500/20 to-emerald-500/10',
  },
  {
    index: '03',
    title: '2D Game Engine',
    description:
      'Lightweight 2D game engine featuring a modular entity-component system, real-time input and collision handling, and a render/update loop for rapid prototyping of interactive games.',
    tech: ['Python'],
    accent: 'from-amber-500/20 to-orange-500/10',
  },
]

export default function Projects() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.floor(v * projects.length), projects.length - 1))
  })

  const active = projects[activeIndex]

  return (
    <section id="projects" className="scroll-mt-20">
      {/* Section header — outside the sticky zone */}
      <div className="px-8 pt-40 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase"
          >
            Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="mt-6 text-4xl font-bold text-white md:text-5xl"
          >
            Things I've built
          </motion.h2>
        </div>
      </div>

      {/* Sticky scroll container */}
      <div
        ref={containerRef}
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center px-8">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

            {/* Left — project info */}
            <div className="flex flex-col justify-center">
              {/* Progress dots */}
              <div className="mb-10 flex gap-2">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? '2rem' : '0.5rem',
                      backgroundColor: i === activeIndex ? 'rgb(34 211 238)' : 'rgb(71 85 105)',
                    }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                    {active.index} / {String(projects.length).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                    {active.title}
                  </h3>
                  <p className="mt-5 text-slate-400 leading-relaxed">
                    {active.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-800/70 px-3 py-1 font-mono text-xs text-slate-400 ring-1 ring-slate-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — decorative project card */}
            <div className="hidden items-center md:flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease }}
                  className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br ${active.accent} p-px`}
                >
                  <div className="rounded-2xl bg-slate-900/90 p-10 backdrop-blur-sm">
                    <p className="font-mono text-[6rem] font-bold leading-none text-white/5 select-none">
                      {active.index}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-white">
                      {active.title}
                    </p>
                    <div className="mt-6 space-y-2">
                      {active.tech.map((t) => (
                        <div key={t} className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-slate-800" />
                          <span className="font-mono text-xs text-slate-500">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
