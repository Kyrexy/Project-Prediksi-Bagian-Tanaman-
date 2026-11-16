"use client";

import type { ChangeEvent } from "react";

type Props = {
  file: File | null;
  preview: string | null;
  loading: boolean;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPredict: () => void;
};

export function ImageUploader({ file, preview, loading, error, onChange, onPredict }: Props) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">1. Pilih gambar</h2>
      <label htmlFor="file-input" className="flex min-h-60 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-5 text-center hover:border-emerald-600">
        {preview ? (
          // Blob URL lokal dari file upload.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Pratinjau gambar" className="max-h-64 max-w-full rounded-lg object-contain" />
        ) : (
          <><span className="text-5xl">🖼️</span><span className="mt-3 font-semibold">Klik untuk memilih gambar</span><span className="mt-2 text-sm text-slate-500">JPG/PNG • Maksimal 5 MB</span></>
        )}
      </label>
      <input id="file-input" type="file" accept="image/jpeg,image/png" onChange={onChange} className="sr-only" />
      <p className="mt-3 truncate text-sm text-slate-500">{file?.name ?? "Belum ada file dipilih"}</p>
      <button onClick={onPredict} disabled={!file || loading} className="mt-5 w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300">
        {loading ? "Sedang memproses..." : "Klasifikasikan Gambar"}
      </button>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    </section>
  );
}
