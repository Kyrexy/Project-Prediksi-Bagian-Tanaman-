import { Header } from "@/components/layout/Header";
import { Classifier } from "@/components/classifier/Classifier";

export default function Home() {
  return (
    <main className="min-h-screen bg-emerald-50 text-slate-900">
      <Header />
      <section className="mx-auto max-w-5xl px-5 py-12">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">Computer Vision</p>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Klasifikasi Bagian Tanaman</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Unggah satu gambar yang berfokus pada akar, batang, buah, bunga, atau daun.
          Model CNN akan memprediksi bagian tanaman tersebut.
        </p>
        <Classifier />
      </section>
    </main>
  );
}
