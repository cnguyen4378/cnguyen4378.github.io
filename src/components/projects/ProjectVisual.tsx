import type { ProjectVisual as ProjectVisualKind } from "@/data/projects";
import { cn } from "@/lib/cn";

function PhoneShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-[min(58%,220px)]", className)}>
      <div className="rounded-[2rem] bg-[#0c0d10] p-[0.4rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[1.65rem] bg-[#111318]">
          <div className="flex items-center justify-center bg-[#0c0d10] pb-1.5 pt-2.5">
            <div className="h-1.5 w-12 rounded-full bg-white/15" />
          </div>
          <div className="aspect-[9/16] bg-[#14171c] p-3.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ChartPhone() {
  return (
    <PhoneShell>
      <div className="mb-3 text-[10px] font-semibold text-foreground">UREC Live</div>
      <div className="mb-2 flex items-end justify-between gap-1.5 rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/8">
        {[40, 65, 48, 80, 55, 72, 90].map((h, i) => (
          <div
            key={i}
            className="w-full rounded-sm bg-accent/80"
            style={{ height: `${h * 0.45}px` }}
          />
        ))}
      </div>
      <div className="rounded-xl bg-black/40 p-2.5 ring-1 ring-white/8">
        <div className="text-[9px] text-muted">Crowd level</div>
        <div className="mt-0.5 text-sm font-semibold text-foreground">Busy</div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-accent" />
        </div>
      </div>
    </PhoneShell>
  );
}

function MapPhone() {
  return (
    <PhoneShell>
      <div className="mb-2 text-[10px] font-semibold text-foreground">Roamer</div>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#1a2230] ring-1 ring-white/8">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-[20%] left-0 h-px w-full bg-white/10" />
          <div className="absolute top-[45%] left-0 h-px w-full bg-white/10" />
          <div className="absolute top-[70%] left-0 h-px w-full bg-white/10" />
          <div className="absolute top-0 left-[30%] h-full w-px bg-white/10" />
          <div className="absolute top-0 left-[62%] h-full w-px bg-white/10" />
        </div>
        <div className="absolute top-[35%] left-[28%] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/25" />
        <div className="absolute top-[58%] left-[55%] h-2 w-2 rounded-full bg-foreground" />
        <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path
            d="M30 38 C 40 48, 48 52, 58 60"
            stroke="#8DA9D7"
            strokeWidth="2"
            strokeDasharray="3 3"
            opacity="0.8"
          />
        </svg>
      </div>
      <div className="mt-2 rounded-lg bg-white/[0.04] p-2.5 ring-1 ring-white/8">
        <div className="text-[9px] text-muted">Next pickup</div>
        <div className="text-[11px] font-semibold text-foreground">East Campus Hub</div>
      </div>
    </PhoneShell>
  );
}

function StoriesPhone() {
  const stories = [
    {
      tag: "Internships",
      title: "How I landed my first tech role",
      match: "94% match",
    },
    {
      tag: "Campus",
      title: "Navigating office hours alone",
      match: "88% match",
    },
    {
      tag: "Career",
      title: "What I wish I knew before recruiting",
      match: "81% match",
    },
  ];

  return (
    <PhoneShell>
      <div className="mb-2.5 text-[10px] font-semibold text-foreground">Stori</div>
      <div className="rounded-xl bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/8">
        <div className="text-[8px] text-muted">Semantic search</div>
        <div className="mt-0.5 truncate text-[10px] font-medium text-foreground/90">
          first internship with no connections…
        </div>
      </div>
      <div className="mt-2.5 space-y-2">
        {stories.map((story) => (
          <div
            key={story.title}
            className="rounded-xl bg-black/35 p-2 ring-1 ring-white/8"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[7px] font-medium text-accent">
                {story.tag}
              </span>
              <span className="text-[7px] text-muted">{story.match}</span>
            </div>
            <p className="mt-1.5 text-[9px] font-medium leading-snug text-foreground">
              {story.title}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-white/15" aria-hidden />
              <span className="h-1 w-10 rounded-full bg-white/10" aria-hidden />
            </div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

function TerminalPanel() {
  return (
    <div className="mx-auto w-[min(88%,320px)]">
      <div className="overflow-hidden rounded-2xl bg-[#0c0d10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] text-muted">agent — zsh</span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-[11px] leading-relaxed text-muted">
          <p>
            <span className="text-accent">$</span> orchestrate --agents 5
          </p>
          <p className="text-foreground/80">A2A handshake · MCP tools ready</p>
          <p>
            <span className="text-accent">$</span> eval run --trace
          </p>
          <p className="text-foreground/80">token −42% · observability +15%</p>
          <p className="text-accent/90">█</p>
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  if (kind === "phone-chart") return <ChartPhone />;
  if (kind === "phone-map") return <MapPhone />;
  if (kind === "phone-stories") return <StoriesPhone />;
  return <TerminalPanel />;
}
