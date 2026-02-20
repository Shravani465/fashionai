using Microsoft.AspNetCore.Mvc;
using VibeFit.Web.Models;
using VibeFit.Web.Services;

namespace VibeFit.Web.Controllers;

public class HomeController : Controller
{
    private readonly RecommendationApiClient _apiClient;

    public HomeController(RecommendationApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    [HttpGet]
    public IActionResult Index() => View(new RecommendationInputViewModel());

    [HttpPost]
    public async Task<IActionResult> Index(RecommendationInputViewModel input)
    {
        if (!ModelState.IsValid)
        {
            return View(input);
        }

        var result = await _apiClient.GetRecommendationAsync(input);
        ViewBag.Result = result;
        return View(input);
    }
}
