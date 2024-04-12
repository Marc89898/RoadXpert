class DataAdapter {
    static adaptData(jsonData) {
      const adaptedData = {};
  
      jsonData.forEach((item) => {
        const date = new Date(item.Data).toISOString().split('T')[0];
        const event = {
          id: item.ID,
          name: "Practica",
          horaInicial: item.HoraInici,
          Ruta: item.Ruta,
          Coche: item.VehicleID,
          Estat: "En Process de confirmacio"
        };
  
        if (adaptedData[date]) {
          adaptedData[date].push(event);
        } else {
          adaptedData[date] = [event];
        }
      });
  
      return adaptedData;
    }
  }
  
  export { DataAdapter };
  