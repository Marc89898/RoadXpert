from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from sqlalchemy import text
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Incidencia_bp = Blueprint('Incidencia', __name__)

@Incidencia_bp.route("/Incidencia", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Incidencia")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Incidencia_dict = {}
                for idx, column in enumerate(result.keys()):
                    Incidencia_dict[column] = row[idx]
                autoescoles.append(Incidencia_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Incidencia_bp.route("/Incidencia/<string:Codi>", methods=['GET'])
def get_Incidencia_by_id(Codi):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Incidencia WHERE Codi = :Codi")
            result = conn.execute(query, {"Codi": Codi})
            Incidencia = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Incidencia[column] = row[idx]
            if Incidencia:
                return jsonify(Incidencia), 200
            else:
                return jsonify({"message": f"No Incidencia found with ID {Codi}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Incidencia_bp.route("/Incidencia", methods=['POST'])
def post_new_Incidencia():
    """POST of a driving school"""
    data = request.json
    tipus = data.get('tipus')
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    horaInici = data.get('horaInici')
    horaFi = data.get('horaFi')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Incidencia (Codi, tipus, nom, descripcio, horaInici, horaFi) VALUES (:Codi, :tipus, :nom, :descripcio, :horaInici, :horaFi)")
            connection.execute(sql, {"Codi":generate_uuid(), "tipus":tipus, "nom":nom, "descripcio":descripcio, "horaInici":horaInici, "horaFi":horaFi})
            connection.commit()
            return jsonify({"message": "Incidencia added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Incidencia_bp.route("/Incidencia/<string:Codi>", methods=['PUT'])
def put_update_Incidencia(Codi):
    """PUT para actualizar un registro de Incidencia por su ID"""
    data = request.json
    tipus = data.get('tipus')
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    horaInici = data.get('horaInici')
    horaFi = data.get('horaFi')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Incidencia WHERE Codi = :Codi")
            result_check = connection.execute(query_check, {"Codi": Codi})
            connection.commit()
            Incidencia = result_check.fetchone()
            if Incidencia:
                sql = text("UPDATE Incidencia SET tipus = :tipus, nom = :nom, descripcio = :descripcio, horaInici = :horaInici, horaFi = :horaFi WHERE Codi = :Codi")
                connection.execute(sql, {"tipus":tipus, "nom":nom, "descripcio":descripcio, "horaInici":horaInici, "horaFi":horaFi, "Codi":Codi})
                connection.commit()
                return jsonify({"message": f"Incidencia with ID {Codi} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Incidencia found with ID {Codi}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Incidencia_bp.route("/Incidencia/<string:Codi>", methods=['DELETE'])
def delete_Incidencia(Codi):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Incidencia WHERE Codi = :Codi")
            result = conn.execute(query, {"Codi": Codi})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Incidencia with ID {Codi} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Incidencia found with ID {Codi}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
