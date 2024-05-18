import { APIService } from "../ApiService";

class DataAdapter {

  static adaptPracticaToAgenda(jsonData) {
    const adaptedData = {};
    jsonData.forEach(async (item) => {
      const date = new Date(item.Data).toISOString().split('T')[0];
      var fetchALUMN = await APIService.fetchAlumn(item.AlumneID)
      var EstatModificat = await APIService.fetchEstatDescription(item.EstatHoraID)
      const event = {
        id: item.ID,
        name: "Practica",
        horaInicial: item.HoraInici,
        horaFinal: item.HoraFi,
        Ruta: item.Ruta,
        Coche: item.VehicleID,
        Estat: EstatModificat.Nom,
        alumne: fetchALUMN.Nom
      };
      if (adaptedData[date]) {
        adaptedData[date].push(event);
      } else {
        adaptedData[date] = [event];
      }
    });
    return adaptedData;
  }
  static adaptDataDelete(jsonData) {
    const adaptedData = {};
    jsonData.forEach(async (item) => {
      const date = new Date(item.Data).toISOString().split('T')[0];
      var EstatModificat = await APIService.fetchEstatDescription(item.EstatHoraID)
      const event = {
        id: item.ID,
        name: "Practica",
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
      EstatHoraID: 'EstatHora_2',
      Data: jsonData.data
    };
  }

}
export { DataAdapter };
