import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-[100svh] flex-col justify-center py-24">
      <h1 className="display display-lg text-foreground">Page not found.</h1>
      <p className="lede mt-5">That route doesn’t exist — the rest of the portfolio is ready when you are.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-accent">
          Back home
        </Link>
        <Link href="/projects" className="btn">
          Browse projects
        </Link>
      </div>
    </main>
  );
}
