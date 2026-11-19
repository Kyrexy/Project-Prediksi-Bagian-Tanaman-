# Plant Classifier — Struktur Proyek UAS

Aplikasi klasifikasi bagian tanaman (**akar, batang, buah, bunga, daun**) dengan CNN, FastAPI dan Next.js.

## Bagian proyek

- `notebooks/training_cnn_5kelas.ipynb`: training dan evaluasi CNN 5 kelas di Google Colab.
- `backend/app/api/routes/`: endpoint `/health` dan `/predict`.
- `backend/app/services/`: pemuatan model dan prediksi CNN.
- `backend/app/utils/`: preprocessing gambar untuk inference.
- `backend/app/schemas/`: struktur respons API.
- `backend/models/`: file keluaran Google Colab (`model_tanaman.keras` dan `class_names.json`).
- `frontend/src/app/`: halaman dan layout Next.js.
- `frontend/src/components/`: komponen UI yang dapat dipakai ulang.
- `frontend/src/lib/`: pemanggilan FastAPI dari Next.js.
- `frontend/src/types/`: tipe data TypeScript.
- `dataset/`: panduan dataset (di Drive / lokal).
- `docs/`: dokumentasi arsitektur.
- `results/`: grafik dan metrik evaluasi model.

## 1. Training di Colab

1. Di Google Drive, siapkan `dataset_tanaman_final/{train,val,test}/{akar,batang,buah,bunga,daun}` (10.500 gambar per kelas: train 7.350, val 1.575, test 1.575; total 52.500 gambar) atau kompres sebagai `MyDrive/dataset_tanaman_final_5kelas.zip`.
2. Pisahkan data untuk training, validation, dan testing **sebelum** training; jaga agar sumber foto tidak bocor antar split.
3. Buka `notebooks/training_cnn_5kelas.ipynb` pada Google Colab, aktifkan GPU jika tersedia.
4. Jalankan semua sel; download `model_tanaman_export_5kelas.zip` yang dihasilkan notebook.
5. Salin `model_tanaman.keras` dan `class_names.json` dari ZIP hasil training ke `backend/models/`.

## 2. Menjalankan FastAPI (Windows PowerShell)

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

- API docs: http://127.0.0.1:8000/docs
- Cek status: http://127.0.0.1:8000/health
- Jika model belum disalin, `/health` menampilkan `model_missing`, sedangkan `/predict` akan mengembalikan status 503.

## 3. Menjalankan Next.js (terminal baru)

```powershell
cd frontend
Copy-Item .env.local.example .env.local
npm install
npm run dev
```

Buka http://localhost:3000, pilih file JPG/PNG/WEBP (maksimum 5 MB), lalu klik **Klasifikasikan Gambar**.

## 4. Kontrak API

- `GET /health` → `{"status": "ready", "classes": ["akar", "batang", "buah", "bunga", "daun"]}` jika file model valid & siap, `{"status": "model_missing"}` jika belum ada, atau `{"status": "model_error", "detail": "..."}` jika gagal dimuat.
- `POST /predict` → `multipart/form-data`, form field `file` berupa JPG/PNG/WEBP.

Contoh bentuk respons (angka hanya ilustrasi, **bukan hasil model**):

```json
{
  "label": "daun",
  "confidence": 0.90,
  "scores": [
    {"label": "daun", "confidence": 0.90},
    {"label": "bunga", "confidence": 0.04},
    {"label": "buah", "confidence": 0.03},
    {"label": "batang", "confidence": 0.02},
    {"label": "akar", "confidence": 0.01}
  ]
}
```

## Catatan penting

- Notebook menyimpan urutan kelas di `class_names.json`. **Jangan menuliskannya ulang secara manual.**
- Preprocessing model menormalisasi piksel secara internal di dalam file `.keras` (misalnya `Rescaling(1/255)` atau `Rescaling(1/127.5, offset=-1)` untuk `MobileNetV2`). Backend hanya melakukan resize `224×224` dan konversi RGB `0–255`.
- TensorFlow/Keras di backend sebaiknya kompatibel dengan versi yang digunakan di Colab (Keras >= 3.13.2).
- `.env.local` hanya menyimpan URL backend dan bukan tempat token rahasia dengan prefiks `NEXT_PUBLIC_`.
