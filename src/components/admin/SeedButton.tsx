"use client";

import { useState, useTransition } from "react";
import { seedFromStaticAction } from "@/app/admin/seed/actions";

export function SeedButton() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="btn btn-accent"
        disabled={pending}
        onClick={() => {
          setMessage(null);
          startTransition(async () => {
            const result = await seedFromStaticAction();
            if ("error" in result && result.error) {
              setMessage(result.error);
              return;
            }
            setMessage("Seeded published + draft content.");
          });
        }}
      >
        {pending ? "Seeding…" : "Seed from current site data"}
      </button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}
