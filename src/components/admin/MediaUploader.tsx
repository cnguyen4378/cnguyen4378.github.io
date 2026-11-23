"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  createMediaUploadUrlAction,
  finalizeMediaUploadAction,
} from "@/app/admin/media/actions";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

const MAX_BYTES = 8 * 1024 * 1024;

export function MediaUploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.has(file.type)) {
      setMessage("Use JPG, PNG, WebP, AVIF, or GIF.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setMessage("File must be 8MB or smaller.");
      return;
    }

    setMessage(null);

    startTransition(async () => {
      const signed = await createMediaUploadUrlAction({
        filename: file.name || "upload.jpg",
        contentType: file.type,
      });

      if ("error" in signed && signed.error) {
        setMessage(signed.error);
        return;
      }

      if (!("token" in signed) || !signed.ok) {
        setMessage("Could not start upload.");
        return;
      }

      // Upload bytes straight to Supabase with the signed token (no Storage INSERT policy needed).
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from("media")
        .uploadToSignedUrl(signed.path, signed.token, file, {
          contentType: signed.contentType,
        });

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      await finalizeMediaUploadAction(signed.path);
      setMessage(`Uploaded ${file.name}`);
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      <div
        className={`rounded-2xl border border-dashed px-6 py-10 text-center transition-colors duration-150 ${
          dragging ? "border-accent/50 bg-accent/5" : "border-border"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-foreground">Drag an image here, or choose a file</p>
        <p className="mt-1 text-xs text-muted">JPG, PNG, WebP, AVIF, GIF · max 8MB</p>
        <button
          type="button"
          className="btn btn-accent mt-5"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
        >
          {pending ? "Uploading…" : "Choose file"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}
