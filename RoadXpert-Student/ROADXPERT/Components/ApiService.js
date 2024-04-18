class APIService {
    /*
    * Fetch to all events of Alumn
    */
    static async fetchEventsCalendar(idAlumne) {
      try {
        const url = "http://10.0.2.2:8888/Practica/Alumn/" + idAlumne;
        const response = await fetch(url);
        let data = "";
        if (response.status != 500 && response.status != 404) {
          data = await response.json();
          console.log("Datos:", data);
        } else {
          console.error("Error en la petición: Status", response.status, response.statusText);
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
        const url = "http://10.0.2.2:8888/Practica/" + eventId;
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
      console.log(event)
      const url = "http://10.0.2.2:8888/Practica/";
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        });
    
        if (!response.ok) {
          throw new Error('Failed to add event');
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
    static async fetchAvailableHours(day) {
      const url = "http://10.0.2.2:8888/Practica/"  ;
    }

  /**
   * Fetch All Alumns
   */
  static async fetchAllAlumns() {
    try {
      const url = "http://10.0.2.2:8888/Alumne"
      const response = await fetch(url);
      let data = "";
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición: Status", response.status, response.statusText);
      }
    }catch(error) {
      console.error("Error en la peticion de todos los alumnos" + error)
    }
  }
  
  }
  
  export { APIService };
  