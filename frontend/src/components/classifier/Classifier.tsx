"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { ImageUploader } from "@/components/classifier/ImageUploader";
import { PredictionResult } from "@/components/classifier/PredictionResult";
import { predictPlant } from "@/lib/api";
import type { Prediction } from "@/types/prediction";

export function Classifier() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    event.target.value = "";
    setResult(null);
    setError("");
    if (!next) {
      setFile(null);
      setPreview(null);
      return;
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/pjpeg", "image/png", "image/webp"];
    const hasAllowedExt = /\.(jpe?g|png|webp)$/i.test(next.name);
    if (!allowedTypes.includes(next.type) && !(next.type === "" && hasAllowedExt)) {
      setFile(null);
      setPreview(null);
      setError("Pilih gambar JPG, PNG, atau WEBP.");
      return;
    }
    if (next.size > 5 * 1024 * 1024) {
      setFile(null);
      setPreview(null);
      setError("Ukuran gambar maksimal 5 MB.");
      return;
    }
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  async function classify() {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const prediction = await predictPlant(file);
      setResult(prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghubungi backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-9 grid gap-6 md:grid-cols-2">
      <ImageUploader file={file} preview={preview} loading={loading} error={error} onChange={chooseFile} onPredict={classify} />
      <PredictionResult result={result} />
    </div>
  );
}
