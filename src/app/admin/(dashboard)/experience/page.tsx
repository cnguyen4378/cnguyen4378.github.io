import { getPublishedContent } from "@/lib/cms/content";

export default async function AdminExperiencePage() {
  const { experience, source } = await getPublishedContent();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Experience</h1>
        <p className="mt-2 text-sm text-muted">Source: {source}</p>
      </div>
      <ul className="divide-y divide-border border-y border-border">
        {experience.map((item) => (
          <li key={item.id} className="py-5">
            <p className="text-sm text-muted">{item.period}</p>
            <h2 className="mt-1 text-xl font-medium tracking-[-0.02em]">{item.org}</h2>
            <p className="mt-1 text-sm text-muted">{item.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
