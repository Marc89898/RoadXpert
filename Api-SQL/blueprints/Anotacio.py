from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Anotacio_bp = Blueprint('Anotacio', __name__)

@Anotacio_bp.route("/Anotacio", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Anotacio")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Anotacio_dict = {}
                for idx, column in enumerate(result.keys()):
                    Anotacio_dict[column] = row[idx]
                autoescoles.append(Anotacio_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Anotacio_bp.route("/Anotacio/<string:Anotacio_id>", methods=['GET'])
def get_Anotacio_by_id(Anotacio_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Anotacio WHERE id = :id")
            result = conn.execute(query, {"id": Anotacio_id})
            Anotacio = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Anotacio[column] = row[idx]
            if Anotacio:
                return jsonify(Anotacio), 200
            else:
                return jsonify({"message": f"No Anotacio found with ID {Anotacio_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@Anotacio_bp.route("/Anotacio", methods=['POST'])
def post_new_Anotacio():
    """POST of a driving school"""
    data = request.json
    tipus = data.get('tipus')
    descripcio = data.get('descripcio')
    posicio = data.get('posicio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Anotacio (ID, tipus, descripcio, posicio) VALUES (:ID, :tipus, :descripcio, :posicio)")
            connection.execute(sql, {"ID": generate_uuid(), "tipus":tipus, "descripcio":descripcio, "posicio":posicio})
            connection.commit()
            return jsonify({"message": "Anotacio added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Anotacio_bp.route("/Anotacio/<string:Anotacio_id>", methods=['PUT'])
def update_Anotacio(Anotacio_id):
    """PUT to update a specific Anotacio by ID"""
    data = request.json
    nom = data.get('nom')
    tipus = data.get('tipus')
    descripcio = data.get('descripcio')
    posicio = data.get('posicio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Anotacio WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Anotacio_id})
            Anotacio = result_check.fetchone()
            if Anotacio:
                sql = text("UPDATE Anotacio SET nom = :nom, tipus = :tipus, descripcio = :descripcio, posicio = :posicio WHERE id = :id")
                connection.execute(sql, {"nom":nom, "tipus":tipus, "descripcio":descripcio, "posicio":posicio, "id":Anotacio_id})
                connection.commit()
                return jsonify({"message": f"Anotacio with ID {Anotacio_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Anotacio found with ID {Anotacio_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Anotacio_bp.route("/Anotacio/<string:Anotacio_id>", methods=['DELETE'])
def delete_Anotacio(Anotacio_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Anotacio WHERE id = :id")
            result = conn.execute(query, {"id": Anotacio_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Anotacio with ID {Anotacio_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Anotacio found with ID {Anotacio_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
