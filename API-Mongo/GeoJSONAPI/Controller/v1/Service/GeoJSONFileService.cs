using Microsoft.Extensions.Options;
using MongoDB.Driver;
using GeoJSONAPI.Models;
using ProjecteV2.ApiMongoDB;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace GeoJSONAPI.Services
{
    /// <summary>
    /// Servei per a la col·lecció de GeoJSON files
    /// </summary>
    public class GeoJSONFileService
    {
        private readonly IMongoCollection<GeoJSONFile> _filesCollection;
        private readonly GridFSBucket _gridFsBucket;

        public GeoJSONFileService(IOptions<MongoStoreDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _filesCollection = database.GetCollection<GeoJSONFile>(settings.Value.GeoJSONFilesCollectionName);
            _gridFsBucket = new GridFSBucket(database);
        }

        public async Task<List<GeoJSONFile>> GetAsync() =>
            (await _filesCollection.FindAsync(file => true)).ToList();

        public async Task<GeoJSONFile?> GetAsync(string id) =>
            await _filesCollection.Find(file => file.ObjectID == id).FirstOrDefaultAsync();

        public async Task CreateAsync(GeoJSONFile file) =>
            await _filesCollection.InsertOneAsync(file);

        public async Task DeleteAsync(string id)
        {
            await _gridFsBucket.DeleteAsync(new ObjectId(id));
            await _filesCollection.DeleteOneAsync(file => file.ObjectID == id);
        }

        public async Task<ObjectId> UploadFileAsync(string filename, Stream stream, GridFSUploadOptions options)
        {
            return await _gridFsBucket.UploadFromStreamAsync(filename, stream, options);
        }

        public async Task<Stream?> GetFileStreamAsync(string objectId)
        {
            try
            {
                var file = await GetAsync(objectId);
                if (file == null)
                {
                    return null;
                }

                var fileStream = await _gridFsBucket.OpenDownloadStreamAsync(new ObjectId(file.ObjectID));
                return fileStream;
            }
            catch
            {
                return null;
            }
        }
    }
}
