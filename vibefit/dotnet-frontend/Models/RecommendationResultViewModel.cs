namespace VibeFit.Web.Models;

public class RecommendationResultViewModel
{
    public string RecommendedOutfit { get; set; } = string.Empty;
    public string ColorSuggestion { get; set; } = string.Empty;
    public double ConfidenceScore { get; set; }
    public string Explanation { get; set; } = string.Empty;
}
