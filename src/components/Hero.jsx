import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const line = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          {...line(0)}
          className="font-mono text-sm tracking-[0.3em] text-cyan-400 uppercase"
        >
          Software Engineer
        </motion.p>

        <motion.h1
          {...line(0.15)}
          className="mt-6 text-7xl font-bold tracking-tighter text-white sm:text-8xl md:text-9xl"
        >
          Carter Nguyen
        </motion.h1>

        <motion.p
          {...line(0.3)}
          className="mx-auto mt-8 max-w-xl text-lg text-slate-400 leading-relaxed"
        >
          CS student at JMU building practical, people-focused software.
          Passionate about clean architecture and real-world impact.
        </motion.p>

        <motion.div
          {...line(0.45)}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full px-8 py-3 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 transition hover:bg-slate-800 hover:text-white"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full ring-1 ring-slate-600 pt-2"
        >
          <div className="h-1.5 w-1 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
