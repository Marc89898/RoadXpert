CREATE TABLE EstatHora (
    ID VARCHAR(36) PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Descripcio TEXT
);

CREATE TABLE Rol (
    ID VARCHAR(36) PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Descripcio TEXT
);

CREATE TABLE Incidencia (
    Codi VARCHAR(36) PRIMARY KEY,
    Tipus VARCHAR(50) NOT NULL,
    Nom VARCHAR(100) NOT NULL,
    Descripcio TEXT,
    HoraInici DATETIME,
    HoraFi DATETIME
);

CREATE TABLE Horari (
    ID VARCHAR(36) PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Descripcio TEXT
);

CREATE TABLE Hora (
    ID VARCHAR(36) PRIMARY KEY,
    DiaSemana VARCHAR(15) NOT NULL,
    HoraInici TIME NOT NULL,
    HoraFi TIME NOT NULL,
    HorariID VARCHAR(36),
    FOREIGN KEY (HorariID) REFERENCES Horari(ID)
);

CREATE TABLE Alumne (
    ID VARCHAR(36) PRIMARY KEY,
    Nom VARCHAR(100) NOT NULL,
    DNI VARCHAR(20) UNIQUE NOT NULL,
    Adreca VARCHAR(255),
    Telefon VARCHAR(20)
);

CREATE TABLE Carnet (
    ID VARCHAR(36) PRIMARY KEY,
    Categoria VARCHAR(10) NOT NULL,
    DataExpedicio DATE,
    DataCaducitat DATE,
    AutoritatExpedidora VARCHAR(100),
    Restriccions TEXT,
    NumCarnet VARCHAR(50) UNIQUE,
    PaisExpedicio VARCHAR(50),
    NumExpedicio VARCHAR(50),
    ValidaPerCategories VARCHAR(100)
);

CREATE TABLE HistorialPractica (
    CodiPractica VARCHAR(36),
    Data DATETIME,
    Accio VARCHAR(50) NOT NULL,
    Descripcio TEXT
);

CREATE TABLE Automovil (
    Matricula VARCHAR(20) PRIMARY KEY,
    Marca VARCHAR(50) NOT NULL,
    Model VARCHAR(50),
    AnyFabricacio  INT
);

CREATE TABLE Treballador (
    ID VARCHAR(36) PRIMARY KEY,
    Nom VARCHAR(100) NOT NULL,
    Cognom VARCHAR(100),
    SegonCognom VARCHAR(100),
    DNI VARCHAR(20) UNIQUE NOT NULL,
    Adreca VARCHAR(255),
    Sexe VARCHAR(10) CHECK (Sexe IN ('M', 'F', 'Otro')),
    CarnetConduirFront TEXT,
    CarnetConduirDarrera TEXT,
    Rol VARCHAR(50)
);

CREATE TABLE Anotacio (

    Tipus VARCHAR(50)  CHECK (Tipus IN ('Positiva', 'Negativa', 'Neutra')),
    Descripcio TEXT NOT NULL,
    Posicio VARCHAR(255)
);

CREATE TABLE Matricula (
    AlumneID VARCHAR(36),
    CarnetID VARCHAR(36),
    Ronda INT,
    PRIMARY KEY (AlumneID, CarnetID),
    FOREIGN KEY (AlumneID) REFERENCES Alumne(ID),
    FOREIGN KEY (CarnetID) REFERENCES Carnet(ID)
);

CREATE TABLE Practica (
    TreballadorID VARCHAR(36),
    AlumneID VARCHAR(36),
    CotxeID VARCHAR(20),
    Ruta VARCHAR(255),
    Km DECIMAL(10,2),
    DataInici DATETIME,
    DataFi DATETIME,
    Pagat TINYINT CHECK (Pagat IN (0, 1)),
    FOREIGN KEY (TreballadorID) REFERENCES Treballador(ID),
    FOREIGN KEY (AlumneID) REFERENCES Alumne(ID),
    FOREIGN KEY (CotxeID) REFERENCES Automovil(Matricula),
);

CREATE TABLE Comet (
    PracticaID VARCHAR(36),
    AnotacioID VARCHAR(36),
    PRIMARY KEY (PracticaID, AnotacioID),
    FOREIGN KEY (PracticaID) REFERENCES Practica(ID),
);

CREATE TABLE Te (
    TreballadorID VARCHAR(36),
    IncidenciaID VARCHAR(36),
    PRIMARY KEY (TreballadorID, IncidenciaID),
    FOREIGN KEY (TreballadorID) REFERENCES Treballador(ID),
    FOREIGN KEY (IncidenciaID) REFERENCES Incidencia(Codi)
);

CREATE TABLE Exercir (
    RolID VARCHAR(36),
    TreballadorID VARCHAR(36),
    PRIMARY KEY (RolID, TreballadorID),
    FOREIGN KEY (RolID) REFERENCES Rol(ID),
    FOREIGN KEY (TreballadorID) REFERENCES Treballador(ID)
);
