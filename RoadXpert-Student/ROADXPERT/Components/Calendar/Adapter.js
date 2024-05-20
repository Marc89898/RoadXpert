import { APIService } from "../ApiService";
class DataAdapter {
    static async adaptDataDelete(jsonData) {
      const adaptedData = {};
  
      jsonData.forEach(async (item) => {
        const date = new Date(item.Data).toISOString().split('T')[0];
        var EstatModificat = await APIService.fetchEstatDescription(item.EstatHoraID)
        const event = {
          id: item.ID,
          name: "Practica",
          duration: "45m",
          horaInicial: item.HoraInici,
          horaFinal: item.HoraFi,
          Ruta: item.Ruta,
          Coche: item.VehicleID,
          Estat: EstatModificat.Nom
        };
  
        if (adaptedData[date]) {
          adaptedData[date].push(event);
        } else {
          adaptedData[date] = [event];
        }
      });
  
      return adaptedData;
    }
    static adaptJsonToDatabase(jsonData) {
      return {
        AlumneID: jsonData.AlumneID,
        Ruta: jsonData.Ruta || '',
        Km: 0, 
        HoraInici: jsonData.horaInicial || '',
        HoraFi: jsonData.horaFinal,
        ID: jsonData.id || '',
        ProfessorID: jsonData.ProfessorID, 
        VehicleID: jsonData.VehicleID,
        EstatHoraID: 'EstatHora_1', 
        Data: jsonData.data
      };
    }
    
  }
  
  export { DataAdapter };
  