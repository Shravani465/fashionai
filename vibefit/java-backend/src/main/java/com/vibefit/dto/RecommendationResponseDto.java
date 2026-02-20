package com.vibefit.dto;

public record RecommendationResponseDto(
        String recommendedOutfit,
        String colorSuggestion,
        double confidenceScore,
        String explanation
) {}
