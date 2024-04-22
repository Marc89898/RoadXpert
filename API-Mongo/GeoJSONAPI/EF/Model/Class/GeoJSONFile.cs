using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
// import object id
using MongoDB.Bson;

namespace GeoJSONAPI.Models{
    /// <summary>
    /// Class to store the GeoJSON file
    /// </summary>
    public class GeoJSONFile
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        public string professor_id { get; set; }

        public string alumne_id { get; set; }

        public string data { get; set; }

        public string FileName { get; set; }
    }
}