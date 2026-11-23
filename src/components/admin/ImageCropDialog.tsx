"use client";

import { useCallback, useState, useTransition } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageBlob } from "@/lib/cms/crop-image";
import {
  createMediaUploadUrlAction,
  finalizeMediaUploadAction,
} from "@/app/admin/media/actions";
import { createClient } from "@/lib/supabase/client";

const ASPECTS = [
  { id: "free", label: "Free", value: undefined },
  { id: "1", label: "1:1", value: 1 },
  { id: "4-5", label: "4:5", value: 4 / 5 },
  { id: "3-4", label: "3:4", value: 3 / 4 },
  { id: "16-9", label: "16:9", value: 16 / 9 },
] as const;

type ImageCropDialogProps = {
  src: string;
  filename: string;
  onClose: () => void;
  onSaved: () => void;
};

export function ImageCropDialog({ src, filename, onClose, onSaved }: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectId, setAspectId] = useState<(typeof ASPECTS)[number]["id"]>("3-4");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const aspect = ASPECTS.find((item) => item.id === aspectId)?.value;

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  function save() {
    if (!croppedAreaPixels) return;
    setError(null);

    startTransition(async () => {
      try {
        const blob = await getCroppedImageBlob(src, croppedAreaPixels, "image/jpeg");
        const base = filename.replace(/\.[^.]+$/, "") || "crop";
        const croppedName = `${base}-cropped.jpg`;

        const signed = await createMediaUploadUrlAction({
          filename: croppedName,
          contentType: "image/jpeg",
        });

        if ("error" in signed && signed.error) {
          setError(signed.error);
          return;
        }
        if (!("ok" in signed) || !signed.ok) {
          setError("Could not start upload.");
          return;
        }

        const supabase = createClient();
        const file = new File([blob], croppedName, { type: "image/jpeg" });
        const { error: uploadError } = await supabase.storage
          .from("media")
          .uploadToSignedUrl(signed.path, signed.token, file, {
            contentType: "image/jpeg",
          });

        if (uploadError) {
          setError(uploadError.message);
          return;
        }

        await finalizeMediaUploadAction(signed.path);
        onSaved();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Crop failed.");
      }
    });
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Crop image"
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-medium text-foreground">Crop & zoom</p>
            <p className="text-xs text-muted">Drag to pan · slider to zoom · saves a new file</p>
          </div>
          <button type="button" className="btn" onClick={onClose} disabled={pending}>
            Close
          </button>
        </div>

        <div className="relative h-[min(55vh,420px)] bg-black">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>

        <div className="space-y-4 border-t border-border px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {ASPECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  aspectId === item.id
                    ? "border-accent/50 text-foreground"
                    : "border-border text-muted"
                }`}
                onClick={() => setAspectId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="block">
            <span className="mb-1.5 flex justify-between text-xs text-muted">
              <span>Zoom</span>
              <span>{zoom.toFixed(2)}×</span>
            </span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose} disabled={pending}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-accent"
              onClick={save}
              disabled={pending || !croppedAreaPixels}
            >
              {pending ? "Saving…" : "Save cropped image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
