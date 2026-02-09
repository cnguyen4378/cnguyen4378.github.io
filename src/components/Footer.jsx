export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-sm text-slate-500">
          © {year} · Built with React & Tailwind
        </p>
        <a
          href="#"
          className="font-mono text-sm text-slate-500 transition hover:text-cyan-400"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}
