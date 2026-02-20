from fastapi import FastAPI

from .models import RecommendationRequest, RecommendationResponse
from .recommender import RecommendationEngine

app = FastAPI(title="VibeFit AI Service", version="1.0.0")
engine = RecommendationEngine()


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/recommend", response_model=RecommendationResponse)
def recommend(request: RecommendationRequest) -> RecommendationResponse:
    result = engine.recommend(request.model_dump())
    return RecommendationResponse(**result)
