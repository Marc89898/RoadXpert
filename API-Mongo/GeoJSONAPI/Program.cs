using MongoDB.Driver;
using GeoJSONAPI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Driver.GridFS;
using MongoDB.Bson;
using System.IO;
using System.Threading.Tasks;
using GeoJSONAPI.Models;
using GeoJSONAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure MongoDB settings from appsettings.json
builder.Services.Configure<MongoStoreDatabaseSettings>(
    builder.Configuration.GetSection("MongoStoreDatabase"));

// Register MongoDB client
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoStoreDatabaseSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

// Register GeoJSONFileService
builder.Services.AddSingleton<GeoJSONFileService>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://172.23.3.204:5010") // Reemplaza con el origen de tu frontend
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy"); 

app.UseAuthorization();

app.MapControllers();

app.Run();
