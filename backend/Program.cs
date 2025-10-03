using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend;


var builder = WebApplication.CreateBuilder(args);

// Add services needed for controllers
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext for SQL Server
builder.Services.AddDbContext<BakeryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BakeryData")));

// Enable CORS to allow frontend to make API calls
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
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
