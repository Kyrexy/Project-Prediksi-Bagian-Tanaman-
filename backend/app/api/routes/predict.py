from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import MAX_IMAGE_BYTES
from app.schemas.prediction import PredictionResponse
from app.services.model_service import predict_image

router = APIRouter(tags=["prediction"])


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(status_code=400, detail="Gunakan gambar JPG atau PNG")

    try:
        content = await file.read(MAX_IMAGE_BYTES + 1)
    finally:
        await file.close()

    if not content:
        raise HTTPException(status_code=400, detail="File gambar kosong")
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Ukuran gambar maksimal 5 MB")

    try:
        return predict_image(content)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
