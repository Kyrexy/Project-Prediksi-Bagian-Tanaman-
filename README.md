# Plant Classifier — Struktur Proyek UAS

Aplikasi klasifikasi bagian tanaman (**akar, batang, buah, daun**) dengan CNN, FastAPI dan Next.js. Versi ini menyusun ulang starter sebelumnya agar kode lebih modular.

> **Status:** Ini starter code. Dataset dan file model hasil training **tidak disertakan**. Belum diuji end-to-end menggunakan model nyata.

## Bagian proyek

- `notebooks/`: training dan evaluasi CNN di Google Colab.
- `backend/app/api/routes/`: endpoint `/health` dan `/predict`.
- `backend/app/services/`: pemuatan model dan prediksi CNN.
- `backend/app/utils/`: preprocessing gambar untuk inference.
- `backend/app/schemas/`: struktur respons API.
- `backend/models/`: file keluaran Google Colab.
- `frontend/src/app/`: halaman dan layout Next.js.
- `frontend/src/components/`: komponen UI yang dapat dipakai ulang.
- `frontend/src/lib/`: pemanggilan FastAPI dari Next.js.
- `frontend/src/types/`: tipe data TypeScript.
- `dataset/`: panduan dataset (di Drive, bukan data terlampir).
- `docs/`: dokumentasi arsitektur.
- `results/`: grafik dan metrik untuk paper.

## 1. Training di Colab

1. Di Google Drive, buat `MyDrive/dataset_tanaman/{train,val,test}/{akar,batang,buah,daun}`.
2. Pisahkan data untuk training, validation, dan testing **sebelum** training; jaga agar sumber foto tidak bocor antar split.
3. Buka `notebooks/training_cnn.ipynb` pada Google Colab, aktifkan GPU jika tersedia.
4. Jalankan semua sel; download `model_tanaman_export.zip` yang dihasilkan notebook.
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

Buka http://localhost:3000, pilih file JPG/PNG (maksimum 5 MB), lalu klik **Klasifikasikan Gambar**.

## 4. Kontrak API

- `GET /health` → `{"status": "ready"}` jika file model terdeteksi, atau `{"status": "model_missing"}`.
- `POST /predict` → `multipart/form-data`, form field `file` berupa JPG/PNG.

Contoh bentuk respons (angka hanya ilustrasi, **bukan hasil model**):

```json
{
  "label": "daun",
  "confidence": 0.93,
  "scores": [
    {"label": "daun", "confidence": 0.93},
    {"label": "buah", "confidence": 0.04},
    {"label": "batang", "confidence": 0.02},
    {"label": "akar", "confidence": 0.01}
  ]
}
```

## Catatan penting

- Notebook menyimpan urutan kelas di `class_names.json`. **Jangan menuliskannya ulang secara manual.**
- Preprocessing model menormalisasi menggunakan `layers.Rescaling(1/255)`. Backend hanya melakukan resize dan konversi RGB.
- TensorFlow/Keras di backend sebaiknya kompatibel dengan versi yang digunakan di Colab.
- `.env.local` hanya menyimpan URL backend dan bukan tempat token rahasia dengan prefiks `NEXT_PUBLIC_`.
