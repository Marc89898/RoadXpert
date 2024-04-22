using Microsoft.Extensions.Options;
using MongoDB.Driver;
using GeoJSONAPI.Models;
using MongoDB.Driver.GridFS;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MongoDB.Bson;
using System;

namespace GeoJSONAPI.Services
{
    public class GeoJSONFileService
    {
        private readonly IMongoCollection<GeoJSONFile> _filesCollection;
        private readonly GridFSBucket _gridFsBucket;

        public GeoJSONFileService(IMongoClient mongoClient, IOptions<MongoStoreDatabaseSettings> settings)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _filesCollection = database.GetCollection<GeoJSONFile>(settings.Value.GeoJSONFilesCollectionName);
            _gridFsBucket = new GridFSBucket(database);
        }

        public async Task<List<GeoJSONFile>> GetAsync() =>
            await _filesCollection.Find(_ => true).ToListAsync();

        public async Task<GeoJSONFile> GetAsync(string id) =>
            await _filesCollection.Find(file => file.Id == ObjectId.Parse(id)).FirstOrDefaultAsync();

        public async Task CreateAsync(GeoJSONFile file) =>
            await _filesCollection.InsertOneAsync(file);

        public async Task DeleteAsync(string id)
        {
            await _gridFsBucket.DeleteAsync(new ObjectId(id));
            await _filesCollection.DeleteOneAsync(file => file.Id == ObjectId.Parse(id));
        }

        public async Task<ObjectId> UploadFileAsync(string filename, Stream stream, GridFSUploadOptions options)
        {
            return await _gridFsBucket.UploadFromStreamAsync(filename, stream, options);
        }

        public async Task<Stream?> GetFileStreamAsync(string id)
        {
            try
            {
                var file = await GetAsync(id);
                if (file == null)
                {
                    return null;
                }

                var fileStream = await _gridFsBucket.OpenDownloadStreamAsync(new ObjectId(id));
                return fileStream;
            }
            catch
            {
                return null;
            }
        }
    }
}
