using Microsoft.AspNetCore.Http;

namespace GeoJSONAPI.Models{
    /// <summary>
    /// Class to upload a file
    /// </summary>
    public class UploadFile
    {
        public IFormFile File { get; set; }
    }
}
