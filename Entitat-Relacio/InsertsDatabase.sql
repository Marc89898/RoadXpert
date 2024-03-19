-- Inserts para la tabla Rol (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Rol (ID, Nom, Descripcio) 
    VALUES (NEWID(), 'Professor', 'Persona encarregada de donar les classes pràctiques i teòriques als alumnes.'),
        (NEWID(), 'Recepcionista', 'Persona encarregada de gestionar la recepció i atendre els clients.'),
        (NEWID(), 'Secretari/a', 'Persona encarregada de tasques administratives i de gestió de la documentació.'),
        (NEWID(), 'Director/a', 'Persona encarregada de dirigir i coordinar les activitats de l`autoescola.'),
        (NEWID(), 'Instructor/a', 'Persona encarregada d`impartir les classes pràctiques de conducció.'),
        (NEWID(), 'Formador/a', 'Persona encarregada de la formació teòrica dels alumnes.');

-- Inserts para la tabla Carnet (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Carnet (ID, Categoria, DataExpedicio, DataCaducitat, AutoritatExpedidora, Restriccions, NumCarnet, PaisExpedicio, NumExpedicio, ValidaPerCategories) 
    VALUES (NEWID(), 'B', '2023-01-01', '2028-01-01', 'Direcció General de Trànsit (DGT)', NULL, '123456', 'Espanya', '789', 'B'),
        (NEWID(), 'A', '2022-05-15', '2027-05-15', 'Direcció General de Trànsit (DGT)', NULL, '987654', 'Espanya', '321', 'A'),
        (NEWID(), 'AM', '2024-03-20', '2029-03-20', 'Direcció General de Trànsit (DGT)', 'Limitat a ciclomotors', '654321', 'Espanya', '987', 'A, AM'),
        (NEWID(), 'C1', '2023-08-10', '2028-08-10', 'Direcció General de Trànsit (DGT)', NULL, '456789', 'Espanya', '654', 'C1'),
        (NEWID(), 'B+E', '2022-11-30', '2027-11-30', 'Direcció General de Trànsit (DGT)', 'Limitat a vehicles autoritzats per al transport de mercaderies de fins a 3.500 kg.', '321987', 'Espanya', '123', 'B, B+E'),
        (NEWID(), 'D', '2024-02-25', '2029-02-25', 'Direcció General de Trànsit (DGT)', NULL, '789123', 'Espanya', '456', 'D');


-- Inserts para la tabla Alumne (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Alumne (ID, Nom, DNI, Adreca, Telefon) 
    VALUES (NEWID(), 'Jordi Sánchez', '12345678A', 'Carrer Major, 123', '612345678'),
        (NEWID(), 'Laura Martínez', '98765432B', 'Plaça del Sol, 45', '655432189'),
        (NEWID(), 'Marc Gómez', '45678901C', 'Avinguda Diagonal, 789', '698745632'),
        (NEWID(), 'Anna López', '32109876D', 'Carrer Gran, 56', '633210987');



-- Inserts para la tabla Anotacio (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Anotacio (Tipus, Descripcio, Posicio, ID) 
    VALUES ('Positiva', 'L`alumne ha mostrat un bon domini del vehicle durant la pràctica.', 'Interior', NEWID()),
        ('Neutra', 'Es fa necessari millorar l`observació dels senyals de trànsit.', 'Exterior', NEWID()),
        ('Negativa', 'S`han observat errors repetits en el control del volant.', 'Interior', NEWID()),
        ('Positiva', 'L`alumne ha realitzat una correcta maniobra de estacionament.', 'Exterior', NEWID());


-- Inserts para la tabla Vehicle (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Vehicle (Matricula, Marca, Model, AnyFabricacio, Tipus, Color) 
    VALUES 
        -- Ciclomotor
        ('1234ABC', 'Yamaha', 'Neo`s', 2020, 'Ciclomotor', 'Blanc'),
        -- Moto 125cc
        ('5678DEF', 'Honda', 'CBR125R', 2019, 'Moto 125cc', 'Vermell'),
        -- Camión
        ('9012GHI', 'Volvo', 'FH16', 2021, 'Camio', 'Blau'),
        -- Coche compacto
        ('3456JKL', 'Seat', 'Ibiza', 2020, 'Cotxe compacte', 'Gris'),
        -- Coche familiar
        ('7890MNO', 'Volkswagen', 'Golf Variant', 2018, 'Cotxe familiar', 'Negre');


-- Inserts para la tabla Horari (Autoescola) con UID generado automáticamente
INSERT INTO RoadXpertDatabase.dbo.Horari (UID, Nom, Descripcio) 
    VALUES (NEWID(), 'Intensiu', 'Horari intensiu amb classes concentrades en un període curt de temps.'),
        (NEWID(), 'Estiu', 'Horari especial durant els mesos d`estiu amb modificacions en els horaris habituals.'),
        (NEWID(), 'Matins', 'Horari concentrat en les hores del matí.'),
        (NEWID(), 'Tardes', 'Horari concentrat en les hores de la tarda.'),
        (NEWID(), 'Jornada completa', 'Horari amb cobertura de tota la jornada laboral, matí i tarda.');


-- Inserts para la tabla EstatHora (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.EstatHora (ID, Nom, Descripcio) 
    VALUES (NEWID(), 'Solicitada', 'Hora sol·licitada per l`alumne.'),
        (NEWID(), 'Confirmada', 'Hora confirmada pel professor o l`autoescola.'),
        (NEWID(), 'Realitzada', 'Hora realitzada, l`alumne va assistir.'),
        (NEWID(), 'Pendent de pagament', 'Hora pendent de pagament per part de l`alumne.'),
        (NEWID(), 'Pagada', 'Hora ja pagada per l`alumne.');



-- Inserts para la tabla Hora (Horarios)
-- Horario de Mañana
    INSERT INTO RoadXpertDatabase.dbo.Hora (ID, DiaSemana, HoraInici, HoraFi, HorariID)
    VALUES (NEWID(), 'Lunes', '09:00:00', '10:00:00', '1'),
        (NEWID(), 'Lunes', '10:00:00', '10:00:00', '1'),
        (NEWID(), 'Lunes', '11:00:00', '12:00:00', '1'),
        (NEWID(), 'Lunes', '12:00:00', '13:00:00', '1'),
        (NEWID(), 'Martes', '09:00:00', '10:00:00', '1'),
        (NEWID(), 'Martes', '10:00:00', '11:00:00', '1'),        
        (NEWID(), 'Martes', '11:00:00', '12:00:00', '1'),
        (NEWID(), 'Martes', '12:00:00', '13:00:00', '1'),
        (NEWID(), 'Miércoles', '09:00:00', '10:00:00', '1'),
        (NEWID(), 'Miércoles', '10:00:00', '11:00:00', '1'),
        (NEWID(), 'Miércoles', '11:00:00', '12:00:00', '1'),
        (NEWID(), 'Miércoles', '12:00:00', '13:00:00', '1'),
        (NEWID(), 'Jueves', '09:00:00', '10:00:00', '1'),
        (NEWID(), 'Jueves', '10:00:00', '11:00:00', '1'),
        (NEWID(), 'Jueves', '11:00:00', '12:00:00', '1'),
        (NEWID(), 'Jueves', '12:00:00', '13:00:00', '1'),
        (NEWID(), 'Viernes', '09:00:00', '10:00:00', '1'),
        (NEWID(), 'Viernes', '10:00:00', '11:00:00', '1'),
        (NEWID(), 'Viernes', '11:00:00', '12:00:00', '1'),
        (NEWID(), 'Viernes', '12:00:00', '13:00:00', '1');


-- Horario de Tarde
INSERT INTO RoadXpertDatabase.dbo.Hora (ID, DiaSemana, HoraInici, HoraFi, HorariID)
    VALUES (NEWID(), 'Lunes', '16:00:00', '17:00:00', '2'),
        (NEWID(), 'Lunes', '17:00:00', '18:00:00', '2'),
        (NEWID(), 'Lunes', '18:00:00', '19:00:00', '2'),
        (NEWID(), 'Lunes', '19:00:00', '20:00:00', '2'),
        (NEWID(), 'Martes', '16:00:00', '17:00:00', '2'),
        (NEWID(), 'Martes', '17:00:00', '18:00:00', '2'),
        (NEWID(), 'Martes', '18:00:00', '19:00:00', '2'),
        (NEWID(), 'Martes', '19:00:00', '20:00:00', '2'),
        (NEWID(), 'Miércoles', '16:00:00', '17:00:00', '2'),
        (NEWID(), 'Miércoles', '17:00:00', '18:00:00', '2'),
        (NEWID(), 'Miércoles', '18:00:00', '19:00:00', '2'),
        (NEWID(), 'Miércoles', '19:00:00', '20:00:00', '2'),
        (NEWID(), 'Jueves', '16:00:00', '17:00:00', '2'),
        (NEWID(), 'Jueves', '17:00:00', '18:00:00', '2'),
        (NEWID(), 'Jueves', '18:00:00', '19:00:00', '2'),
        (NEWID(), 'Jueves', '19:00:00', '20:00:00', '2'),
        (NEWID(), 'Viernes', '16:00:00', '17:00:00', '2'),
        (NEWID(), 'Viernes', '17:00:00', '18:00:00', '2'),
        (NEWID(), 'Viernes', '18:00:00', '19:00:00', '2'),
        (NEWID(), 'Viernes', '19:00:00', '20:00:00', '2');


INSERT INTO RoadXpertDatabase.dbo.Practica (AlumneID, Ruta, Km, HoraInici, HoraFi, ID, HoraID, VehicleID, EstatHoraID, [Data])
    VALUES ('14C83297-9F2D-4693-A1A1-667717F4847F', 'Ruta 1', 30.50, '08:01:20', '09:03:00', NEWID(), '003EDA14-4B4C-4BA8-B527-06F25D2C8799', '9012GHI', '3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', '2023-01-15'),
        ('4151D12A-0FF3-42DC-A6A0-32F211F93597', 'Ruta 2', 25.75, '10:00:10', '11:00:05', NEWID(), '00D404D4-DC0D-4739-943A-97518472D05C', '9012GHI', '3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', '2022-11-10'),
        ('77844111-E0AD-41A1-BC63-51A5EE79DDDF', 'Ruta 3', 20.25, '12:02:12', '13:02:02', NEWID(), '1F7486BF-0531-4C5C-ACD4-2EACCB531769', '9012GHI', '8007090B-0223-4AEF-8B07-A39EE567FB90', '2024-03-20'),
        ('ACD9AC7A-B52A-4A39-A77B-BD99034D460E', 'Ruta 4', 22.00, '08:03:51', '9:01:00', NEWID(), '8510FF56-7477-4771-9207-59688CDC9143', '9012GHI', '3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', '2022-08-05');


-- Inserts para la tabla Treballador (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Treballador (ID, Nom, Cognom, DNI, Adreca, Sexe, CarnetConduirFront, CarnetConduirDarrera, HorariID)
    VALUES 
        (NEWID(), 'Juan', 'Martínez', '12345678A', 'Calle Mayor, 123', 'M', 'Frontal', 'Darrera', '1C0D394D-32B7-420E-BF52-88E8CBB298A6'),
        (NEWID(), 'María', 'Gómez', '87654321B', 'Avenida Libertad, 45', 'F', 'Frontal', 'Darrera', '6A7DD292-4C29-441D-A06A-93D09B04AECA'),
        (NEWID(), 'Carlos', 'López', '98765432C', 'Plaza España, 8', 'M', 'Frontal', 'Darrera', '6A7DD292-4C29-441D-A06A-93D09B04AECA'),
        (NEWID(), 'Laura', 'Sánchez', '23456789D', 'Calle Alcalá, 67', 'F', 'Frontal', 'Darrera', '7CE68D96-5FFE-426D-A4EB-E744441AA8DA'),
        (NEWID(), 'David', 'Fernández', '34567890E', 'Paseo del Prado, 12', 'M', 'Frontal', 'Darrera', 'C1E535CB-5533-4CC7-B3BA-5AE4C040D95B'),
        (NEWID(), 'Ana', 'Pérez', '45678901F', 'Calle Gran Vía, 34', 'F', 'Frontal', 'Darrera', 'C1E535CB-5533-4CC7-B3BA-5AE4C040D95B');


-- Inserts para la tabla Matricula (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Matricula (AlumneID, CarnetID, DataInici, DataFi) 
    VALUES ('14C83297-9F2D-4693-A1A1-667717F4847F', 'B4A8E028-71C2-4B4A-B947-8F801CEFD112', '2023-01-15', '2023-12-15'),
        ('4151D12A-0FF3-42DC-A6A0-32F211F93597', '2690B51A-3B82-43B9-9108-82E5A1B73BE1', '2022-11-10', '2023-11-10'),
        ('77844111-E0AD-41A1-BC63-51A5EE79DDDF', '85F16BA9-4486-4523-9DF8-E33EA55FCDC6', '2024-03-20', '2024-09-20'),
        ('ACD9AC7A-B52A-4A39-A77B-BD99034D460E', '7628C3DA-EC4F-40BB-85CA-2A2EF0C0012A', '2022-08-05', '2023-08-05');




