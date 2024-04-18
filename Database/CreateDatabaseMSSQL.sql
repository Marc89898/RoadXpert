-- DROP SCHEMA dbo;

-- CREATE SCHEMA dbo;
-- RoadXpertDatabase.dbo.Alumne definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Alumne;

CREATE TABLE RoadXpertDatabase.dbo.Alumne (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DNI varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Adreca varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Telefon varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Alumne__3214EC27739B574A PRIMARY KEY (ID),
	CONSTRAINT UQ__Alumne__C035B8DDB7BEDBB5 UNIQUE (DNI)
);


-- RoadXpertDatabase.dbo.Anotacio definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Anotacio;

CREATE TABLE RoadXpertDatabase.dbo.Anotacio (
	Tipus varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Posicio varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Anotacio__3214EC271AB3DEAE PRIMARY KEY (ID)
);


-- RoadXpertDatabase.dbo.BuildVersion definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.BuildVersion;

CREATE TABLE RoadXpertDatabase.dbo.BuildVersion (
	SystemInformationID tinyint NOT NULL,
	[Database Version] nvarchar(25) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	VersionDate datetime NOT NULL,
	ModifiedDate datetime DEFAULT getdate() NOT NULL,
	CONSTRAINT PK__BuildVer__35E58ECA5D9A54C0 PRIMARY KEY (SystemInformationID)
);


-- RoadXpertDatabase.dbo.Carnet definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Carnet;

CREATE TABLE RoadXpertDatabase.dbo.Carnet (
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


-- RoadXpertDatabase.dbo.ErrorLog definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.ErrorLog;

CREATE TABLE RoadXpertDatabase.dbo.ErrorLog (
	ErrorLogID int NOT NULL,
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


-- RoadXpertDatabase.dbo.EstatHora definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.EstatHora;

CREATE TABLE RoadXpertDatabase.dbo.EstatHora (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__EstatHor__3214EC272F5FC43D PRIMARY KEY (ID)
);


-- RoadXpertDatabase.dbo.HistorialPractica definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.HistorialPractica;

CREATE TABLE RoadXpertDatabase.dbo.HistorialPractica (
	CodiPractica varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Data] datetime NULL,
	Accio varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


-- RoadXpertDatabase.dbo.Horari definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Horari;

CREATE TABLE RoadXpertDatabase.dbo.Horari (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Horari__3214EC2777DA260B PRIMARY KEY (ID)
);


-- RoadXpertDatabase.dbo.Incidencia definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Incidencia;

CREATE TABLE RoadXpertDatabase.dbo.Incidencia (
	Codi varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Tipus varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	HoraInici datetime NULL,
	HoraFi datetime NULL,
	CONSTRAINT PK__Incidenc__A25C5ABA8AAD64F6 PRIMARY KEY (Codi)
);


-- RoadXpertDatabase.dbo.Rol definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Rol;

CREATE TABLE RoadXpertDatabase.dbo.Rol (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Descripcio text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Rol__3214EC274002EFEE PRIMARY KEY (ID)
);


-- RoadXpertDatabase.dbo.Vehicle definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Vehicle;

CREATE TABLE RoadXpertDatabase.dbo.Vehicle (
	Matricula varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Marca varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Model varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	AnyFabricacio int NULL,
	Tipus varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Color varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_Vehicle PRIMARY KEY (Matricula)
);


-- RoadXpertDatabase.dbo.sysdiagrams definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.sysdiagrams;

CREATE TABLE RoadXpertDatabase.dbo.sysdiagrams (
	name sysname COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	principal_id int NOT NULL,
	diagram_id int NOT NULL,
	version int NULL,
	definition varbinary(MAX) NULL,
	CONSTRAINT PK__sysdiagr__C2B05B6195A1182D PRIMARY KEY (diagram_id),
	CONSTRAINT UK_principal_name UNIQUE (principal_id,name)
);


-- RoadXpertDatabase.dbo.Alumne definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Alumne;

CREATE TABLE RoadXpertDatabase.dbo.Alumne (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Nom varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DNI varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Adreca varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Telefon varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Alumne__3214EC27739B574A PRIMARY KEY (ID),
	CONSTRAINT UQ__Alumne__C035B8DDB7BEDBB5 UNIQUE (DNI)
);


-- RoadXpertDatabase.dbo.Hora definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Hora;

CREATE TABLE RoadXpertDatabase.dbo.Hora (
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DiaSetmana varchar(15) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	HoraInici time NOT NULL,
	HoraFi time NOT NULL,
	HorariID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Hora__3214EC27899D2B9D PRIMARY KEY (ID),
	CONSTRAINT FK__Hora__HorariID__531856C7 FOREIGN KEY (HorariID) REFERENCES RoadXpertDatabase.dbo.Horari(ID)
);


-- RoadXpertDatabase.dbo.Matricula definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Matricula;

CREATE TABLE RoadXpertDatabase.dbo.Matricula (
	AlumneID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CarnetID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DataFi date NULL,
	DataInici date NULL,
	CONSTRAINT PK__Matricul__85CB8C24D9712D52 PRIMARY KEY (AlumneID,CarnetID),
	CONSTRAINT FK__Matricula__Alumn__6442E2C9 FOREIGN KEY (AlumneID) REFERENCES RoadXpertDatabase.dbo.Alumne(ID),
	CONSTRAINT FK__Matricula__Carne__65370702 FOREIGN KEY (CarnetID) REFERENCES RoadXpertDatabase.dbo.Carnet(ID)
);


-- RoadXpertDatabase.dbo.Treballador definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Treballador;

CREATE TABLE RoadXpertDatabase.dbo.Treballador (
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
	CONSTRAINT FK__Treballad__Horar__03BB8E22 FOREIGN KEY (HorariID) REFERENCES RoadXpertDatabase.dbo.Horari(ID)
);


-- RoadXpertDatabase.dbo.TreballadorTeIncidencia definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.TreballadorTeIncidencia;

CREATE TABLE RoadXpertDatabase.dbo.TreballadorTeIncidencia (
	TreballadorID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IncidenciaID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Treballa__0D7B89546A10A0A6 PRIMARY KEY (TreballadorID,IncidenciaID),
	CONSTRAINT FK__Treballad__Incid__7E02B4CC FOREIGN KEY (IncidenciaID) REFERENCES RoadXpertDatabase.dbo.Incidencia(Codi),
	CONSTRAINT FK__Treballad__Treba__7D0E9093 FOREIGN KEY (TreballadorID) REFERENCES RoadXpertDatabase.dbo.Treballador(ID)
);


-- RoadXpertDatabase.dbo.Exercir definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Exercir;

CREATE TABLE RoadXpertDatabase.dbo.Exercir (
	RolID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	TreballadorID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Exercir__6E10AB776DE56547 PRIMARY KEY (RolID,TreballadorID),
	CONSTRAINT FK__Exercir__RolID__00DF2177 FOREIGN KEY (RolID) REFERENCES RoadXpertDatabase.dbo.Rol(ID),
	CONSTRAINT FK__Exercir__Treball__01D345B0 FOREIGN KEY (TreballadorID) REFERENCES RoadXpertDatabase.dbo.Treballador(ID)
);


-- RoadXpertDatabase.dbo.Practica definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Practica;

CREATE TABLE RoadXpertDatabase.dbo.Practica (
	AlumneID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Ruta varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Km decimal(10,2) NULL,
	HoraInici time(3) NULL,
	HoraFi time(3) NULL,
	ID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ProfesorID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	VehicleID varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	EstatHoraID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[Data] date NULL,
	CONSTRAINT Practica_PK PRIMARY KEY (ID),
	CONSTRAINT FK_Practica_Vehicle FOREIGN KEY (VehicleID) REFERENCES RoadXpertDatabase.dbo.Vehicle(Matricula),
	CONSTRAINT Practica_FK FOREIGN KEY (EstatHoraID) REFERENCES RoadXpertDatabase.dbo.EstatHora(ID),
	CONSTRAINT Practica_FK_1 FOREIGN KEY (AlumneID) REFERENCES RoadXpertDatabase.dbo.Alumne(ID),
	CONSTRAINT Practica_FK_profesorID FOREIGN KEY (ProfesorID) REFERENCES RoadXpertDatabase.dbo.Treballador(ID)
);


-- RoadXpertDatabase.dbo.Comet definition

-- Drop table

-- DROP TABLE RoadXpertDatabase.dbo.Comet;

CREATE TABLE RoadXpertDatabase.dbo.Comet (
	PracticaID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	AnotacioID varchar(36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Comet__DAA1457E77FB9E77 PRIMARY KEY (PracticaID,AnotacioID),
	CONSTRAINT Comet_FK FOREIGN KEY (AnotacioID) REFERENCES RoadXpertDatabase.dbo.Anotacio(ID),
	CONSTRAINT Comet__FK__PracticaID FOREIGN KEY (PracticaID) REFERENCES RoadXpertDatabase.dbo.Practica(ID)
);

ALTER TABLE RoadXpertDatabase.dbo.Hora ADD DuracioPractica numeric(38,0) NULL;
ALTER TABLE RoadXpertDatabase.dbo.Alumne ADD Contrasenya varchar(50) NULL;
ALTER TABLE RoadXpertDatabase.dbo.Alumne ADD ProfessorID varchar(36) NULL;
ALTER TABLE RoadXpertDatabase.dbo.Alumne ADD CONSTRAINT Alumne_FK FOREIGN KEY (ProfessorID) REFERENCES RoadXpertDatabase.dbo.Treballador(ID);
ALTER TABLE RoadXpertDatabase.dbo.Practica ALTER COLUMN VehicleID varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL;
