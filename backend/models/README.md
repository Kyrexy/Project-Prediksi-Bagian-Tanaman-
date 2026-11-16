# Model hasil training

Letakkan dua file hasil ekspor Google Colab di folder ini:

- `model_tanaman.keras`
- `class_names.json`

Kedua file **belum ada** dalam starter project. `class_names.json` harus berasal dari `train_ds.class_names` saat training, bukan diisi manual.

**Penting:** preprocessing di backend sengaja tidak membagi piksel dengan 255 karena notebook menyertakan `Rescaling(1/255)` di dalam model.
