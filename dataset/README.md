# Penyimpanan dataset

Dataset terdiri dari **5 kelas** (`akar`, `batang`, `buah`, `bunga`, `daun`), masing-masing **10.500 gambar** (total **52.500 gambar**):

```
dataset_tanaman_final/
├── train/{akar,batang,buah,bunga,daun}/   # 7.350 per kelas
├── val/{akar,batang,buah,bunga,daun}/     # 1.575 per kelas
└── test/{akar,batang,buah,bunga,daun}/    # 1.575 per kelas
```

Untuk training di Google Colab, unggah folder `dataset_tanaman_final` atau arsip `MyDrive/dataset_tanaman_final_5kelas.zip` ke Google Drive.

Folder `dataset/` ini hanya dokumentasi. Jangan masukkan data gambar besar ke Git.
