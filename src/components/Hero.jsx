import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import AsciiRipple from './AsciiRipple'

const ease = [0.16, 1, 0.3, 1]

const line = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export default function Hero() {
  const sectionRef = useRef(null)
  const asciiRef = useRef(null)
  const [imgError, setImgError] = useState(false)

  // Scroll-out effect
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Cursor spotlight (smooth lag)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(450px circle at ${x}px ${y}px, rgba(34,211,238,0.06), transparent 70%)`
  )

  // Photo 3D tilt
  const rotateYBase = useMotionValue(0)
  const rotateXBase = useMotionValue(0)
  const rotateY = useSpring(rotateYBase, { stiffness: 120, damping: 20 })
  const rotateX = useSpring(rotateXBase, { stiffness: 120, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // Spotlight
    mouseX.set(x)
    mouseY.set(y)
    // Photo tilt
    const cx = rect.width / 2
    const cy = rect.height / 2
    rotateYBase.set(((x - cx) / cx) * 10)
    rotateXBase.set(-((y - cy) / cy) * 10)
    // ASCII cursor glow
    asciiRef.current?.moveCursor(x, y)
  }

  const handleMouseLeave = () => {
    rotateYBase.set(0)
    rotateXBase.set(0)
    asciiRef.current?.clearCursor()
  }

  const handleClick = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    asciiRef.current?.addRipple(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* ASCII ripple background */}
      <AsciiRipple ref={asciiRef} className="absolute inset-0 z-0" />

      {/* Static ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: spotlightBg }}
      />

      {/* Content */}
      <motion.div
        style={{ y: scrollY, opacity: scrollOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 pt-24 select-none md:grid-cols-5 md:gap-8 md:pt-0"
      >
        {/* Text */}
        <div className="text-center md:col-span-3 md:text-left">
          <motion.p
            {...line(0)}
            className="font-mono text-sm tracking-[0.3em] text-cyan-400 uppercase"
          >
            Software Engineer
          </motion.p>

          <motion.h1
            {...line(0.15)}
            className="mt-6 text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl"
          >
            Carter
            <br />
            Nguyen
          </motion.h1>

          <motion.p
            {...line(0.3)}
            className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-slate-400 md:mx-0"
          >
            CS student at JMU building practical, people-focused software.
            Passionate about clean architecture and real-world impact.
          </motion.p>

          <motion.div
            {...line(0.45)}
            className="mt-12 flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <a
              href="#projects"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full px-8 py-3 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 transition hover:bg-slate-800 hover:text-white"
            >
              Get in Touch
            </a>
          </motion.div>

        </div>

        {/* Profile photo with 3D tilt */}
        <motion.div
          {...line(0.2)}
          className="flex justify-center md:col-span-2 md:justify-end"
        >
          <div style={{ perspective: '1000px' }}>
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow ring behind photo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyan-500/25 via-transparent to-transparent blur-2xl" />

              {imgError ? (
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-slate-800 ring-1 ring-cyan-500/20 sm:h-72 sm:w-72 md:h-80 md:w-80">
                  <span className="text-5xl font-semibold text-slate-500">CN</span>
                </div>
              ) : (
                <img
                  src="/profile.jpg"
                  alt="Carter Nguyen"
                  className="relative h-64 w-64 rounded-full object-cover ring-1 ring-white/10 sm:h-72 sm:w-72 md:h-80 md:w-80"
                  onError={() => setImgError(true)}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
