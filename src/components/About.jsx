import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]
const vp = { once: true, margin: '-80px' }

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-8 py-40">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-sm tracking-[0.2em] text-cyan-400 uppercase"
        >
          About Me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl"
        >
          Building things
          <br />
          that actually matter.
        </motion.h2>

        <div className="mt-10 space-y-5 text-slate-400 leading-relaxed">
          {[
            "I'm a Computer Science student at James Madison University who enjoys building practical, people-focused software — most recently an AI-powered student guidance platform and a campus ride-sharing app. As a first-generation American, I'm driven by consistency, real-world impact, and growing as a full-stack developer.",
            "Outside of code, I spend time with friends, working on personal projects, and staying active through the gym and the outdoors.",
            "I'm always open to collaboration and new opportunities. If you have a project in mind or just want to connect, feel free to reach out.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.08 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-cyan-400"
          >
            Let's talk
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
