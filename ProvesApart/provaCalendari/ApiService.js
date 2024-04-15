class APIService {
  /*
  * Fetch to all events of Alumn
  */
  static async fetchEvents(idAlumne) {
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
      throw new Error('Error fetching events. Please check your internet connection or API availability.');
    }
  }
  /*
  * Fetch to modify and petition of delete from part of alumn
  */
  static async deleteEvent(eventId, event) {
    try {
      const url = "http://10.0.2.2:8888/Practica/" + eventId;
      const response = await fetch(url, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting event:', error.message);
      throw new Error('Error deleting event. Please check your internet connection or API availability.');
    }
  }
  /*
  * Fetch to see avialable hours of a day
  */
  static async fetchAvailableHours(day) {

  }


}

export { APIService };
