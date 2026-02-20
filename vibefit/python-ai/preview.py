"""Local preview runner for VibeFit recommendation engine.

This script does not require FastAPI or scikit-learn.
It prints a sample recommendation so users can verify behavior quickly.
"""

from app.recommender import RecommendationEngine


def main() -> None:
    engine = RecommendationEngine()
    sample_input = {
        "gender": "female",
        "body_type": "hourglass",
        "skin_tone": "warm",
        "occasion": "wedding",
        "weather": "hot",
        "style_preference": "formal",
    }

    result = engine.recommend(sample_input)

    print("VibeFit preview input:")
    for key, value in sample_input.items():
        print(f"  - {key}: {value}")

    print("\nVibeFit preview result:")
    for key, value in result.items():
        print(f"  - {key}: {value}")


if __name__ == "__main__":
    main()
