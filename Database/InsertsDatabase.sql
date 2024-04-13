-- Inserts para la tabla Rol (Autoescola)
INSERT INTO dbo.Rol (ID, Nom, Descripcio) 
    VALUES ('1C0D394D-32B7-420E-BF52-88E8CBB298A6', 'Professor', 'Persona encarregada de donar les classes pràctiques i teòriques als alumnes.'),
        ('2D62E36E-B14B-4743-9061-63E91E239429', 'Recepcionista', 'Persona encarregada de gestionar la recepció i atendre els clients.'),
        ('3E0CB6F7-F10C-41EC-B91B-01A199D99288', 'Secretari/a', 'Persona encarregada de tasques administratives i de gestió de la documentació.'),
        ('4A34A601-2A37-4E78-BC8A-0B6D002DB06C', 'Director/a', 'Persona encarregada de dirigir i coordinar les activitats de l`autoescola.'),
        ('54E6A158-568B-4F42-9910-28974F15D3F0', 'Instructor/a', 'Persona encarregada d`impartir les classes pràctiques de conducció.'),
        ('67F70B84-BF2C-46FD-A045-1842E2A0E51C', 'Formador/a', 'Persona encarregada de la formació teòrica dels alumnes.');

-- Inserts para la tabla Carnet (Autoescola)
INSERT INTO dbo.Carnet (ID, Categoria, DataExpedicio, DataCaducitat, AutoritatExpedidora, Restriccions, NumCarnet, PaisExpedicio, NumExpedicio, ValidaPerCategories) 
    VALUES ('731BF582-FECD-4D14-AAD3-90CA31C2FDD9', 'B', '2023-01-01', '2028-01-01', 'Direcció General de Trànsit (DGT)', NULL, '123456', 'Espanya', '789', 'B'),
        ('82EBE7D8-703A-4A44-B3E5-29E38E73DCEC', 'A', '2022-05-15', '2027-05-15', 'Direcció General de Trànsit (DGT)', NULL, '987654', 'Espanya', '321', 'A'),
        ('965E8212-C833-4E1B-8628-9AF3FD31C5C7', 'AM', '2024-03-20', '2029-03-20', 'Direcció General de Trànsit (DGT)', 'Limitat a ciclomotors', '654321', 'Espanya', '987', 'A, AM'),
        ('A1070F3F-9DA2-4C0B-8E72-EDCBB43D438F', 'C1', '2023-08-10', '2028-08-10', 'Direcció General de Trànsit (DGT)', NULL, '456789', 'Espanya', '654', 'C1'),
        ('B2B1F8F0-CCFD-465E-B41E-C0B1795476C0', 'B+E', '2022-11-30', '2027-11-30', 'Direcció General de Trànsit (DGT)', 'Limitat a vehicles autoritzats per al transport de mercaderies de fins a 3.500 kg.', '321987', 'Espanya', '123', 'B, B+E'),
        ('C3C9920B-5768-4FEA-BB57-51C330109F8E', 'D', '2024-02-25', '2029-02-25', 'Direcció General de Trànsit (DGT)', NULL, '789123', 'Espanya', '456', 'D');


-- Inserts para la tabla Alumne (Autoescola)
INSERT INTO dbo.Alumne (ID, Nom, DNI, Adreca, Telefon) 
    VALUES ('9E09D0C3-7025-4B9E-BB2F-0A5A74B4B064', 'Jordi Sánchez', '12345678A', 'Carrer Major, 123', '612345678'),
        ('AA37D8D8-B148-4488-A068-972E51B8756B', 'Laura Martínez', '98765432B', 'Plaça del Sol, 45', '655432189'),
        ('BFC7AB7E-19F1-4D4D-A1CE-F11DA18D2C1F', 'Marc Gómez', '45678901C', 'Avinguda Diagonal, 789', '698745632'),
        ('D9A21DBD-B687-46A5-835D-FF63B6A68F1A', 'Anna López', '32109876D', 'Carrer Gran, 56', '633210987');


-- Inserts para la tabla Anotacio (Autoescola)
INSERT INTO dbo.Anotacio (Tipus, Descripcio, Posicio, ID) 
    VALUES ('Positiva', 'L`alumne ha mostrat un bon domini del vehicle durant la pràctica.', 'Interior', '028C4F2E-1CE4-463E-A871-95B0ED7FA635'),
        ('Neutra', 'Es fa necessari millorar l`observació dels senyals de trànsit.', 'Exterior', '6D70295B-42BE-4D36-81EC-C24567F3FE9B'),
        ('Negativa', 'S`han observat errors repetits en el control del volant.', 'Interior', 'D8AAB2BC-E6C6-42D4-8C35-C6C9A9AD181A'),
        ('Positiva', 'L`alumne ha realitzat una correcta maniobra de estacionament.', 'Exterior', 'F1B96A54-FD8B-4A92-BF4A-682BAF8E89DE');


-- Inserts para la tabla Vehicle (Autoescola)
INSERT INTO dbo.Vehicle (Matricula, Marca, Model, AnyFabricacio, Tipus, Color) 
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
INSERT INTO dbo.Horari (ID, Nom, Descripcio) 
    VALUES ('1A1C03A0-F10F-4DDF-B1D9-F0A5B67A9CFF', 'Intensiu', 'Horari intensiu amb classes concentrades en un període curt de temps.'),
        ('24D0E500-FD51-456B-AD10-FA6AC5B2F8F9', 'Estiu', 'Horari especial durant els mesos d`estiu amb modificacions en els horaris habituals.'),
        ('36A95C02-365A-4999-961A-BFA847BBD8F2', 'Matins', 'Horari concentrat en les hores del matí.'),
        ('48EF8C77-9E07-4224-B5DA-3F4DDAB0A007', 'Tardes', 'Horari concentrat en les hores de la tarda.'),
        ('51E61157-37AA-49FD-973F-5B0A187E63B1', 'Jornada completa', 'Horari amb cobertura de tota la jornada laboral, matí i tarda.');


-- Inserts para la tabla EstatHora (Autoescola)
INSERT INTO dbo.EstatHora (ID, Nom, Descripcio) 
    VALUES ('1FBE2A28-0B51-476F-9DAB-6F6C5C1AD14C', 'Solicitada', 'Hora sol·licitada per l`alumne.'),
        ('2E8B9A25-99C8-497B-A09C-FEB1B145E023', 'Confirmada', 'Hora confirmada pel professor o l`autoescola.'),
        ('3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', 'Realitzada', 'Hora realitzada, l`alumne va assistir.'),
        ('5C6B734F-2F71-44E3-BE1D-05F073E7580B', 'Pendent de pagament', 'Hora pendent de pagament per part de l`alumne.'),
        ('8007090B-0223-4AEF-8B07-A39EE567FB90', 'Pagada', 'Hora ja pagada per l`alumne.');



-- Inserts para la tabla Hora (Horarios)
-- Horario de Mañana
    INSERT INTO dbo.Hora (ID, DiaSetmana, HoraInici, HoraFi, HorariID)
    VALUES ('003EDA14-4B4C-4BA8-B527-06F25D2C8799', 'Lunes', '09:00:00', '10:00:00', '1A1C03A0-F10F-4DDF-B1D9-F0A5B67A9CFF'),
        ('00D404D4-DC0D-4739-943A-97518472D05C', 'Martes', '10:00:00', '11:00:00', '1A1C03A0-F10F-4DDF-B1D9-F0A5B67A9CFF'),
        ('1F7486BF-0531-4C5C-ACD4-2EACCB531769', 'Miércoles', '11:00:00', '12:00:00', '1A1C03A0-F10F-4DDF-B1D9-F0A5B67A9CFF'),
        ('8510FF56-7477-4771-9207-59688CDC9143', 'Jueves', '12:00:00', '13:00:00', '1A1C03A0-F10F-4DDF-B1D9-F0A5B67A9CFF');


-- Horario de Tarde
INSERT INTO dbo.Hora (ID, DiaSetmana, HoraInici, HoraFi, HorariID)
    VALUES ('028C4F2E-1CE4-463E-A871-95B0ED7FA635', 'Lunes', '16:00:00', '17:00:00', '24D0E500-FD51-456B-AD10-FA6AC5B2F8F9'),
        ('6D70295B-42BE-4D36-81EC-C24567F3FE9B', 'Martes', '17:00:00', '18:00:00', '24D0E500-FD51-456B-AD10-FA6AC5B2F8F9'),
        ('D8AAB2BC-E6C6-42D4-8C35-C6C9A9AD181A', 'Miércoles', '18:00:00', '19:00:00', '24D0E500-FD51-456B-AD10-FA6AC5B2F8F9'),
        ('F1B96A54-FD8B-4A92-BF4A-682BAF8E89DE', 'Jueves', '19:00:00', '20:00:00', '24D0E500-FD51-456B-AD10-FA6AC5B2F8F9');


INSERT INTO dbo.Practica (AlumneID, Ruta, Km, HoraInici, HoraFi, ID, HoraID, VehicleID, EstatHoraID, [Data])
    VALUES ('9E09D0C3-7025-4B9E-BB2F-0A5A74B4B064', 'Ruta 1', 30.50, '08:01:20', '09:03:00', '0256B743-3DF9-45B3-9A97-B5384296B79F', '003EDA14-4B4C-4BA8-B527-06F25D2C8799', '9012GHI', '3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', '2023-01-15'),
        ('AA37D8D8-B148-4488-A068-972E51B8756B', 'Ruta 2', 25.75, '10:00:10', '11:00:05', '43146992-ED2F-4B24-84C1-4C3726F1B88D', '00D404D4-DC0D-4739-943A-97518472D05C', '9012GHI', '3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', '2022-11-10'),
        ('BFC7AB7E-19F1-4D4D-A1CE-F11DA18D2C1F', 'Ruta 3', 20.25, '12:02:12', '13:02:02', '8DE1E5C1-CE1E-43EC-A82B-60B78E82F2FC', '1F7486BF-0531-4C5C-ACD4-2EACCB531769', '9012GHI', '8007090B-0223-4AEF-8B07-A39EE567FB90', '2024-03-20'),
        ('D9A21DBD-B687-46A5-835D-FF63B6A68F1A', 'Ruta 4', 22.00, '08:03:51', '09:01:00', '07A0AD31-1295-4C0E-BC47-B77D3B65B6B0', '8510FF56-7477-4771-9207-59688CDC9143', '9012GHI', '3D7CC2F7-1B4B-48BD-9E69-1EA25510E4A7', '2022-08-05');


-- Inserts para la tabla Treballador (Autoescola)
INSERT INTO dbo.Treballador (ID, Nom, Cognom, DNI, Adreca, Sexe, CarnetConduirFront, CarnetConduirDarrera, HorariID)
    VALUES 
        ('FC13E3CE-10F5-4A81-9D61-DA3C74A5EDD5', 'Juan', 'Martínez', '12345678A', 'Calle Mayor, 123', 'M', 'Frontal', 'Darrera', '1C0D394D-32B7-420E-BF52-88E8CBB298A6'),
        ('33A9A254-7E09-4A41-B2A2-9D695C96BC56', 'María', 'Gómez', '87654321B', 'Avenida Libertad, 45', 'F', 'Frontal', 'Darrera', '6A7DD292-4C29-441D-A06A-93D09B04AECA'),
        ('D8F3B49F-6A89-4E14-8D30-174963525365', 'Carlos', 'López', '98765432C', 'Plaza España, 8', 'M', 'Frontal', 'Darrera', '6A7DD292-4C29-441D-A06A-93D09B04AECA'),
        ('A4B4B2E9-6AC2-4A45-B09A-3DA76D4B2F22', 'Laura', 'Sánchez', '23456789D', 'Calle Alcalá, 67', 'F', 'Frontal', 'Darrera', '7CE68D96-5FFE-426D-A4EB-E744441AA8DA'),
        ('3B6BFE92-17FC-4392-A7CB-1F1A573A9BB9', 'David', 'Fernández', '34567890E', 'Paseo del Prado, 12', 'M', 'Frontal', 'Darrera', 'C1E535CB-5533-4CC7-B3BA-5AE4C040D95B'),
        ('E0846E8A-EDDF-4423-BF6A-F19FFC551DB0', 'Ana', 'Pérez', '45678901F', 'Calle Gran Vía, 34', 'F', 'Frontal', 'Darrera', 'C1E535CB-5533-4CC7-B3BA-5AE4C040D95B');


-- Inserts para la tabla Matricula (Autoescola)
INSERT INTO dbo.Matricula (AlumneID, CarnetID, DataInici, DataFi, ID)
    VALUES 
        ('9E09D0C3-7025-4B9E-BB2F-0A5A74B4B064', '731BF582-FECD-4D14-AAD3-90CA31C2FDD9', '2023-01-01', '2028-01-01', 'A1A2F937-6437-4AC4-BED8-98E47A4F0734'),
        ('AA37D8D8-B148-4488-A068-972E51B8756B', '82EBE7D8-703A-4A44-B3E5-29E38E73DCEC', '2022-05-15', '2027-05-15', 'A2A3F938-7438-4AC5-BED9-98E47A4F0735'),
        ('BFC7AB7E-19F1-4D4D-A1CE-F11DA18D2C1F', '965E8212-C833-4E1B-8628-9AF3FD31C5C7', '2024-03-20', '2029-03-20', 'A3A4F939-8439-4AC6-BEDA-98E47A4F0736'),
        ('D9A21DBD-B687-46A5-835D-FF63B6A68F1A', 'A1070F3F-9DA2-4C0B-8E72-EDCBB43D438F', '2023-08-10', '2028-08-10', 'A4A5F940-943A-4AC7-BEDB-98E47A4F0737'),
        ('AA37D8D8-B148-4488-A068-972E51B8756B', 'B2B1F8F0-CCFD-465E-B41E-C0B1795476C0', '2022-11-30', '2027-11-30', 'A5A6F941-643B-4AC8-BEDC-98E47A4F0738'),
        ('BFC7AB7E-19F1-4D4D-A1CE-F11DA18D2C1F', 'C3C9920B-5768-4FEA-BB57-51C330109F8E', '2024-02-25', '2029-02-25', 'A6A7F942-743C-4AC9-BEDD-98E47A4F0739');
