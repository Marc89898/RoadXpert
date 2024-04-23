import apiconfig from "./apiconfig.json";
import axios from 'axios';
import apiconfig from './apiconfig.json';

class ApiHelper {
    static mongoUrl = apiconfig.mongoRouteApi.API_URL;
    static sqlUrl = apiconfig.mssqlApi.API_URL;

    // Subir archivo a MongoDB
    static async uploadFileToMongo(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${this.mongoUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.objectID;
        } catch (error) {
            console.error('Error uploading file to MongoDB:', error);
            throw error;
        }
    }

    // Crear práctica en SQL
    static async createPracticaInSQL(practicaData) {
        try {
            const response = await axios.post(`${this.sqlUrl}/createPractica`, practicaData);
            return response.data;
        } catch (error) {
            console.error('Error creating practica in SQL:', error);
            throw error;
        }
    }
}

export default ApiHelper;
