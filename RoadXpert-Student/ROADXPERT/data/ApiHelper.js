import axios from 'axios';
import * as FileSystem from "expo-file-system";
import Config  from "../configuracions"

class ApiHelper {
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
            const response = await fetch(`http://${Config.ApiIP}:${Config.ApiPortMongo}/GeoJSONAPI/v1/GeoJSONFile`, {
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
            const response = await fetch(`http://${Config.ApiIP}:${Config.ApiPort}/Practica`, {
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

    static async updatePracticaInSQL(practicaData) {
        try {
            console.log('Updating Practica:', practicaData);
            const response = await fetch(`http://${Config.ApiIP}:${Config.ApiPort}/Practica/${practicaData.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(practicaData),
            });
            console.log('Response updating Practica:', response);
        } catch (error) {
            console.error('Error updating Practica:', error);
            throw new Error(`Error updating Practica: ${error.message}`);
        }
    };

    // Descargar archivo desde MongoDB usando objectId
    static async downloadFileFromMongo(objectId) {
        try {
            // URL para descargar el archivo basado en el objectId
            const downloadUrl = `http://${Config.ApiIP}:${Config.ApiPortMongo}/GeoJSONAPI/v1/GeoJSONFile/download/${objectId}`;

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

            // console.log('Archivo guardado en:', localFileUri);

            return localFileUri;

        } catch (error) {
            // console.error('Error downloading file from MongoDB:', error);
            throw new Error(`Error downloading file from MongoDB: ${error.message}`);
        }
    }

    static async fetchCotxes() {
        try {
            const response = await axios.get(`http://${Config.ApiIP}:${Config.ApiPort}/Vehicle`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cotxes:', error);
            throw error;
        }
    }

    static async fetchAlumnos() {
        try {
            const response = await axios.get(`http://${Config.ApiIP}:${Config.ApiPort}/Alumne`);
            if (response.status !== 200) {
                throw new Error('Error fetching alumnos');
            }
            const data = response.data;
            // Mapear los datos devueltos a un objeto ORM
            const alumnos = data.map(alumno => ({
                ID: alumno.ID,
                Nom: alumno.Nom,
                DNI: alumno.DNI,
                Adreca: alumno.Adreca,
                Telefon: alumno.Telefon,
                ProfessorID: alumno.ProfessorID,
                Contrasenya: alumno.Contrasenya,
                NumPracticas: alumno.NumPracticas
            }));
            return alumnos;
        } catch (error) {
            console.error('Error fetching alumnos:', error);
            throw new Error(`Error fetching alumnos: ${error.message}`);
        }
    };

    // Obtener la lista de carnets desde la API
    static async fetchCarnets() {
        try {
            const response = await axios.get(`${Config.ApiIP}:${Config.ApiPort}/Carnet`);
            return response.data;
        } catch (error) {
            console.error('Error fetching carnets:', error);
            throw new Error(`Error fetching carnets: ${error.message}`);
        }
    }

    static async fetchAlumnosPorProfesor(professorId) {
        try {
            console.log(Config.ApiIP + Config.ApiPort)
            const response = await axios.get(`http://${Config.ApiIP}:${Config.ApiPort}/AlumnesDeProfessor/${professorId}`);
            console.log("Respuesta: ", response.data)
            if (response.status !== 200) {
                throw new Error('Error fetching students for professor');
            }
            const data = response.data;
            return data.map(alumno => ({
                ID: alumno.ID,
                Nom: alumno.Nom,
                DNI: alumno.DNI,
                Adreca: alumno.Adreca,
                Telefon: alumno.Telefon,
                ProfessorID: alumno.ProfessorID,
                Contrasenya: alumno.Contrasenya
            }));
        } catch (error) {
            console.error('Error fetching students for professor:', error);
            throw new Error(`Error fetching students for professor: ${error.message}`);
        }
    }

    static async fetchPracticasPorAlumno(alumnoId) {
        try {
            // console.log('Fetching practicas for alumno:', alumnoId);
            const response = await axios.get(`http://${Config.ApiIP}:${Config.ApiPort}/Practica/Alumn/${alumnoId}`);
            const data = response.data;
            // Mapear los datos devueltos a un array de objetos
            const practicas = data.map(practica => ({
                id: practica.ID,
                alumneId: practica.AlumneID,
                data: practica.Data,
                estatHoraId: practica.EstatHoraID,
                horaFi: practica.HoraFi,
                horaInici: practica.HoraInici,
                km: practica.Km,
                professorId: practica.ProfessorID,
                ruta: practica.Ruta,
                vehicleId: practica.VehicleID
            }));
            // console.log('Practicas:', practicas);
            return practicas;
        } catch (error) {
            console.error('Error fetching practicas:', error);
            throw error;
        }
    }

    static async asignarProfesorAAlumno(alumnoId, profesorId) {
        try {
            // Verificar que se proporcionaron ambos IDs
            if (!alumnoId || !profesorId) {
                throw new Error("Se requiere el ID del alumno y del profesor");
            }
            // Realizar la solicitud para asignar el profesor al alumno
            const response = await axios.put(`http://${Config.ApiIP}:${Config.ApiPort}/Alumno/AsignarProfesor`, {
                alumno_id: alumnoId,
                profesor_id: profesorId
            });

            if (response.status !== 200) {
                throw new Error('Error asigning professor to student');
            }

            const data = response.data;
            return data.message;
        } catch (error) {
            console.error('Error assigning professor to student:', error);
            throw new Error(`Error assigning professor to student: ${error.message}`);
        }
    }

    static async fetchProfessorNameById(professorId) {
        try {
            const response = await axios.get(`http://${Config.ApiIP}:${Config.ApiPort}/Treballador/${professorId}`);
            if (response.status !== 200) {
                throw new Error('Error fetching professor by ID');
            }
            const data = response.data;
            const fullName = `${data.Nom} ${data.Cognom} ${data.SegonCognom}`;
            return fullName;
        } catch (error) {
            console.error('Error fetching professor by ID:', error);
            throw new Error(`Error fetching professor by ID: ${error.message}`);
        }
    }

    // Método para obtener todas las anotaciones de un alumno por su ID
    static async fetchAnotacionesPorAlumno(alumnoId) {
        try {
            const response = await axios.get(`http://${Config.ApiIP}:${Config.ApiPort}/Anotacio/Alumne/${alumnoId}`);
            if (response.status !== 200) {
                throw new Error('Error fetching annotations for student');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching annotations for student:', error);
            throw new Error(`Error fetching annotations for student: ${error.message}`);
        }
    }

    // Método para agregar una nueva anotación
    static async addNewAnotacion(anotacionData) {
        console.log('Adding new annotation:', anotacionData);
        try {
            const response = await axios.post(`http://${Config.ApiIP}:${Config.ApiPort}/Anotacio`, anotacionData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status !== 201) {
                throw new Error('Error adding new annotation');
            }
            return response.data;
        } catch (error) {
            console.error('Error adding new annotation:', error);
            throw new Error(`Error adding new annotation: ${error.message}`);
        }
    }
}

export default ApiHelper;
