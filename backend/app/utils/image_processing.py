from io import BytesIO

import numpy as np
from fastapi import HTTPException
from PIL import Image, ImageOps, UnidentifiedImageError

# Hindari foto beresolusi ekstrem yang dapat menghabiskan memori.
Image.MAX_IMAGE_PIXELS = 15_000_000


def image_to_tensor(content: bytes, width: int, height: int) -> np.ndarray:
    try:
        with Image.open(BytesIO(content)) as img:
            rgb = ImageOps.exif_transpose(img).convert("RGB")
            resized = rgb.resize((width, height), Image.Resampling.BILINEAR)
            return np.asarray(resized, dtype=np.float32)[None, ...]
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError, Image.DecompressionBombWarning) as exc:
        raise HTTPException(status_code=400, detail="Gambar tidak dapat diproses") from exc

    # Jangan normalisasi di sini: model CNN sudah berisi layers.Rescaling(1/255).
