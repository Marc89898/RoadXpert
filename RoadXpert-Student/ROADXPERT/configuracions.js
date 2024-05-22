class Config {
  constructor() {
    this.ApiIP = "172.23.3.204";
    this.ApiPort = "8888";
    this.ApiPortMongo = "5010"
    this.Alumne = {
      ID: "Alumne_1",
      Nom: "Jordi Sánchez",
      DNI: "12345678A",
      Adreca: "Carrer Major, 123",
      Telefon: "612345678",
      Contrasenya: "",
      ProfessorID: "Treballador_1",
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