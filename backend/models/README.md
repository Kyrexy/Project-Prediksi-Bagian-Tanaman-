# Model hasil training

Letakkan dua file hasil ekspor Google Colab di folder ini:

- `model_tanaman.keras`
- `class_names.json`

`class_names.json` harus berasal dari `train_ds.class_names` saat training (`["akar", "batang", "buah", "bunga", "daun"]`), bukan diisi manual.

**Penting:** preprocessing di backend sengaja tidak menormalisasi piksel karena notebook menyertakan layer `Rescaling` di dalam model Keras.
