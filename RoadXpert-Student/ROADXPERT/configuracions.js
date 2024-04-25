class Config {
    constructor() {
        this.IDALUMNE = "Alumne_4";
        this.ProfesorID = "Treballador_1";
        this.ApiIP = "10.0.2.2";
        this.ApiPort = "8888";
        this.Alumne = {
          ID: "",
          Nom: "",
          DNI: "",
          Adreca: "",
          Telefon: "",
          Contrasenya: "",
          ProfessorID: ""
      };
    }

    static getInstance() {
        if (!Config.instance) {
          Config.instance = new Config();
        }
        return Config.instance;
      }
    guardarAlumne(alumn) {
      this.Alumne = alumn;
    }
    
}

export default Config.getInstance();