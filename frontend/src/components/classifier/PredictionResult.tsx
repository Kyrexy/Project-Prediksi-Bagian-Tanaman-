import type { Prediction } from "@/types/prediction";

const formatName = (label: string) => label.charAt(0).toUpperCase() + label.slice(1);

export function PredictionResult({ result }: { result: Prediction | null }) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">2. Hasil klasifikasi</h2>
      {!result ? (
        <div className="flex min-h-60 flex-col items-center justify-center text-center text-slate-500">
          <span className="text-5xl">🔎</span>
          <p className="mt-4">Hasil akan muncul setelah gambar diproses.</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-slate-500">Prediksi tertinggi</p>
          <p className="mt-1 text-3xl font-bold text-emerald-800">{formatName(result.label)}</p>
          <p className="mt-2 text-sm text-slate-600">Skor model: {(result.confidence * 100).toFixed(1)}%</p>
          <div className="mt-8 space-y-4">
            {result.scores.map((score) => (
              <div key={score.label}>
                <div className="mb-1 flex justify-between text-sm"><span>{formatName(score.label)}</span><span>{(score.confidence * 100).toFixed(1)}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-emerald-100"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${score.confidence * 100}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">Skor prediksi bukan jaminan akurasi; evaluasi dilakukan pada data uji terpisah.</p>
        </div>
      )}
    </section>
  );
}
