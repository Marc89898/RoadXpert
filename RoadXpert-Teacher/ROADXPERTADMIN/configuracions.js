class Config {
    constructor() {
        this.ApiIP = "10.0.2.2";
        this.ApiPort = "8888";
        this.ApiPortMongo = "5010"
        this.Professor = {
          ID: "Treballador_1",
          Nom: "defaultNom",
          Cognom: "defaultCognom",
          SegonCognom: "defaultSegonCognom",
          DNI: "defaultDNI",
          Adreca: "defaultAdreca",
          Sexe: "defaultSexe",
          CarnetConduirFront: "defaultCarnetConduirFront",
          CarnetConduirDarrera: "defaultCarnetConduirDarrera",
          HorariID: "defaultHorariID",
          Password: "defaultPassword"
        };
    }

    static getInstance() {
        if (!Config.instance) {
          Config.instance = new Config();
        }
        return Config.instance;
      }
    
}

export default Config.getInstance();