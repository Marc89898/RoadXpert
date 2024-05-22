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

      if (response.status == 200) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        console.log(`Error fetching events: ${response.status} - ${response.statusText}. Details: ${errorText}`);
      }

      if (data == null) {
        console.log("La petición no funciona correctamente, comprueba la API y la base de datos");
      }

      return data;
    } catch (error) {
      console.log('Error fetching events:', error.message);
      console.log('Error details:', error);
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
      const errorText = await response.text();
      console.error(`Error adding events: ${response.status} - ${response.statusText}. Details: ${errorText}`);
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
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Alumne"
      const response = await fetch(url);
      let data = "";
      console.log(response)
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de todos los alumnos: Status", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error en la peticion de todos los alumnos" + error)
    }
  }
  /**
   * fetchAlum returns the object of the alumn with passing an alumnid
   * @returns object alumn
   */
  static async fetchAlumn(alumnID) {
    if (alumnID == null) {
      console.error("Error: alumnID es null");
      return null;
    }

    try {
      const url = `http://${Config.ApiIP}:${Config.ApiPort}/Alumne/${alumnID}`;
      const response = await fetch(url);
      let data = "";

      if (response.status !== 500 && response.status !== 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de un alumno: Status", response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error en la petición de todos los alumnos: " + error);
      return null;
    }
  }
  /**
   * Function fetchRoles
   */
  static async fetchRoleById(roleId) {
    try {
        const url = `http://${Config.ApiIP}:${Config.ApiPort}/Rol/${roleId}`;
        const response = await fetch(url);
        let data = "";

        if (response.status !== 500 && response.status !== 404) {
            data = await response.json();
            return data;
        } else {
            console.error("Error en la petición de un rol: Status", response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error en la petición de un rol:", error);
        throw error;
    }
}

  /**
   * Function updateRole
   */
  static async updateRole(updatedRole) {
    const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Rol/" + updatedRole.ID;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRole)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Failed to update role. Status: ${response.status}, Response: ${errorData}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error updating role:', error.message);
        throw error;
    }
}

  /**
   * Function to fetch a car with id
   */
  static async fetchCar(CarID) {
    if (CarID == null) {
      console.error("Error: aluCarID es null");
      return null;
    }
    try {
      const url = `http://${Config.ApiIP}:${Config.ApiPort}/Vehicle/${CarID}`;
      const response = await fetch(url);
      let data = "";

      if (response.status !== 500 && response.status !== 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de un coche: Status", response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error en la petición de todos los alumnos: " + error);
      return null;
    }
  }
  /**
* Delete professor
*/
  static async deleteProfessor(professorID) {
    try {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Treballador/" + professorID;
      const deleteResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!deleteResponse.ok) {
        const errorResponseData = await deleteResponse.json();
        throw new Error('Failed to delete professor. HTTP status code: ' + deleteResponse.status + '. Error details: ' + JSON.stringify(errorResponseData));
      }

      const deletedProfessorData = await deleteResponse.json();
      return deletedProfessorData;
    } catch (error) {
      console.error('Error deleting professor:', error.message);
      throw error;
    }
  }

  /**
   * To modify professor
   * @param {*} updatedProfessor 
   */
  static async putProfessor(updatedProfessor) {
    const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Treballador/" + updatedProfessor.ID;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfessor)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update professor. Status: ${response.status}, Response: ${errorData}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error updating professor:', error.message);
      throw error;
    }
  }


  /**
   * Function to modify Practica state
   */
  static async modifyEventEstat(eventId, newEstatHoraID) {
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
  * Fetch All Professors
  */
  static async fetchAllProfessors() {
    try {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Treballador"
      const response = await fetch(url);
      let data = "";
      console.log(response)
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de professores: Status", response.status, response.statusText);
      }
    } catch (error) {
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
  /**
   * Put alumn
   */
  static async putAlumn(updatedAlumn) {
    const url = `http://${Config.ApiIP}:${Config.ApiPort}/Alumne/Actualizar/${updatedAlumn.ID}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAlumn)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update alumn. Status: ${response.status}, Response: ${errorData}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error updating alumn:', error.message);
      throw error;
    }
  }

  static async fetchAllRoles() {
    try {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Rol"
      const response = await fetch(url);
      let data = "";
      console.log(response)
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de Roles: Status", response.status, response.statusText);
      }
    } catch (error) {
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

  static async deleteRole(roleId) {
    try {
        const url = `http://${Config.ApiIP}:${Config.ApiPort}/Rol/${roleId}`;
        const deleteResponse = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!deleteResponse.ok) {
            const errorResponseData = await deleteResponse.json();
            throw new Error(`Failed to delete role. HTTP status code: ${deleteResponse.status}. Error details: ${JSON.stringify(errorResponseData)}`);
        }

        const deletedRoleData = await deleteResponse.json();
        return deletedRoleData;
    } catch (error) {
        console.error('Error deleting role:', error.message);
        throw error;
    }
}

  static async fetchEstatDescription(EstatHoraID) {
    try {
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/EstatHora/" + EstatHoraID
      const response = await fetch(url)
      let data = {}
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición: Status", response.status, response.statusText);
      }
    } catch (error) {
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
      const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Vehicle"
      const response = await fetch(url);
      let data = "";
      console.log(response)
      if (response.status != 500 && response.status != 404) {
        data = await response.json();
        return data;
      } else {
        console.error("Error en la petición de Roles: Status", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error en la peticion de todos los Roles: " + error)
    }
  }
  static async deleteCar(carID) {
    try {
      const url = `http://${Config.ApiIP}:${Config.ApiPort}/Vehicle/${carID}`;
      const deleteResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!deleteResponse.ok) {
        const errorResponseData = await deleteResponse.json();
        throw new Error(`Failed to delete car. HTTP status code: ${deleteResponse.status}. Error details: ${JSON.stringify(errorResponseData)}`);
      }

      const deletedCarData = await deleteResponse.json();
      return deletedCarData;
    } catch (error) {
      console.error('Error deleting car:', error.message);
      throw error;
    }
  }

  static async postCar(car) {
    const url = "http://" + Config.ApiIP + ":" + Config.ApiPort + "/Vehicle";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to add car. Status: ${response.status}, Response: ${errorData}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error adding car:', error.message);
      throw error;
    }
  }

  static async putCar(updatedCar) {
    const url = `http://${Config.ApiIP}:${Config.ApiPort}/Vehicle/${updatedCar.ID}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCar)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update car. Status: ${response.status}, Response: ${errorData}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error updating car:', error.message);
      throw error;
    }
  }


  static async deleteAlumn(alumnID) {
    try {
      const url = `http://${Config.ApiIP}:${Config.ApiPort}/Alumne/${alumnID}`;
      const deleteResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!deleteResponse.ok) {
        const errorResponseData = await deleteResponse.json();
        throw new Error(`Failed to delete alumn. HTTP status code: ${deleteResponse.status}. Error details: ${JSON.stringify(errorResponseData)}`);
      }

      const deletedAlumnData = await deleteResponse.json();
      return deletedAlumnData;
    } catch (error) {
      console.error('Error deleting alumn:', error.message);
      throw error;
    }
  }
}

export { APIService };
