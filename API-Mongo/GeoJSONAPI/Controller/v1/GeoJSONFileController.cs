using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoStoreApi.Services;
using GeoJSONAPI.ApiMongoDB;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GeoJSONAPI.Controllers
{
    [Route("FitxersAPI/v1/[controller]")]
    [ApiController]
    public class GeoJSONFileController : ControllerBase
    {
        private readonly GeoJSONFileService _geoJSONFileService;

        public GeoJSONFileController(GeoJSONFileService geoJSONFileService) =>
            _geoJSONFileService = geoJSONFileService;

        [HttpGet]
        public async Task<ActionResult<List<GeoJSONFile>>> GetAll()
        {
            var files = await _geoJSONFileService.GetAsync();
            if (files is null)
            {
                return NotFound();
            }
            return files;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GeoJSONFile>> GetFile(string id)
        {
            var file = await _geoJSONFileService.GetAsync(id);
            if (file is null)
            {
                return NotFound();
            }
            return file;
        }

        [HttpPost]
        public async Task<IActionResult> UploadGeoJSON([FromForm] UploadFile uploadFile)
        {
            try
            {
                var geoJSONFile = new GeoJSONFile
                {
                    FileName = uploadFile.File.FileName,
                };

                var uploadOptions = new GridFSUploadOptions
                {
                    Metadata = new BsonDocument("contentType", uploadFile.File.ContentType)
                };

                using (var stream = uploadFile.File.OpenReadStream())
                {
                    var fileId = await _geoJSONFileService.UploadFileAsync(uploadFile.File.FileName, stream, uploadOptions);
                    geoJSONFile.ObjectID = fileId.ToString();
                }

                await _geoJSONFileService.CreateAsync(geoJSONFile);

                return Ok(new { Message = "Archivo GeoJSON subido con éxito.", ObjectId = geoJSONFile.ObjectID });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error interno del servidor.", Error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(string id)
        {
            var file = await _geoJSONFileService.GetAsync(id);
            if (file is null)
            {
                return NotFound();
            }

            await _geoJSONFileService.DeleteAsync(id);
            return NoContent();
        }
    }
}
