
class APIService {

    static async fetchEvents(idAlumne) {
        try {
          const response = await fetch(`http://localhost:8888/Practica/Alumn/${idAlumne}`);
          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching events:', error);
          throw error;
        }
      }
      
}
export default APIService;