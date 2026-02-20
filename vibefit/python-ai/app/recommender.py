from __future__ import annotations

from dataclasses import dataclass
from typing import List

import numpy as np
from sklearn.feature_extraction import DictVectorizer
from sklearn.neighbors import KNeighborsClassifier


@dataclass
class Outfit:
    name: str
    gender: str
    body_type: str
    occasion: str
    weather: str
    style_preference: str
    color_palette: str


# In production, this can come from SQL Server.
OUTFITS: List[Outfit] = [
    Outfit("Emerald Midi Dress + Nude Heels", "female", "hourglass", "wedding", "hot", "formal", "emerald + nude"),
    Outfit("Camel Coat + Knitwear + Boots", "female", "pear", "weekend", "cold", "casual", "camel + cream"),
    Outfit("Navy Blazer + White Shirt + Chinos", "male", "rectangle", "office", "mild", "smart-casual", "navy + white"),
    Outfit("Bomber Jacket + Cargo Pants + Sneakers", "unisex", "athletic", "party", "mild", "streetwear", "black + charcoal"),
    Outfit("Trench Coat + Dark Denim + Chelsea Boots", "male", "athletic", "date", "rainy", "chic", "khaki + black"),
]


class RecommendationEngine:
    def __init__(self) -> None:
        self.vectorizer = DictVectorizer(sparse=False)
        self.model = KNeighborsClassifier(n_neighbors=1)
        self._train()

    def _train(self) -> None:
        train_x = [
            {
                "gender": o.gender,
                "body_type": o.body_type,
                "occasion": o.occasion,
                "weather": o.weather,
                "style_preference": o.style_preference,
            }
            for o in OUTFITS
        ]
        train_y = [o.name for o in OUTFITS]
        x_vectorized = self.vectorizer.fit_transform(train_x)
        self.model.fit(x_vectorized, train_y)

    def _color_from_skin_tone(self, skin_tone: str) -> str:
        color_map = {
            "warm": "earth tones (olive, mustard, rust)",
            "cool": "jewel tones (sapphire, emerald, plum)",
            "neutral": "balanced palette (navy, blush, teal)",
            "deep": "high-contrast tones (cobalt, white, maroon)",
            "fair": "soft pastels (lavender, mint, powder blue)",
        }
        return color_map.get(skin_tone.lower(), "classic neutrals (black, white, beige)")

    def recommend(self, payload: dict) -> dict:
        # Rule-based score first: ensures business explainability.
        scored = []
        for outfit in OUTFITS:
            score = 0
            if outfit.gender == payload["gender"] or outfit.gender == "unisex":
                score += 20
            if outfit.body_type == payload["body_type"]:
                score += 20
            if outfit.occasion == payload["occasion"]:
                score += 20
            if outfit.weather == payload["weather"]:
                score += 20
            if outfit.style_preference == payload["style_preference"]:
                score += 20
            scored.append((outfit, score))

        rule_best, rule_score = max(scored, key=lambda x: x[1])

        # Lightweight ML prediction: nearest known style profile.
        vector = self.vectorizer.transform([
            {
                "gender": payload["gender"],
                "body_type": payload["body_type"],
                "occasion": payload["occasion"],
                "weather": payload["weather"],
                "style_preference": payload["style_preference"],
            }
        ])
        ml_prediction = self.model.predict(vector)[0]

        # Confidence combines rule score and ML agreement.
        ml_bonus = 10 if ml_prediction == rule_best.name else 0
        confidence = min(100.0, float(rule_score + ml_bonus))

        return {
            "recommended_outfit": rule_best.name,
            "color_suggestion": self._color_from_skin_tone(payload["skin_tone"]),
            "confidence_score": round(confidence, 2),
            "explanation": (
                f"Rule score={rule_score}/100. ML suggested '{ml_prediction}'. "
                f"Final confidence includes ML agreement bonus."
            ),
        }
