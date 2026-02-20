from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    gender: str = Field(..., examples=["female"])
    body_type: str = Field(..., examples=["hourglass"])
    skin_tone: str = Field(..., examples=["warm"])
    occasion: str = Field(..., examples=["wedding"])
    weather: str = Field(..., examples=["hot"])
    style_preference: str = Field(..., examples=["formal"])


class RecommendationResponse(BaseModel):
    recommended_outfit: str
    color_suggestion: str
    confidence_score: float
    explanation: str
