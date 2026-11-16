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
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setResult(null);
    setError("");
    if (!next) { setFile(null); return; }
    if (!["image/jpeg", "image/png"].includes(next.type)) {
      setFile(null);
      setError("Pilih gambar JPG atau PNG.");
      return;
    }
    if (next.size > 5 * 1024 * 1024) {
      setFile(null);
      setError("Ukuran gambar maksimal 5 MB.");
      return;
    }
    setFile(next);
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
