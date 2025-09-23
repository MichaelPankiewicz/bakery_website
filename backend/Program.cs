var builder = WebApplication.CreateBuilder(args);

// Add services needed for controllers
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS to allow frontend to make API calls
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    options.AddPolicy("ProductionCors", policy =>
    {
        policy.WithOrigins("https://jouwproductiedomein.nl") // Pas aan naar echte domein
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use static files (but they are served by Vite in this case)
app.UseStaticFiles();

app.UseRouting();

// Enable CORS (must be before MapControllers)
app.UseCors("AllowAll");

// Enable Swagger in Development
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAll");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors("ProductionCors");
}

app.MapControllers();

app.Run();
