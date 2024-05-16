class Config {
    constructor() {
        this.ProfessorID = "Treballador_1";
        this.ApiIP = "172.23.3.204";
        this.ApiPort = "8888";
        this.ApiPortMongo = "5010"
        this.Professor = ""
    }

    static getInstance() {
        if (!Config.instance) {
          Config.instance = new Config();
        }
        return Config.instance;
      }
    
}

export default Config.getInstance();