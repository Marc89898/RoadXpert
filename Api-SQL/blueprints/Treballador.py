from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Treballador_bp = Blueprint('Treballador', __name__)

@Treballador_bp.route("/Treballador", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Treballador")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Treballador_dict = {}
                for idx, column in enumerate(result.keys()):
                    Treballador_dict[column] = row[idx]
                autoescoles.append(Treballador_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Treballador_bp.route("/Treballador/<string:Treballador_id>", methods=['GET'])
def get_Treballador_by_id(Treballador_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Treballador WHERE id = :id")
            result = conn.execute(query, {"id": Treballador_id})
            Treballador = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Treballador[column] = row[idx]
            if Treballador:
                return jsonify(Treballador), 200
            else:
                return jsonify({"message": f"No Treballador found with ID {Treballador_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Define la función para manejar la solicitud POST para agregar un nuevo trabajador
@Treballador_bp.route("/Treballador", methods=['POST'])
def post_new_Treballador():
    """POST of a driving school"""
    data = request.json
    nom = data.get('nom')
    cognom = data.get('cognom')
    segonCognom = data.get('segonCognom')
    dni = data.get('dni')
    adreca = data.get('adreca')
    sexe = data.get('sexe')
    carnetConduirFront = data.get('carnetConduirFront')
    carnetConduirDarrera = data.get('carnetConduirDarrera')
    horariID = data.get('horariID')
    password = data.get('password')  # Agrega la obtención de la contraseña desde los datos JSON
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Treballador (ID, nom, cognom, segonCognom, dni, adreca, sexe, carnetConduirFront, carnetConduirDarrera, horariID, Password) VALUES (:ID, :nom, :cognom, :segonCognom, :dni, :adreca, :sexe, :carnetConduirFront, :carnetConduirDarrera, :horariID, :password)")  # Agrega el parámetro de contraseña a la consulta SQL
            connection.execute(sql, {"ID": generate_uuid(), "nom":nom, "cognom":cognom, "segonCognom":segonCognom, "dni":dni, "adreca":adreca, "sexe":sexe, "carnetConduirFront":carnetConduirFront, "carnetConduirDarrera":carnetConduirDarrera, "horariID":horariID, "password": password})  # Pasa la contraseña como parte de los parámetros
            connection.commit()
            return jsonify({"message": "Treballador added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Treballador_bp.route("/Treballador/<string:Treballador_id>", methods=['PUT'])
def put_update_Treballador(Treballador_id):
    """PUT para actualizar un registro de Treballador por su ID"""
    data = request.json
    nom = data.get('Nom')
    cognom = data.get('Cognom')
    segonCognom = data.get('SegonCognom')
    dni = data.get('DNI')
    adreca = data.get('Adreca')
    sexe = data.get('Sexe')
    carnetConduirFrontal = data.get('CarnetConduirFront')
    carnetConduirDerrera = data.get('CarnetConduirDarrera')
    horariID = data.get('HorariID')
    password = data.get('Password')
    
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Treballador WHERE ID = :id")
            result_check = connection.execute(query_check, {"id": Treballador_id})
            Treballador = result_check.fetchone()
            if Treballador:
                sql = text("UPDATE Treballador SET Nom = :Nom, Cognom = :Cognom, SegonCognom = :SegonCognom, DNI = :DNI, Adreca = :Adreca, Sexe = :Sexe, CarnetConduirFront = :CarnetConduirFrontal, CarnetConduirDarrera = :CarnetConduirDerrera, HorariID = :HorariID, Password = :Password WHERE ID = :ID")
                connection.execute(sql, { "Nom": nom, "Cognom": cognom, "SegonCognom":segonCognom, "DNI":dni, "Adreca":adreca, "Sexe":sexe, "CarnetConduirFrontal":carnetConduirFrontal, "CarnetConduirDerrera":carnetConduirDerrera, "HorariID":horariID, "Password":password, "ID":Treballador_id })
                connection.commit()
                return jsonify({"message": f"Treballador with ID {Treballador_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Treballador found with ID {Treballador_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Treballador_bp.route("/Treballador/<string:Treballador_id>", methods=['DELETE'])
def delete_Treballador(Treballador_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Treballador WHERE ID = :ID")
            result = conn.execute(query, {"ID": Treballador_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Treballador with ID {Treballador_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Treballador found with ID {Treballador_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_TreballadorTeIncidencia(TreballadorTeIncidencia_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM TreballadorTeIncidencia WHERE id = :id")
            result = conn.execute(query, {"id": TreballadorTeIncidencia_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"TreballadorTeIncidencia with ID {TreballadorTeIncidencia_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No TreballadorTeIncidencia found with ID {TreballadorTeIncidencia_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500