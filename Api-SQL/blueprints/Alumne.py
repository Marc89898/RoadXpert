from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Alumne_bp = Blueprint('Alumne', __name__)

@Alumne_bp.route("/Alumne", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT *, (SELECT COUNT(*) FROM Practica WHERE Practica.AlumneID = Alumne.ID) AS NumPracticas FROM Alumne")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Alumne_dict = {}
                for idx, column in enumerate(result.keys()):
                    Alumne_dict[column] = row[idx]
                autoescoles.append(Alumne_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Alumne_bp.route("/Alumne/<string:Alumne_id>", methods=['GET'])
def get_Alumne_by_id(Alumne_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Alumne WHERE id = :id")
            result = conn.execute(query, {"id": Alumne_id})
            Alumne = result.fetchone()
            
            if Alumne:
                Alumne_dict = {}
                for idx, column in enumerate(result.keys()):
                    Alumne_dict[column] = Alumne[idx]
                return jsonify(Alumne_dict), 200
            else:
                return jsonify({"message": f"No Alumne found with ID {Alumne_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Alumne_bp.route("/Alumne/<int:Alumne_id>", methods=['PUT'])
def update_Alumne(Alumne_id):
    """PUT to update a specific Alumne by ID"""
    data = request.json
    nom = data.get('nom')
    dni = data.get('dni')
    adreca = data.get('adreca')
    telefon = data.get('telefon')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Alumne WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Alumne_id})
            Alumne = result_check.fetchone()
            if Alumne:
                sql = text("UPDATE Alumne SET nom = :nom, dni = :dni, adreca = :adreca, telefon = :telefon WHERE id = :id")
                connection.execute(sql, nom=nom, dni=dni, adreca=adreca, telefon=telefon, id=Alumne_id)
                connection.commit()
                return jsonify({"message": f"Alumne with ID {Alumne_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Alumne found with ID {Alumne_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Alumne_bp.route("/Alumne", methods=['POST'])
def post_new_Alumne():
    """POST a new Alumne"""
    data = request.json
    nom = data.get('nom')
    dni = data.get('dni')
    adreca = data.get('adreca')
    telefon = data.get('telefon')
    contrasenya = data.get('contrasenya')
    professor_id = data.get('professorID') 

    # Verificar que todos los campos requeridos estén presentes
    if not nom or not dni or not adreca or not telefon or not contrasenya or not professor_id:
        return jsonify({"error": "Todos los campos son requeridos"}), 400

    try:
        with engine.connect() as connection:
            sql = text("""
                INSERT INTO Alumne (ID, Nom, DNI, Adreca, Telefon, Contrasenya, professorID)
                VALUES (:ID, :nom, :dni, :adreca, :telefon, :contrasenya, :professorID)
            """)
            connection.execute(sql, {
                "ID": generate_uuid(),
                "nom": nom,
                "dni": dni,
                "adreca": adreca,
                "telefon": telefon,
                "contrasenya": contrasenya,
                "professorID": professor_id 
            })
            connection.commit()
            return jsonify({"message": "Alumne added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Alumne_bp.route("/Alumne/<string:ID>", methods=['DELETE'])
def delete_Alumne(ID):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Alumne WHERE ID = :ID")
            result = conn.execute(query, {"ID": ID})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Alumne with ID {ID} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Alumne found with ID {ID}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Alumne_bp.route("/AlumnesDeProfessor/<string:professor_id>", methods=['GET'])
def get_alumnos_de_profesor(professor_id):
    """GET all the students of a specific teacher"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Alumne WHERE ProfessorID = :professor_id")
            result = conn.execute(query, {"professor_id": professor_id})
            alumnos_data = result.fetchall()  # Almacenar los resultados en una variable
            
            # Obtener los nombres de las columnas
            column_names = result.keys()
            
            # Convertir las tuplas en diccionarios
            alumnos = []
            for row in alumnos_data:
                alumno_dict = {}
                for idx, column_name in enumerate(column_names):
                    alumno_dict[column_name] = row[idx]
                alumnos.append(alumno_dict)
            
            if alumnos:
                return jsonify(alumnos), 200
            else:
                return jsonify({"message": f"No students found for professor with ID {professor_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Alumne_bp.route("/Alumne/Actualizar/<string:alumne_id>", methods=['PUT'])
def actualizar_alumno(alumne_id):
    """PUT para actualizar cualquier atributo de un alumno"""
    try:
        # Obtener los datos del cuerpo de la solicitud
        data = request.json

        # Verificar que los datos no estén vacíos
        if not data:
            return jsonify({"error": "No se proporcionaron datos para actualizar"}), 400

        # Verificar si el alumno existe en la base de datos
        with engine.connect() as conn:
            query_alumno = text("SELECT ID FROM Alumne WHERE ID = :alumne_id")
            result_alumno = conn.execute(query_alumno, {"alumne_id": alumne_id})
            alumno_existente = result_alumno.fetchone()

            if not alumno_existente:
                return jsonify({"error": f"No se encontró ningún alumno con el ID {alumne_id}"}), 404

            # Construir la consulta de actualización dinámicamente
            set_clause = ", ".join([f"{key} = :{key}" for key in data.keys()])
            query_update = text(f"UPDATE Alumne SET {set_clause} WHERE ID = :alumne_id")

            # Agregar el ID del alumno a los datos
            data['alumne_id'] = alumne_id

            # Ejecutar la actualización
            conn.execute(query_update, data)
            conn.commit()

        return jsonify({"message": f"Alumno {alumne_id} actualizado correctamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500