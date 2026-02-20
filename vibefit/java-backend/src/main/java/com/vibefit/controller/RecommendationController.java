package com.vibefit.controller;

import com.vibefit.dto.RecommendationInputDto;
import com.vibefit.dto.RecommendationResponseDto;
import com.vibefit.service.RecommendationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping
    public RecommendationResponseDto recommend(@Valid @RequestBody RecommendationInputDto input) {
        return recommendationService.getRecommendation(input);
    }
}
