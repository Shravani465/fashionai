using System.ComponentModel.DataAnnotations;

namespace VibeFit.Web.Models;

public class RecommendationInputViewModel
{
    [Required] public string Gender { get; set; } = "female";
    [Required] public string BodyType { get; set; } = "hourglass";
    [Required] public string SkinTone { get; set; } = "warm";
    [Required] public string Occasion { get; set; } = "wedding";
    [Required] public string Weather { get; set; } = "hot";
    [Required] public string StylePreference { get; set; } = "formal";
}
