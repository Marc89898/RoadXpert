namespace GeoJSONAPI.Models;
/// <summary>
/// Classe per a la col·lecció de songs
/// </summary>
public class MongoStoreDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string RouteCollectionName { get; set; } = null!;

}