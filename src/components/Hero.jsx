import { useState } from 'react'

export default function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-12">
        <div className="flex-shrink-0">
          {imgError ? (
            <div
              className="flex h-48 w-48 items-center justify-center rounded-full bg-slate-800 ring-4 ring-cyan-500/30 ring-offset-4 ring-offset-slate-950 sm:h-56 sm:w-56 md:h-64 md:w-64"
              aria-hidden
            >
              <span className="text-4xl font-semibold text-slate-500 sm:text-5xl md:text-6xl">CN</span>
            </div>
          ) : (
            <img
              src="/profile.jpg"
              alt="Carter Nguyen"
              className="h-48 w-48 rounded-full object-cover ring-4 ring-cyan-500/30 ring-offset-4 ring-offset-slate-950 sm:h-56 sm:w-56 md:h-64 md:w-64"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="max-w-3xl text-center md:text-left">
          <p className="font-mono text-sm text-cyan-400">Hi, I'm</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Carter Nguyen
          </h1>
        <p className="mt-4 text-xl text-slate-400 sm:text-2xl">
          Computer Science · Software Engineer
        </p>
        <p className="mx-auto mt-6 max-w-xl text-slate-500">
          Computer Student passionate about software engineering, testing, and problem solving.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            href="#projects"
            className="rounded-lg bg-cyan-500/20 px-6 py-3 font-medium text-cyan-400 ring-1 ring-cyan-500/30 transition hover:bg-cyan-500/30"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg px-6 py-3 font-medium text-slate-400 ring-1 ring-slate-600 transition hover:bg-slate-800 hover:text-white"
          >
            Get in Touch
          </a>
        </div>
        </div>
      </div>
    </section>
  )
}
