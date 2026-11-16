from fastapi import APIRouter
from app.services.model_service import model_files_ready

router = APIRouter(tags=["status"])


@router.get("/health")
def health():
    return {"status": "ready" if model_files_ready() else "model_missing"}
