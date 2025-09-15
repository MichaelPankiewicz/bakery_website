var builder = WebApplication.CreateBuilder(args);


// Add services needed for controllers
builder.Services.AddControllers();
builder.Services.AddSingleton<BakeryAPI.Services.BakeryItemService>();
builder.Services.AddSingleton<BakeryAPI.Services.AboutExploreService>();
builder.Services.AddSingleton<BakeryAPI.Services.ChefInfoService>();
builder.Services.AddSingleton<BakeryAPI.Services.ExploreMoreService>();
builder.Services.AddSingleton<BakeryAPI.Services.GalleryImageService>();
builder.Services.AddSingleton<BakeryAPI.Services.MenuHighlightService>();
builder.Services.AddSingleton<BakeryAPI.Services.TopMenuItemService>();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS with restricted origins (no AllowAnyOrigin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendOnly", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000", // Vite/React/Frontend dev
            "http://localhost:5173", // Vite default
            "http://localhost:5144"  // .NET dev server (optioneel)
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use static files (but they are served by Vite in this case)
app.UseStaticFiles();

app.UseRouting();

// Enable CORS (must be before MapControllers)
app.UseCors("FrontendOnly");

// Enable Swagger in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
