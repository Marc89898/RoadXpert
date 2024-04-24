using Microsoft.AspNetCore.Mvc;
using GeoJSONAPI.Services;
using GeoJSONAPI.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;

namespace GeoJSONAPI.Controllers
{
    [Route("GeoJSONAPI/v1/[controller]")]
    [ApiController]
    public class GeoJSONFileController : ControllerBase
    {
        private readonly GeoJSONFileService _geoJSONFileService;

        public GeoJSONFileController(GeoJSONFileService geoJSONFileService)
        {
            _geoJSONFileService = geoJSONFileService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GeoJSONFile>>> GetAll()
        {
            var files = await _geoJSONFileService.GetAsync();
            if (files == null)
            {
                return NotFound();
            }
            return Ok(files);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GeoJSONFile>> GetFile(string id)
        {
            var file = await _geoJSONFileService.GetAsync(id);
            if (file == null)
            {
                return NotFound();
            }
            return Ok(file);
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
                    geoJSONFile.Id = fileId;
                }

                await _geoJSONFileService.CreateAsync(geoJSONFile);

                // Convertir ObjectId a su representación en cadena
                string objectIdString = geoJSONFile.Id.ToString();

                return Ok(new { Message = "Archivo GeoJSON subido con éxito.", ObjectId = objectIdString });
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
            if (file == null)
            {
                return NotFound();
            }

            await _geoJSONFileService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(string id)
        {
            var stream = await _geoJSONFileService.GetFileStreamAsync(id);
            if (stream == null)
            {
                return NotFound();
            }
            var fileName = await _geoJSONFileService.GetAsync(id);

            return File(stream, "application/json", fileName.FileName);
        }
    }
}
