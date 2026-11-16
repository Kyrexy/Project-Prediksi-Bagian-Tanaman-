from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[2]
MODEL_DIR = BACKEND_ROOT / "models"
MODEL_PATH = MODEL_DIR / "model_tanaman.keras"
CLASS_NAMES_PATH = MODEL_DIR / "class_names.json"
MAX_IMAGE_BYTES = 5 * 1024 * 1024
CORS_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]
