package com.vibefit.dto;

import jakarta.validation.constraints.NotBlank;

public record RecommendationInputDto(
        @NotBlank String gender,
        @NotBlank String bodyType,
        @NotBlank String skinTone,
        @NotBlank String occasion,
        @NotBlank String weather,
        @NotBlank String stylePreference
) {}
