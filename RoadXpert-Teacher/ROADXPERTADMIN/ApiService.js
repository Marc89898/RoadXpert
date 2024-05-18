import Config from "./configuracions"

class APIService {
    /*
    * Fetch to all events of Alumn
    */
    static async fetchEventsCalendar(idProfessor) {
      try {
        const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Practica/Professor/" + idProfessor;
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
    static async deleteEventCalendar(eventId) {
      try {
        const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Practica/" + eventId;
        const deleteResponse = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!deleteResponse.ok) {
          const errorResponseData = await deleteResponse.json();
          throw new Error('Failed to delete event. HTTP status code: ' + deleteResponse.status + '. Error details: ' + JSON.stringify(errorResponseData));
        }
        
        const deletedEventData = await deleteResponse.json();
        return deletedEventData;
      } catch (error) {
        console.error('Error deleting event:', error.message);
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
      console.log(response)
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
    /**
     * 
     * @returns object alumn
     */
    static async fetchAlumn(alumnID) {
      try {
        const url = "http://" + Config.ApiIP + ":" +Config.ApiPort + "/Alumne/" + alumnID
        const response = await fetch(url);
        let data = "";
        console.log(response)
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
    /**
    * Fetch All Professors
    */
    static async fetchAllProfessors() {
      try {
        const url = "http://" + Config.ApiIP + ":" +Config.ApiPort + "/Treballador"
        const response = await fetch(url);
        let data = "";
        console.log(response)
        if (response.status != 500 && response.status != 404) {
          data = await response.json();
          return data;
        } else {
          console.error("Error en la petición de professores: Status", response.status, response.statusText);
        }
      }catch(error) {
        console.error("Error en la peticion de todos los professores: " + error)
      }
    }
    
    static async postVehicle(vehicle) {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Vehicle";
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(vehicle)
        });
    
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to add professor. Status: ${response.status}, Response: ${errorData}`);
        }
    
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error adding professor:', error.message);
        throw error;
      }
    }

    static async postProfessor(newProfessorData) {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Treballador";
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProfessorData)
        });
    
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to add professor. Status: ${response.status}, Response: ${errorData}`);
        }
    
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error adding professor:', error.message);
        throw error;
      }
    }
    
    static async fetchAllRoles() {
      try {
        const url = "http://" + Config.ApiIP + ":" +Config.ApiPort + "/Rol"
        const response = await fetch(url);
        let data = "";
        console.log(response)
        if (response.status != 500 && response.status != 404) {
          data = await response.json();
          return data;
        } else {
          console.error("Error en la petición de Roles: Status", response.status, response.statusText);
        }
      }catch(error) {
        console.error("Error en la peticion de todos los Roles: " + error)
      }
    }

    static async postRole(newRoleData) {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Rol";
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRoleData)
        });
    
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to add role. Status: ${response.status}, Response: ${errorData}`);
        }
    
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error adding role:', error.message);
        throw error;
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
    static async postAlumn(newAlumnData) {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Alumne";
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAlumnData)
        });
    
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to add alumn. Status: ${response.status}, Response: ${errorData}`);
        }
    
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error adding alumn:', error.message);
        throw error;
      }
    }
    
    static async getAllCars() {
      try {
        const url = "http://" + Config.ApiIP + ":" +Config.ApiPort + "/Vehicle"
        const response = await fetch(url);
        let data = "";
        console.log(response)
        if (response.status != 500 && response.status != 404) {
          data = await response.json();
          return data;
        } else {
          console.error("Error en la petición de Roles: Status", response.status, response.statusText);
        }
      }catch(error) {
        console.error("Error en la peticion de todos los Roles: " + error)
      }
    }

  
  }
  
  export { APIService };
  