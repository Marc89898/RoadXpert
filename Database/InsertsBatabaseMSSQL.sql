-- Inserts para la tabla Alumne (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Alumne
    (ID, Nom, DNI, Adreca, Telefon)
VALUES
    ('Alumne_1', 'Jordi Sánchez', '12345678A', 'Carrer Major, 123', '612345678'),
    ('Alumne_2', 'Laura Martínez', '98765432B', 'Plaça del Sol, 45', '655432189'),
    ('Alumne_3', 'Marc Gómez', '45678901C', 'Avinguda Diagonal, 789', '698745632'),
    ('Alumne_4', 'Anna López', '32109876D', 'Carrer Gran, 56', '633210987');

-- Inserts para la tabla Anotacio (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Anotacio
    (Tipus, Descripcio, Posicio, ID)
VALUES
    ('Positiva', 'L`alumne ha mostrat un bon domini del vehicle durant la pràctica.', 'Interior', 'Anotacio_1'),
    ('Neutra', 'Es fa necessari millorar l`observació dels senyals de trànsit.', 'Exterior', 'Anotacio_2'),
    ('Negativa', 'S`han observat errors repetits en el control del volant.', 'Interior', 'Anotacio_3'),
    ('Positiva', 'L`alumne ha realitzat una correcta maniobra de estacionament.', 'Exterior', 'Anotacio_4');

-- Inserts para la tabla Carnet (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Carnet
    (ID, Categoria, DataExpedicio, DataCaducitat, AutoritatExpedidora, Restriccions, NumCarnet, PaisExpedicio, NumExpedicio, ValidaPerCategories)
VALUES
    ('Carnet_1', 'B', '2023-01-01', '2028-01-01', 'Direcció General de Trànsit (DGT)', NULL, '123456', 'Espanya', '789', 'B'),
    ('Carnet_2', 'A', '2022-05-15', '2027-05-15', 'Direcció General de Trànsit (DGT)', NULL, '987654', 'Espanya', '321', 'A'),
    ('Carnet_3', 'AM', '2024-03-20', '2029-03-20', 'Direcció General de Trànsit (DGT)', 'Limitat a ciclomotors', '654321', 'Espanya', '987', 'A, AM'),
    ('Carnet_4', 'C1', '2023-08-10', '2028-08-10', 'Direcció General de Trànsit (DGT)', NULL, '456789', 'Espanya', '654', 'C1'),
    ('Carnet_5', 'B+E', '2022-11-30', '2027-11-30', 'Direcció General de Trànsit (DGT)', 'Limitat a vehicles autoritzats per al transport de mercaderies de fins a 3.500 kg.', '321987', 'Espanya', '123', 'B, B+E'),
    ('Carnet_6', 'D', '2024-02-25', '2029-02-25', 'Direcció General de Trànsit (DGT)', NULL, '789123', 'Espanya', '456', 'D');

-- Inserts para la tabla EstatHora (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.EstatHora
    (ID, Nom, Descripcio)
VALUES
    ('EstatHora_1', 'Solicitada', 'Hora sol·licitada per l`alumne.'),
    ('EstatHora_2', 'Confirmada', 'Hora confirmada pel professor o l`autoescola.'),
    ('EstatHora_3', 'Realitzada', 'Hora realitzada, l`alumne va assistir.'),
    ('EstatHora_4', 'Pendent de pagament', 'Hora pendent de pagament per part de l`alumne.'),
    ('EstatHora_5', 'Pagada', 'Hora ja pagada per l`alumne.');

-- Inserts para la tabla Horari (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Horari
    (ID, Nom, Descripcio)
VALUES
    ('Horari_1', 'Intensiu', 'Horari intensiu amb classes concentrades en un període curt de temps.'),
    ('Horari_2', 'Estiu', 'Horari especial durant els mesos d`estiu amb modificacions en els horaris habituals.'),
    ('Horari_3', 'Matins', 'Horari concentrat en les hores del matí.'),
    ('Horari_4', 'Tardes', 'Horari concentrat en les hores de la tarda.'),
    ('Horari_5', 'Jornada completa', 'Horari amb cobertura de tota la jornada laboral, matí i tarda.');



-- Falten inserts de incidencia

-- Inserts para la tabla Rol (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Rol
    (ID, Nom, Descripcio)
VALUES
    ('Rol_1', 'Professor', 'Persona encarregada de donar les classes pràctiques i teòriques als alumnes.'),
    ('Rol_2', 'Recepcionista', 'Persona encarregada de gestionar la recepció i atendre els clients.'),
    ('Rol_3', 'Secretari/a', 'Persona encarregada de tasques administratives i de gestió de la documentació.'),
    ('Rol_4', 'Director/a', 'Persona encarregada de dirigir i coordinar les activitats de l`autoescola.'),
    ('Rol_5', 'Instructor/a', 'Persona encarregada d`impartir les classes pràctiques de conducció.'),
    ('Rol_6', 'Formador/a', 'Persona encarregada de la formació teòrica dels alumnes.');


-- Inserts para la tabla Vehicle (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Vehicle
    (Matricula, Marca, Model, AnyFabricacio, Tipus, Color)
VALUES
    ('1234ABC', 'Yamaha', 'Neo`s', 2020, 'Ciclomotor', 'Blanc'),
    ('5678DEF', 'Honda', 'CBR125R', 2019, 'Moto 125cc', 'Vermell'),
    ('9012GHI', 'Volvo', 'FH16', 2021, 'Camio', 'Blau'),
    ('3456JKL', 'Seat', 'Ibiza', 2020, 'Cotxe compacte', 'Gris'),
    ('7890MNO', 'Volkswagen', 'Golf Variant', 2018, 'Cotxe familiar', 'Negre');


-- Inserts para la tabla Alumne (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Alumne (ID, Nom, DNI, Adreca, Telefon)
VALUES 
    ('Alumne_1', 'Jordi Sánchez', '12345678A', 'Carrer Major, 123', '612345678'),
    ('Alumne_2', 'Laura Martínez', '98765432B', 'Plaça del Sol, 45', '655432189'),
    ('Alumne_3', 'Marc Gómez', '45678901C', 'Avinguda Diagonal, 789', '698745632'),
    ('Alumne_4', 'Anna López', '32109876D', 'Carrer Gran, 56', '633210987');



-- Inserts para la tabla Hora (Horarios)
-- Horario de Mañana
INSERT INTO RoadXpertDatabase.dbo.Hora
    (ID, DiaSemana, HoraInici, HoraFi, HorariID, DuracioPractica)
VALUES
    ('Hora_1', 'Lunes', '09:00:00', '13:00:00', 'Horari_1', '60'),
    ('Hora_2', 'Lunes', '16:00:00', '20:00:00', 'Horari_1', '60'),
    ('Hora_3', 'Martes', '09:00:00', '13:00:00', 'Horari_1', '60'),
    ('Hora_4', 'Martes', '16:00:00', '20:00:00', 'Horari_1', '60'),
    ('Hora_5', 'Miércoles', '09:00:00', '13:00:00', 'Horari_1', '60'),
    ('Hora_6', 'Miércoles', '16:00:00', '20:00:00', 'Horari_1', '60'),
    ('Hora_7', 'Jueves', '09:00:00', '13:00:00', 'Horari_1', '60'),
    ('Hora_8', 'Jueves', '16:00:00', '20:00:00', 'Horari_1', '60'),
    ('Hora_9', 'Viernes', '09:00:00', '13:00:00', 'Horari_1', '60'),
    ('Hora_10', 'Viernes', '16:00:00', '20:00:00', 'Horari_1', '60');


-- Inserts para la tabla Matricula (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Matricula
    (AlumneID, CarnetID, DataFi, DataInici)
VALUES
    ('Alumne_1', 'Carnet_1', '2028-01-01', '2023-01-01'),
    ('Alumne_2', 'Carnet_2', '2027-05-15', '2022-05-15'),
    ('Alumne_3', 'Carnet_3', '2029-03-20', '2024-03-20'),
    ('Alumne_4', 'Carnet_4', '2028-08-10', '2023-08-10');


-- Inserts para la tabla Treballador (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Treballador
    (ID, Nom, Cognom, SegonCognom, DNI, Adreca, Sexe, CarnetConduirFront, CarnetConduirDarrera, HorariID)
VALUES
    ('Treballador_1', 'Carles', 'García', 'Martínez', '12345678Z', 'Carrer del Sol, 15', 'Home', 'B', NULL, 'Horari_1'),
    ('Treballador_2', 'Eva', 'Ruíz', 'Fernández', '98765432Y', 'Avinguda de la Llum, 23', 'Dona', 'B', NULL, 'Horari_2'),
    ('Treballador_3', 'Marc', 'Serra', 'Gómez', '45678901X', 'Plaça de la Pau, 45', 'Home', 'B', NULL, 'Horari_3'),
    ('Treballador_4', 'Laia', 'Vidal', 'Puig', '32109876W', 'Carrer de la Mar, 67', 'Dona', 'B', NULL, 'Horari_4'),
    ('Treballador_5', 'Pau', 'López', 'Sanchez', '23456789V', 'Avinguda del Cel, 89', 'Home', 'B', NULL, 'Horari_5');


-- Inserts para la tabla Incidencia (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Incidencia
    (Codi, Tipus, Nom, Descripcio, HoraInici, HoraFi)
VALUES
    ('Incidencia_1', 'Avaria', 'Avaria del vehicle', 'El vehicle ha tingut una avaria durant la classe.', '2024-04-01 10:30:00', '2024-04-01 11:00:00'),
    ('Incidencia_2', 'Cancel·lació', 'Cancel·lació de classe', 'La classe ha estat cancel·lada per motius de salut.', '2024-04-02 15:00:00', '2024-04-02 16:00:00'),
    ('Incidencia_3', 'Retard', 'Retard del alumne', 'L`alumne ha arribat amb retard a la classe.', '2024-04-03 09:15:00', '2024-04-03 09:30:00'),
    ('Incidencia_4', 'Accident', 'Accident durant la classe', 'Hi ha hagut un accident durant la classe pràctica.', '2024-04-04 14:30:00', '2024-04-04 15:00:00'),
    ('Incidencia_5', 'Falta de material', 'Falta de material per la classe', 'No hi ha hagut material disponible per a la classe pràctica.', '2024-04-05 11:00:00', '2024-04-05 12:00:00');

-- Inserts para la tabla TreballadorTeIncidencia (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.TreballadorTeIncidencia
    (TreballadorID, IncidenciaID)
VALUES
    ('Treballador_1', 'Incidencia_1'),
    ('Treballador_2', 'Incidencia_2'),
    ('Treballador_3', 'Incidencia_3'),
    ('Treballador_4', 'Incidencia_4'),
    ('Treballador_5', 'Incidencia_5');


-- Inserts para la tabla Exercir (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Exercir
    (RolID, TreballadorID)
VALUES
    ('Rol_1', 'Treballador_1'), -- Rol: Professor, Treballador: Jordi Sánchez
    ('Rol_2', 'Treballador_2'), -- Rol: Recepcionista, Treballador: Laura Martínez
    ('Rol_3', 'Treballador_3'), -- Rol: Secretari/a, Treballador: Marc Gómez
    ('Rol_4', 'Treballador_4'), -- Rol: Director/a, Treballador: Anna López
    ('Rol_5', 'Treballador_5'), -- Rol: Instructor/a, Treballador: [Treballador sin especificar]
    ('Rol_6', 'Treballador_1'); -- Rol: Formador/a, Treballador: Jordi Sánchez (asignado nuevamente para otro rol)

-- Inserts para la tabla Practica (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Practica
    (AlumneID, Ruta, Km, HoraInici, HoraFi, ID, ProfesorID, VehicleID, EstatHoraID, [Data])
VALUES
    ('Alumne_1', 'Ruta 1', 25.50, '10:00:00', '11:30:00', 'Practica_1', 'Treballador_1', '1234ABC', 'EstatHora_3', '2024-04-01'),
    ('Alumne_2', 'Ruta 2', 30.75, '14:00:00', '15:45:00', 'Practica_2', 'Treballador_5', '5678DEF', 'EstatHora_3', '2024-04-02'),
    ('Alumne_3', 'Ruta 3', 20.00, '09:30:00', '11:00:00', 'Practica_3', 'Treballador_2', '3456JKL', 'EstatHora_3', '2024-04-03'),
    ('Alumne_4', 'Ruta 4', 15.25, '16:00:00', '17:15:00', 'Practica_4', 'Treballador_3', '7890MNO', 'EstatHora_3', '2024-04-04');

-- Inserts para la tabla Comet (Autoescola)
INSERT INTO RoadXpertDatabase.dbo.Comet
    (PracticaID, AnotacioID)
VALUES
    ('Practica_1', 'Anotacio_1'),
    ('Practica_2', 'Anotacio_2'),
    ('Practica_3', 'Anotacio_3'),
    ('Practica_4', 'Anotacio_4');





