using Microsoft.AspNetCore.Http;

namespace GeoJSONAPI.ApiMongoDB{
    /// <summary>
    /// Class to upload a file
    /// </summary>
    public class UploadFile
    {
        public IFormFile File { get; set; }
    }
}
