class DataAdapter {
    static adaptDataDelete(jsonData) {
      const adaptedData = {};
  
      jsonData.forEach((item) => {
        const date = new Date(item.Data).toISOString().split('T')[0];
        var EstatModificat;
        switch(item.EstatHoraID) {
          case "EstatHora_6":
            EstatModificat = "Pendent d'eliminacio"
            break;
          case "EstatHora_1":
            EstatModificat = "Practica Solicitada"
            break;
          case "EstatHora_2":
            EstatModificat = "Practica Confirmada"
            break;
          case "EstatHora_3":
            EstatModificat = "Practica ja Realitzada"
            break;
          default:
            EstatModificat = EstatHoraID
        }

        const event = {
          id: item.ID,
          name: "Practica",
          duration: "45m",
          horaInicial: item.HoraInici,
          Ruta: item.Ruta,
          Coche: item.VehicleID,
          Estat: EstatModificat
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
        AlumneID: '',
        Ruta: jsonData.Ruta || '',
        Km: 0, 
        HoraInici: jsonData.horaInicial || '',
        HoraFi: '',
        ID: jsonData.id || '',
        ProfesorID: '', 
        VehicleID: '',
        EstatHoraID: jsonData.Estat || 'Practica Solicitada', 
        Data: '' 
      };
    }
    
  }
  
  export { DataAdapter };
  