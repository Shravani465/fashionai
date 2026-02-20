-- VibeFit SQL Server schema
-- This schema stores users, outfit catalog, and recommendation history.

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(120) NOT NULL,
    Gender NVARCHAR(20) NOT NULL,
    BodyType NVARCHAR(30) NULL,
    SkinTone NVARCHAR(30) NULL,
    StylePreference NVARCHAR(40) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TABLE OutfitCatalog (
    OutfitId INT IDENTITY(1,1) PRIMARY KEY,
    OutfitName NVARCHAR(120) NOT NULL,
    GenderTarget NVARCHAR(20) NOT NULL,
    Occasion NVARCHAR(40) NOT NULL,
    WeatherTag NVARCHAR(20) NOT NULL, -- hot, mild, cold, rainy
    StyleTag NVARCHAR(40) NOT NULL, -- casual, formal, streetwear, chic
    BodyTypeFit NVARCHAR(40) NOT NULL, -- athletic, pear, rectangle, etc.
    PrimaryColor NVARCHAR(30) NOT NULL,
    SecondaryColor NVARCHAR(30) NULL,
    ItemDescription NVARCHAR(300) NULL,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE RecommendationsHistory (
    RecommendationId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    OutfitId INT NULL,
    InputSnapshot NVARCHAR(MAX) NOT NULL, -- JSON input sent by user
    ColorSuggestion NVARCHAR(100) NOT NULL,
    ConfidenceScore DECIMAL(5,2) NOT NULL, -- e.g. 0.00 to 100.00
    RecommendationText NVARCHAR(500) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT FK_RecommendationsHistory_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_RecommendationsHistory_OutfitCatalog FOREIGN KEY (OutfitId) REFERENCES OutfitCatalog(OutfitId)
);
GO

-- Helpful indexes for query performance
CREATE INDEX IX_OutfitCatalog_Search ON OutfitCatalog (GenderTarget, Occasion, WeatherTag, StyleTag, BodyTypeFit);
CREATE INDEX IX_RecommendationsHistory_UserDate ON RecommendationsHistory (UserId, CreatedAt DESC);
GO

-- Sample seed data
INSERT INTO OutfitCatalog (OutfitName, GenderTarget, Occasion, WeatherTag, StyleTag, BodyTypeFit, PrimaryColor, SecondaryColor, ItemDescription)
VALUES
('Navy Smart Casual Set', 'male', 'office', 'mild', 'smart-casual', 'rectangle', 'navy', 'white', 'Navy blazer, white shirt, tapered chinos, loafers'),
('Warm Earth Layered Look', 'female', 'weekend', 'cold', 'casual', 'pear', 'olive', 'beige', 'Knitted top, high-waist jeans, camel coat, ankle boots'),
('Summer Wedding Elegance', 'female', 'wedding', 'hot', 'formal', 'hourglass', 'emerald', 'gold', 'Flowing midi dress, block heels, clutch bag'),
('Monochrome Street Vibe', 'unisex', 'party', 'mild', 'streetwear', 'athletic', 'black', 'gray', 'Oversized jacket, fitted tee, cargo pants, sneakers');
GO
