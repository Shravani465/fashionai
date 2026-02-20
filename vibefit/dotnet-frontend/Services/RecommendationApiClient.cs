using System.Text;
using System.Text.Json;
using VibeFit.Web.Models;

namespace VibeFit.Web.Services;

public class RecommendationApiClient
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public RecommendationApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<RecommendationResultViewModel?> GetRecommendationAsync(RecommendationInputViewModel input)
    {
        var client = _httpClientFactory.CreateClient();
        var baseUrl = _configuration["BackendApi:BaseUrl"] ?? "http://localhost:8080";

        var payload = new
        {
            gender = input.Gender,
            bodyType = input.BodyType,
            skinTone = input.SkinTone,
            occasion = input.Occasion,
            weather = input.Weather,
            stylePreference = input.StylePreference
        };

        var response = await client.PostAsync(
            $"{baseUrl}/api/recommendations",
            new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        );

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<RecommendationResultViewModel>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }
}
