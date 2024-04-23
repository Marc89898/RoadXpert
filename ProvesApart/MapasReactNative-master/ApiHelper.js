import apiconfig from "./apiconfig.json";
import axios from 'axios';

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

}

export default ApiHelper;
