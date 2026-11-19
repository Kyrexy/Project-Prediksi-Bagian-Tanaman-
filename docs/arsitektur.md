# Arsitektur proyek

1. Notebook `notebooks/training_cnn_5kelas.ipynb` membaca dataset 5 kelas (`akar`, `batang`, `buah`, `bunga`, `daun`) dari `MyDrive/dataset_tanaman_final_5kelas.zip` atau `MyDrive/dataset_tanaman_final`.
2. Notebook melakukan training, evaluasi, dan menghasilkan `model_tanaman.keras` serta `class_names.json` beserta grafik dan metrik di `results/`.
3. Kedua file model disalin ke `backend/models/`.
4. Next.js menerima unggahan pengguna dan mengirimkannya dengan `multipart/form-data` ke `POST /predict`.
5. FastAPI memvalidasi file, mengubah citra menjadi RGB `224×224`, dan menjalankan prediksi.
6. FastAPI mengembalikan JSON dengan `label`, `confidence`, dan `scores` untuk 5 kelas.
7. Frontend menampilkan kelas dengan skor tertinggi dan semua skor kelas.

**Catatan:** Model Keras mengandung layer `Rescaling` internal (`0–1` atau `[-1, 1]` untuk MobileNetV2) sehingga backend mengirim piksel float 0–255. `class_names.json` menyimpan urutan label sesuai training (`["akar", "batang", "buah", "bunga", "daun"]`). Data train, val, test tidak boleh berbagi foto dari objek yang sama untuk mencegah kebocoran data.
