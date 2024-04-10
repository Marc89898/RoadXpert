-- Alumne definition
USE RoadXpert;
-- Drop table

-- DROP TABLE Alumne;

CREATE TABLE Alumne (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DNI varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Adreca varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Telefon varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Alumne__3214EC27739B574A PRIMARY KEY (ID),
	CONSTRAINT UQ__Alumne__C035B8DDB7BEDBB5 UNIQUE (DNI)
);


-- Anotacio definition

-- Drop table

-- DROP TABLE Anotacio;

CREATE TABLE Anotacio (
	Tipus varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Posicio varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Anotacio__3214EC271AB3DEAE PRIMARY KEY (ID)
);
ALTER TABLE Anotacio WITH NOCHECK ADD CONSTRAINT CK__Anotacio__Tipus__6166761E CHECK ([Tipus]='Neutra' OR [Tipus]='Negativa' OR [Tipus]='Positiva');


-- BuildVersion definition

-- Drop table

-- DROP TABLE BuildVersion;

CREATE TABLE BuildVersion (
	SystemInformationID tinyint IDENTITY(1,1) NOT NULL,
	[Database Version] nvarchar(25) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	VersionDate datetime NOT NULL,
	ModifiedDate datetime DEFAULT getdate() NOT NULL,
	CONSTRAINT PK__BuildVer__35E58ECA5D9A54C0 PRIMARY KEY (SystemInformationID)
);


-- Carnet definition

-- Drop table

-- DROP TABLE Carnet;

CREATE TABLE Carnet (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Categoria varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DataExpedicio date NULL,
	DataCaducitat date NULL,
	AutoritatExpedidora varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Restriccions text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	NumCarnet varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	PaisExpedicio varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	NumExpedicio varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ValidaPerCategories varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Carnet__3214EC274F0190B9 PRIMARY KEY (ID),
	CONSTRAINT UQ__Carnet__1235B80F26F76741 UNIQUE (NumCarnet)
);


-- ErrorLog definition

-- Drop table

-- DROP TABLE ErrorLog;

CREATE TABLE ErrorLog (
	ErrorLogID int IDENTITY(1,1) NOT NULL,
	ErrorTime datetime DEFAULT getdate() NOT NULL,
	UserName sysname COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ErrorNumber int NOT NULL,
	ErrorSeverity int NULL,
	ErrorState int NULL,
	ErrorProcedure nvarchar(126) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ErrorLine int NULL,
	ErrorMessage nvarchar(4000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK_ErrorLog_ErrorLogID PRIMARY KEY (ErrorLogID)
);


-- EstatHora definition

-- Drop table

-- DROP TABLE EstatHora;

CREATE TABLE EstatHora (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__EstatHor__3214EC272F5FC43D PRIMARY KEY (ID)
);


-- HistorialPractica definition

-- Drop table

-- DROP TABLE HistorialPractica;

CREATE TABLE HistorialPractica (
	CodiPractica varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Data] datetime NULL,
	Accio varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


-- Horari definition

-- Drop table

-- DROP TABLE Horari;

CREATE TABLE Horari (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Horari__3214EC2777DA260B PRIMARY KEY (ID)
);


-- Incidencia definition

-- Drop table

-- DROP TABLE Incidencia;

CREATE TABLE Incidencia (
	Codi varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Tipus varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	HoraInici datetime NULL,
	HoraFi datetime NULL,
	CONSTRAINT PK__Incidenc__A25C5ABA8AAD64F6 PRIMARY KEY (Codi)
);


-- Rol definition

-- Drop table

-- DROP TABLE Rol;

CREATE TABLE Rol (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Rol__3214EC274002EFEE PRIMARY KEY (ID)
);


-- Vehicle definition

-- Drop table

-- DROP TABLE Vehicle;

CREATE TABLE Vehicle (
	Matricula varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Marca varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Model varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	AnyFabricacio int NULL,
	Tipus varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Color varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_Vehicle PRIMARY KEY (Matricula)
);


-- sysdiagrams definition

-- Drop table

-- DROP TABLE sysdiagrams;

CREATE TABLE sysdiagrams (
	name sysname COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	principal_id int NOT NULL,
	diagram_id int IDENTITY(1,1) NOT NULL,
	version int NULL,
	definition varbinary(MAX) NULL,
	CONSTRAINT PK__sysdiagr__C2B05B6195A1182D PRIMARY KEY (diagram_id),
	CONSTRAINT UK_principal_name UNIQUE (principal_id,name)
);


-- Hora definition

-- Drop table

-- DROP TABLE Hora;

CREATE TABLE Hora (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DiaSemana varchar(15) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	HoraInici time NOT NULL,
	HoraFi time NOT NULL,
	HorariID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Hora__3214EC27899D2B9D PRIMARY KEY (ID),
	CONSTRAINT FK__Hora__HorariID__531856C7 FOREIGN KEY (HorariID) REFERENCES Horari(ID)
);


-- Matricula definition

-- Drop table

-- DROP TABLE Matricula;

CREATE TABLE Matricula (
	AlumneID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CarnetID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DataFi date NULL,
	DataInici date NULL,
	CONSTRAINT PK__Matricul__85CB8C24D9712D52 PRIMARY KEY (AlumneID,CarnetID),
	CONSTRAINT FK__Matricula__Alumn__6442E2C9 FOREIGN KEY (AlumneID) REFERENCES Alumne(ID),
	CONSTRAINT FK__Matricula__Carne__65370702 FOREIGN KEY (CarnetID) REFERENCES Carnet(ID)
);


-- Practica definition

-- Drop table

-- DROP TABLE Practica;

CREATE TABLE Practica (
	AlumneID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Ruta varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Km decimal(10,2) NULL,
	HoraInici time(3) NULL,
	HoraFi time(3) NULL,
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	HoraID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	VehicleID varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	EstatHoraID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[Data] date NULL,
	CONSTRAINT PK__Practica__3214EC276EAFA119 PRIMARY KEY (ID),
	CONSTRAINT Practica_UN UNIQUE (AlumneID,HoraID,VehicleID,EstatHoraID),
	CONSTRAINT FK_Practica_Vehicle FOREIGN KEY (VehicleID) REFERENCES Vehicle(Matricula),
	CONSTRAINT FK__Practica__HoraID__0A688BB1 FOREIGN KEY (HoraID) REFERENCES Hora(ID),
	CONSTRAINT Practica_FK FOREIGN KEY (EstatHoraID) REFERENCES EstatHora(ID),
	CONSTRAINT Practica_FK_1 FOREIGN KEY (AlumneID) REFERENCES Alumne(ID)
);


-- Treballador definition

-- Drop table

-- DROP TABLE Treballador;

CREATE TABLE Treballador (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Cognom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	SegonCognom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	DNI varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Adreca varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Sexe varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CarnetConduirFront text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CarnetConduirDarrera text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	HorariID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Treballa__3214EC277B081D2F PRIMARY KEY (ID),
	CONSTRAINT UQ__Treballa__C035B8DD3BE6E9AC UNIQUE (DNI),
	CONSTRAINT FK__Treballad__Horar__03BB8E22 FOREIGN KEY (HorariID) REFERENCES Horari(ID)
);
ALTER TABLE Treballador WITH NOCHECK ADD CONSTRAINT CK__Treballado__Sexe__5F7E2DAC CHECK ([Sexe]='Otro' OR [Sexe]='F' OR [Sexe]='M');


-- TreballadorTeIncidencia definition

-- Drop table

-- DROP TABLE TreballadorTeIncidencia;

CREATE TABLE TreballadorTeIncidencia (
	TreballadorID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IncidenciaID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Treballa__0D7B89546A10A0A6 PRIMARY KEY (TreballadorID,IncidenciaID),
	CONSTRAINT FK__Treballad__Incid__7E02B4CC FOREIGN KEY (IncidenciaID) REFERENCES Incidencia(Codi),
	CONSTRAINT FK__Treballad__Treba__7D0E9093 FOREIGN KEY (TreballadorID) REFERENCES Treballador(ID)
);


-- Comet definition

-- Drop table

-- DROP TABLE Comet;

CREATE TABLE Comet (
	PracticaID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	AnotacioID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Comet__DAA1457E77FB9E77 PRIMARY KEY (PracticaID,AnotacioID),
	CONSTRAINT Comet_FK FOREIGN KEY (AnotacioID) REFERENCES Anotacio(ID),
	CONSTRAINT FK__Comet__PracticaI__7A3223E8 FOREIGN KEY (PracticaID) REFERENCES Practica(ID)
);


-- Exercir definition

-- Drop table

-- DROP TABLE Exercir;

CREATE TABLE Exercir (
	RolID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	TreballadorID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Exercir__6E10AB776DE56547 PRIMARY KEY (RolID,TreballadorID),
	CONSTRAINT FK__Exercir__RolID__00DF2177 FOREIGN KEY (RolID) REFERENCES Rol(ID),
	CONSTRAINT FK__Exercir__Treball__01D345B0 FOREIGN KEY (TreballadorID) REFERENCES Treballador(ID)
);
