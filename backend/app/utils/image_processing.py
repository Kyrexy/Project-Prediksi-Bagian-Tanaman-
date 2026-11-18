from io import BytesIO

import numpy as np
from fastapi import HTTPException
from PIL import Image, ImageOps, UnidentifiedImageError

# Hindari foto beresolusi ekstrem yang dapat menghabiskan memori.
Image.MAX_IMAGE_PIXELS = 15_000_000
ALLOWED_FORMATS = {"JPEG", "PNG", "MPO", "WEBP"}


def image_to_tensor(content: bytes, width: int, height: int) -> np.ndarray:
    try:
        with Image.open(BytesIO(content)) as img:
            if img.format not in ALLOWED_FORMATS:
                raise ValueError("Format gambar tidak didukung")
            if img.width * img.height > Image.MAX_IMAGE_PIXELS:
                raise ValueError("Resolusi gambar melebihi batas maksimum")
            rgb = ImageOps.exif_transpose(img).convert("RGB")
            resized = rgb.resize((width, height), Image.Resampling.BILINEAR)
            return np.asarray(resized, dtype=np.float32)[None, ...]
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise HTTPException(status_code=400, detail="Gambar tidak dapat diproses") from exc

    # Jangan normalisasi di sini: model Keras sudah menyertakan layer Rescaling internal.
