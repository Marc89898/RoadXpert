using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using GeoJSONAPI.Models;

namespace GeoJSONAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<GeoJSONFile> GeoJSONFiles { get; set; }
    }
}
