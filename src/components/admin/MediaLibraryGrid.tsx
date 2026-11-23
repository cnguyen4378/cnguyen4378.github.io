"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageCropDialog } from "@/components/admin/ImageCropDialog";
import type { MediaListItem } from "@/lib/cms/media";

export function MediaLibraryGrid({ items }: { items: MediaListItem[] }) {
  const router = useRouter();
  const [active, setActive] = useState<MediaListItem | null>(null);

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.path}
            className="overflow-hidden rounded-2xl border border-border bg-surface/20"
          >
            <div className="relative aspect-[4/3] bg-background">
              <Image
                src={item.publicUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
            <div className="space-y-2 px-3 py-3">
              <p className="truncate text-sm text-foreground">{item.name}</p>
              <p className="truncate text-xs text-muted">{item.path}</p>
              <button
                type="button"
                className="btn w-full"
                onClick={() => setActive(item)}
              >
                Crop & zoom
              </button>
            </div>
          </li>
        ))}
      </ul>

      {active ? (
        <ImageCropDialog
          src={active.publicUrl}
          filename={active.name}
          onClose={() => setActive(null)}
          onSaved={() => {
            setActive(null);
            router.refresh();
          }}
        />
      ) : null}
    </>
  );
}
