import json
from functools import lru_cache

import numpy as np
from app.core.config import CLASS_NAMES_PATH, MODEL_PATH
from app.schemas.prediction import ClassScore, PredictionResponse
from app.utils.image_processing import image_to_tensor


def model_files_ready() -> bool:
    return MODEL_PATH.is_file() and CLASS_NAMES_PATH.is_file()


@lru_cache(maxsize=1)
def get_model_bundle():
    # Import TensorFlow hanya pada saat prediksi pertama.
    from tensorflow.keras.models import load_model

    if not model_files_ready():
        raise FileNotFoundError("Model belum tersedia. Jalankan notebook, lalu salin file hasil training ke backend/models/.")

    model = load_model(MODEL_PATH, compile=False)
    with CLASS_NAMES_PATH.open(encoding="utf-8") as file:
        classes = json.load(file)

    if not isinstance(classes, list) or not all(isinstance(c, str) for c in classes):
        raise ValueError("class_names.json harus berupa array nama kelas")
    if len(classes) != int(model.output_shape[-1]):
        raise ValueError("Jumlah nama kelas tidak cocok dengan output model")
    input_shape = model.input_shape
    if len(input_shape) != 4 or input_shape[-1] != 3:
        raise ValueError("Model harus menerima input citra RGB dengan bentuk NHWC")

    height, width = int(input_shape[1]), int(input_shape[2])
    return model, classes, width, height


def predict_image(content: bytes) -> PredictionResponse:
    model, classes, width, height = get_model_bundle()
    tensor = image_to_tensor(content, width, height)
    predictions = model.predict(tensor, verbose=0)[0]
    index = int(np.argmax(predictions))
    scores = [ClassScore(label=name, confidence=float(predictions[i])) for i, name in enumerate(classes)]
    scores.sort(key=lambda item: item.confidence, reverse=True)
    return PredictionResponse(label=classes[index], confidence=float(predictions[index]), scores=scores)
