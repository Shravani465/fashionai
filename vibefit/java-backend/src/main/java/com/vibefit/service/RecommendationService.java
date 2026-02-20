package com.vibefit.service;

import com.vibefit.dto.RecommendationInputDto;
import com.vibefit.dto.RecommendationResponseDto;
import com.vibefit.exception.PythonServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class RecommendationService {

    private final RestClient restClient;

    public RecommendationService(@Value("${python.api.base-url}") String pythonApiBaseUrl) {
        this.restClient = RestClient.builder().baseUrl(pythonApiBaseUrl).build();
    }

    public RecommendationResponseDto getRecommendation(RecommendationInputDto input) {
        try {
            Map<String, Object> pythonResponse = restClient.post()
                    .uri("/recommend")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "gender", input.gender(),
                            "body_type", input.bodyType(),
                            "skin_tone", input.skinTone(),
                            "occasion", input.occasion(),
                            "weather", input.weather(),
                            "style_preference", input.stylePreference()
                    ))
                    .retrieve()
                    .body(Map.class);

            if (pythonResponse == null) {
                throw new PythonServiceException("Python AI service returned empty response");
            }

            return new RecommendationResponseDto(
                    pythonResponse.get("recommended_outfit").toString(),
                    pythonResponse.get("color_suggestion").toString(),
                    Double.parseDouble(pythonResponse.get("confidence_score").toString()),
                    pythonResponse.get("explanation").toString()
            );
        } catch (Exception ex) {
            throw new PythonServiceException("Failed to fetch recommendations from AI service");
        }
    }
}
