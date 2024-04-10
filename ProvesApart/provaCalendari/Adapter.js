class DataAdapter {
    static adaptData(jsonData) {
      const adaptedData = {};
  
      jsonData.forEach((item) => {
        const date = new Date(item.Data).toISOString().split('T')[0];
        const event = {
          id: item.ID,
          descripcion: item.Ruta,
          hora: item.HoraInici,
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

export { DataAdapter }