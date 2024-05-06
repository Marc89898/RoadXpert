class Config {
    constructor() {
        this.IDALUMNE = "Alumne_4";
        this.ProfessorID = "Treballador_1";
        this.ApiIP = "10.0.2.2";
        this.ApiPort = "8888";
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