using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SpeechToTextApp
{

    public class TranscriptionResponse
    {
        public string self { get; set; }
        public Model model { get; set; }
        public Links links { get; set; }
        public Properties properties { get; set; }
        public DateTime lastActionDateTime { get; set; }
        public string status { get; set; }
        public DateTime createdDateTime { get; set; }
        public string locale { get; set; }
        public string displayName { get; set; }
        public string description { get; set; }
    }

    public class Model
    {
        public string self { get; set; }
    }

    public class Links
    {
        public string files { get; set; }
    }

    public class Properties
    {
        public bool diarizationEnabled { get; set; }
        public bool wordLevelTimestampsEnabled { get; set; }
        public bool displayFormWordLevelTimestampsEnabled { get; set; }
        public int[] channels { get; set; }
        public string punctuationMode { get; set; }
        public string profanityFilterMode { get; set; }
    }

    class Program
    {
        static async Task Main(string[] args)
        {
            await App();
        }

        static async Task App()
        {
            string azureApiKey = ""; // Reemplaza con tu clave de API de Azure
            string azureEndpoint = "https://eastus.api.cognitive.microsoft.com/speechtotext/v3.1/transcriptions";

            try
            {
                var transcriptionResult = await TranscribeAudioFiles(azureApiKey, azureEndpoint);

                var contentUrl = await GetContentUrlFromTranscription(azureApiKey, transcriptionResult);
                Console.WriteLine("Content URL: " + contentUrl);

                HttpClient client = new HttpClient();
                var response = await client.GetAsync(contentUrl);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Error al obtener el contenido de la transcripción");
                }

                var transcriptionContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Transcripción: " + transcriptionContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en la transcripción del audio: " + ex.Message);
            }
        }

        static async Task<dynamic> TranscribeAudioFiles(string apiKey, string endpoint)
        {
            try
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);

                var transcriptionRequest = new
                {
                    displayName = "My Transcription",
                    description = "Speech Studio Batch speech to text",
                    locale = "en-us",
                    contentUrls = new List<string> { "https://crbn.us/whatstheweatherlike.wav" },
                    model = new
                    {
                        self = "https://eastus.api.cognitive.microsoft.com/speechtotext/v3.2-preview.1/models/base/e418c4a9-9937-4db7-b2c9-8afbff72d950"
                    },
                    properties = new
                    {
                        wordLevelTimestampsEnabled = false,
                        displayFormWordLevelTimestampsEnabled = true,
                        diarizationEnabled = false,
                        punctuationMode = "DictatedAndAutomatic",
                        profanityFilterMode = "Masked"
                    },
                    customProperties = new { }
                };

                var jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(transcriptionRequest);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(endpoint, content);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Error al realizar la solicitud a la API de Azure");
                }

                var responseData = await response.Content.ReadAsStringAsync();

                // Deserializa el JSON en un objeto TranscriptionResponse
                TranscriptionResponse responseObj = Newtonsoft.Json.JsonConvert.DeserializeObject<TranscriptionResponse>(responseData);

                // Accede a la propiedad files dentro de la propiedad links
                string filesLink = responseObj.links.files;

                Console.WriteLine("Enlace 'files': " + filesLink);

                return filesLink;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en la solicitud a la API de Azure: " + ex.Message);
                throw;
            }
        }

        static async Task<string> GetContentUrlFromTranscription(string apiKey, string transcriptionFilesUrla)
        {
            Console.WriteLine("Obteniendo contenido desde la URL:-" + transcriptionFilesUrla+ "-");
            String transcriptionFilesUrl = "https://eastus.api.cognitive.microsoft.com/speechtotext/v3.1/transcriptions/ee28fdc8-024c-438a-a3fc-8e0dc1a6f65c/files";
            //String transcriptionFilesUrl = transcriptionFilesUrla;

            try
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);

                var response = await client.GetAsync(transcriptionFilesUrl);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Error al obtener el contenido desde la URL");
                }

                var responseData = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Respuesta de la URL: " + responseData);
                var data = Newtonsoft.Json.JsonConvert.DeserializeObject(responseData);
                return data.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al obtener el contenido desde la URL: " + ex.Message);
                throw;
            }
        }
    }
}
