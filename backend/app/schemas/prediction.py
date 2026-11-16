from pydantic import BaseModel


class ClassScore(BaseModel):
    label: str
    confidence: float


class PredictionResponse(BaseModel):
    label: str
    confidence: float
    scores: list[ClassScore]
