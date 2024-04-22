using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GeoJSONAPI.ApiMongoDB{
    /// <summary>
    /// Class to store the GeoJSON file
    /// </summary>
    public class GeoJSONFile
    {
        [ObjectId]
        public ObjectId Id { get; set; }

        public string professor_id { get; set; }

        public string alumne_id { get; set; }

        public string data { get; set; }

        public string FileName { get; set; }
        public string ObjectID { get; set; }
    }
}