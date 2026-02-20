# VibeFit - AI Fashion Recommendation System

This implementation is split into 4 modules to match your required architecture:
- **SQL Server** for persistence
- **Python FastAPI** for AI recommendation logic
- **Java Spring Boot** as API orchestrator
- **ASP.NET MVC** frontend UI

## 1) Database schema
Path: `database/schema.sql`

Main tables:
1. `Users`
2. `OutfitCatalog`
3. `RecommendationsHistory`

Use SQL Server Management Studio:
```sql
:r .\database\schema.sql
```

---

## 2) Python AI service (FastAPI)
Path: `python-ai/`

### What it does
- Accepts user profile input.
- Uses **rule-based scoring** for explainable recommendations.
- Uses lightweight **KNN model (scikit-learn)** as an ML layer.
- Returns:
  - `recommended_outfit`
  - `color_suggestion`
  - `confidence_score`
  - `explanation`

### Run locally
```bash
cd python-ai
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Test endpoint:
```bash
curl -X POST http://localhost:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "gender":"female",
    "body_type":"hourglass",
    "skin_tone":"warm",
    "occasion":"wedding",
    "weather":"hot",
    "style_preference":"formal"
  }'
```

---

## 3) Java backend (Spring Boot)
Path: `java-backend/`

### Responsibilities
- Receives frontend input (`/api/recommendations`).
- Maps DTO to Python payload naming.
- Calls Python FastAPI service.
- Returns standardized response DTO.
- Handles validation + downstream errors.

### Run locally
```bash
cd java-backend
mvn spring-boot:run
```

Config file:
- `src/main/resources/application.yml`
- `python.api.base-url: http://localhost:8000`

---

## 4) ASP.NET MVC frontend
Path: `dotnet-frontend/`

### Features
- User form for all required fields.
- Calls Java backend from controller service.
- Displays outfit + color recommendation.
- Shows confidence score using a progress bar.
- Includes simple CSS for beginner-friendly UI.

### Run locally
```bash
cd dotnet-frontend
dotnet run
```

Open:
- `http://localhost:5000` (or port shown in terminal)

---

## 5) Deployment instructions

## Local stack order
1. Start SQL Server and apply schema.
2. Start Python AI service (`:8000`).
3. Start Java backend (`:8080`).
4. Start ASP.NET frontend.

## Containerized strategy (recommended)
- Build 3 app containers: Python, Java, .NET.
- Use managed SQL Server (Azure SQL or self-hosted SQL Server container).
- Environment variables:
  - Python: DB creds if persisting catalogs
  - Java: `PYTHON_API_BASE_URL`
  - .NET: `BackendApi__BaseUrl`

## Suggested production hardening
- Add authentication (JWT + role-based access).
- Persist recommendation history through Java backend.
- Add retries/circuit breaker (Resilience4j) for Python API calls.
- Add logging/tracing (OpenTelemetry).
- Add model version field in recommendation responses.

---

## Folder structure
```text
vibefit/
├── README.md
├── database/
│   └── schema.sql
├── python-ai/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── models.py
│       └── recommender.py
├── java-backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/vibefit/
│       │   ├── VibeFitBackendApplication.java
│       │   ├── controller/RecommendationController.java
│       │   ├── dto/RecommendationInputDto.java
│       │   ├── dto/RecommendationResponseDto.java
│       │   ├── exception/GlobalExceptionHandler.java
│       │   ├── exception/PythonServiceException.java
│       │   └── service/RecommendationService.java
│       └── resources/application.yml
└── dotnet-frontend/
    ├── VibeFit.Web.csproj
    ├── Program.cs
    ├── appsettings.json
    ├── Controllers/HomeController.cs
    ├── Models/
    │   ├── RecommendationInputViewModel.cs
    │   └── RecommendationResultViewModel.cs
    ├── Services/RecommendationApiClient.cs
    ├── Views/Home/Index.cshtml
    └── wwwroot/css/site.css
```
