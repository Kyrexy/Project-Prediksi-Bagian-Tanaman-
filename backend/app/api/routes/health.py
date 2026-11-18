import json

from fastapi import APIRouter
from app.services.model_service import get_model_bundle, model_files_ready

router = APIRouter(tags=["status"])


@router.get("/health")
def health():
    if not model_files_ready():
        return {"status": "model_missing"}
    try:
        _, classes, _, _ = get_model_bundle()
    except (FileNotFoundError, ValueError, OSError, json.JSONDecodeError) as exc:
        return {"status": "model_error", "detail": str(exc)}
    return {"status": "ready", "classes": classes}
