# Arsitektur proyek

1. Notebook `notebooks/training_cnn.ipynb` membaca dataset dari `MyDrive/dataset_tanaman`.
2. Notebook melakukan training, evaluasi, dan menghasilkan `model_tanaman.keras` serta `class_names.json`.
3. Kedua file disalin ke `backend/models/`.
4. Next.js menerima unggahan pengguna dan mengirimkannya dengan `multipart/form-data` ke `POST /predict`.
5. FastAPI memvalidasi file, mengubah citra menjadi RGB, resize ke input model, dan menjalankan prediksi.
6. FastAPI mengembalikan JSON dengan `label`, `confidence`, dan `scores`.
7. Frontend menampilkan kelas dengan skor tertinggi dan semua skor kelas.

**Catatan:** Model CNN mengandung `Rescaling(1/255)` sehingga backend mengirim piksel float 0–255. `class_names.json` menyimpan urutan label sesuai training. Data train, val, test tidak boleh berbagi foto dari objek yang sama untuk mencegah kebocoran data.
