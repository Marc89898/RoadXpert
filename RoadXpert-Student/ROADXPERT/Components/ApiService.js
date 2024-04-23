import Config from "../configuracions"

class APIService {
    /*
    * Fetch to all events of Alumn
    */
    static async fetchEventsCalendar(idAlumne) {
      try {
        const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Practica/Alumn/" + idAlumne;
        const response = await fetch(url);
        let data = "";
        if (response.status != 500 && response.status != 404) {
          data = await response.json();
        } else {
          console.error("Error en la petición de eventos: Status", response.status, response.statusText);
        }
        if (data == null) {
          console.error("La peticion no funciona correctamente comprueva la api i la base de datos")
        }
        return data;
      } catch (error) {
        console.error('Error fetching events:', error.message);
        throw error;
      }
    }
    /*
    * Fetch to modify and petition of delete from part of alumn
    */
    static async deleteEventCalendar(eventId, newEstatHoraID) {
      try {
        const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Practica/" + eventId;
        const currentDataResponse = await fetch(url);
        if (!currentDataResponse.ok) {
          throw new Error('Failed to fetch current event data. HTTP status code: ' + currentDataResponse.status);
        }
        const currentData = await currentDataResponse.json();
        
        const HoraIniciFormatted = currentData.HoraInici.replace('T', ' ').substring(0, 19);
        const HoraFiFormatted = currentData.HoraFi.replace('T', ' ').substring(0, 19);
        const DataFormatted = new Date(currentData.Data).toISOString().substring(0, 19);
    
        const updatedData = { 
          ...currentData, 
          EstatHoraID: newEstatHoraID,
          HoraInici: HoraIniciFormatted,
          HoraFi: HoraFiFormatted,
          Data: DataFormatted
        };
        
        const updateResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData) 
        });
        
        if (!updateResponse.ok) {
          const errorResponseData = await updateResponse.json();
          throw new Error('Failed to update event. HTTP status code: ' + updateResponse.status + '. Error details: ' + JSON.stringify(errorResponseData));
        }
        
        const updatedEventData = await updateResponse.json();
        return updatedEventData;
      } catch (error) {
        console.error('Error updating event:', error.message);
        throw error;
      }
    }
    /**
     * To add Event calendar in to database
     * @param {*} Event 
     */
    static async addEventCalendar(event) {
      console.log(event);
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Practica";
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        });
    
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to add event. Status: ${response.status}, Response: ${errorData}`);
        }
    
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error adding event:', error.message);
        throw error;
      }
    }
    /*
    * Fetch to see avialable hours of a day
    */
    static async fetchAvailableHours(professorID, day) {
      try {
        console.log("Professor: " + professorID)
        console.log("Dia: " + day)
        const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/horas_libres?professor_id=" + professorID + "&" + "fecha=" + day;
        const response = await fetch(url);
        let data = "";
    
        if (response.ok) {
          data = await response.json();
          const hours = data.map(item => item.HoraInici + " - " + item.HoraFi);
          console.log("Horas disponibles: " + hours);
          return hours;
        } else {
          const errorMessage = await response.text();
          console.error("Error en la petición de horas disponibles. Status:", response.status, "Mensaje:", errorMessage);
        }
      } catch (error) {
        console.error("Error en la petición de todas las horas disponibles:", error);
      }
    }
    
    /**
    * Fetch All Alumns
    */
    static async fetchAllAlumns() {
    try {
      const url = "http://" + Config.ApiIP + ":" +Config.ApiPort + "/Alumne"
      const response = await fetch(url);
      let data = "";
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de alumnos: Status", response.status, response.statusText);
      }
    }catch(error) {
      console.error("Error en la peticion de todos los alumnos" + error)
    }
    }
    static async fetchEstatDescription(EstatHoraID) {
      try {
        const url = "http://" + Config.ApiIP + ":" +Config.ApiPort + "/EstatHora/" + EstatHoraID
        const response = await fetch(url)
        let data = {}
        if (response.status != 500 && response.status != 404) {
          data = await response.json();
          return data;
        } else {
          console.error("Error en la petición: Status", response.status, response.statusText);
        }
      }catch(error) {
        console.error("Error en la peticion estado hora" + error)
      }
      

    }
  
  }
  
  export { APIService };
  