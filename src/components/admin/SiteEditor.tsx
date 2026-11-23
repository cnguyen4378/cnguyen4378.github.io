"use client";

import { useMemo, useState, useTransition } from "react";
import {
  publishSiteAction,
  saveSiteDraftAction,
} from "@/app/admin/site/actions";
import type { SiteContent } from "@/lib/cms/types";

type Field =
  | "headline"
  | "roleLine"
  | "about"
  | "aboutMore"
  | "headshot"
  | "contactHeading"
  | "contactNote"
  | "email"
  | "github"
  | "linkedin"
  | "name"
  | "title"
  | "description"
  | "footerNote";

type SiteEditorProps = {
  initial: SiteContent;
  source: "draft" | "published" | "static";
  mode: "about" | "homepage";
};

export function SiteEditor({ initial, source, mode }: SiteEditorProps) {
  const [values, setValues] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const fields = useMemo(() => {
    if (mode === "about") {
      return [
        { key: "about" as const, label: "About", multiline: true },
        { key: "aboutMore" as const, label: "About more", multiline: true },
      ];
    }
    return [
      { key: "headline" as const, label: "Hero headline", multiline: false },
      { key: "roleLine" as const, label: "Role line", multiline: false },
      { key: "contactHeading" as const, label: "Contact heading", multiline: false },
      { key: "contactNote" as const, label: "Contact note", multiline: true },
      { key: "email" as const, label: "Email", multiline: false },
      { key: "github" as const, label: "GitHub URL", multiline: false },
      { key: "linkedin" as const, label: "LinkedIn URL", multiline: false },
    ];
  }, [mode]);

  function payload() {
    return {
      name: values.name,
      shortName: values.shortName,
      title: values.title,
      description: values.description,
      url: values.url,
      email: values.email,
      github: values.github,
      linkedin: values.linkedin,
      headshot: values.headshot,
      headline: values.headline,
      roleLine: values.roleLine,
      about: values.about,
      aboutMore: values.aboutMore,
      contactHeading: values.contactHeading,
      contactNote: values.contactNote,
      footerNote: values.footerNote,
    };
  }

  function setField(key: Field, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Editing source: <span className="text-foreground">{source}</span>
        {source === "static"
          ? " — seed the database from Overview first for persistent edits."
          : null}
      </p>

      <div className="space-y-4">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-1.5 block text-sm text-muted">{field.label}</span>
            {field.multiline ? (
              <textarea
                value={values[field.key]}
                onChange={(e) => setField(field.key, e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-[border-color] duration-150 focus:border-accent/50"
              />
            ) : (
              <input
                value={values[field.key]}
                onChange={(e) => setField(field.key, e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-[border-color] duration-150 focus:border-accent/50"
              />
            )}
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="btn"
          disabled={pending}
          onClick={() => {
            setMessage(null);
            startTransition(async () => {
              const result = await saveSiteDraftAction(payload());
              setMessage(
                "error" in result && result.error
                  ? result.error
                  : "Draft saved. Use Preview drafts to review.",
              );
            });
          }}
        >
          {pending ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          className="btn btn-accent"
          disabled={pending}
          onClick={() => {
            setMessage(null);
            startTransition(async () => {
              const result = await publishSiteAction(payload());
              setMessage(
                "error" in result && result.error
                  ? result.error
                  : "Published to the live site.",
              );
            });
          }}
        >
          Publish
        </button>
      </div>

      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}
