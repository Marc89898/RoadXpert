import apiconfig from "./../../../../apiconfig.json";
import axios from 'axios';
import * as FileSystem from "expo-file-system";

class ApiHelper {
    // static mongoUrl = apiconfig.mongoRouteApi.API_URL;
    // static sqlUrl = apiconfig.mssqlApi.API_URL;

    // Subir archivo a MongoDB
    static async uploadFileToMongo(fileUri) {
        try {
            const formData = new FormData();
            const file = {
                uri: fileUri,
                name: "mapaExample5.json",
                type: "application/json",
            };
            formData.append("File", file);

            const response = await fetch(`${apiconfig.mongoRouteApi.API_URL}/GeoJSONAPI/v1/GeoJSONFile`, {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Data: ${errorData}`);
            }

            const data = await response.json();
            return data.objectId;  // Asumiendo que el objeto de respuesta tiene un campo ObjectId

        } catch (error) {
            if (error.response) {
                // El servidor ha respondido con un código de estado fuera del rango 2xx
                console.error('Server Error:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                // La solicitud se hizo pero no se recibió respuesta
                console.error('No response received:', error.request);
            } else {
                // Ocurrió un error durante la solicitud
                console.error('Error', error.message);
            }
            throw new Error(`Error uploading file to MongoDB: ${error}`);
        }
    }

    // Crear práctica en SQL
    static async createPracticaInSQL(practicaData) {
        try {
            console.log('Creating Practica:', practicaData);
            const response = await fetch(`${apiconfig.mssqlApi.API_URL}/Practica`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(practicaData),
            });

            if (!response.ok) {
                throw new Error('Error adding Practica');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating Practica:', error);
            throw new Error(`Error posting new Practica: ${error.message}`);
        }
    };

    // Descargar archivo desde MongoDB usando objectId
    static async downloadFileFromMongo(objectId) {
        try {
            // URL para descargar el archivo basado en el objectId
            const downloadUrl = `${apiconfig.mongoRouteApi.API_URL}/GeoJSONAPI/v1/GeoJSONFile/download/${objectId}`;
    
            // Realizar la solicitud para descargar el archivo
            const response = await axios.get(downloadUrl, {
                responseType: 'blob', // Para recibir datos binarios
            });
    
            // Convertir el blob a un objeto de texto
            const reader = new FileReader();
            reader.readAsText(response.data);
    
            // Esperar a que el lector termine
            const fileContent = await new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
            });
    
            // Crear una URL local para el archivo descargado
            const localFileUri = FileSystem.documentDirectory + `mapa_${objectId}.json`;
    
            // Guardar el archivo descargado localmente
            await FileSystem.writeAsStringAsync(localFileUri, fileContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });
    
            console.log('Archivo guardado en:', localFileUri);
    
            return localFileUri;
    
        } catch (error) {
            console.error('Error downloading file from MongoDB:', error);
            throw new Error(`Error downloading file from MongoDB: ${error.message}`);
        }
    } 

}

export default ApiHelper;
