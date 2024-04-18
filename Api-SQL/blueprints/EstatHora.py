from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
EstatHora_bp = Blueprint('EstatHora', __name__)

@EstatHora_bp.route("/EstatHora", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM EstatHora")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                EstatHora_dict = {}
                for idx, column in enumerate(result.keys()):
                    EstatHora_dict[column] = row[idx]
                autoescoles.append(EstatHora_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@EstatHora_bp.route("/EstatHora/<string:EstatHora_id>", methods=['GET'])
def get_EstatHora_by_id(EstatHora_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM EstatHora WHERE id = :id")
            result = conn.execute(query, {"id": EstatHora_id})
            EstatHora = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    EstatHora[column] = row[idx]
            if EstatHora:
                return jsonify(EstatHora), 200
            else:
                return jsonify({"message": f"No EstatHora found with ID {EstatHora_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@EstatHora_bp.route("/EstatHora", methods=['POST'])
def post_new_EstatHora():
    """POST of a driving school"""
    data = request.json
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO EstatHora (ID, nom, descripcio) VALUES (:ID, :nom, :descripcio)")
            connection.execute(sql, {"ID":generate_uuid(), "nom":nom, "descripcio":descripcio})
            connection.commit()
            return jsonify({"message": "EstatHora added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@EstatHora_bp.route("/EstatHora/<string:EstatHora_id>", methods=['DELETE'])
def delete_EstatHora(EstatHora_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM EstatHora WHERE id = :id")
            result = conn.execute(query, {"id": EstatHora_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"EstatHora with ID {EstatHora_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No EstatHora found with ID {EstatHora_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@EstatHora_bp.route("/EstatHora/<string:EstatHora_id>", methods=['PUT'])
def update_EstatHora(EstatHora_id):
    """PUT para actualizar un EstatHora específico por ID"""
    data = request.json
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM EstatHora WHERE ID = :ID")
            result_check = connection.execute(query_check, {"ID": EstatHora_id})
            EstatHora = result_check.fetchone()
            if EstatHora:
                sql = text("UPDATE EstatHora SET nom = :nom, descripcio = :descripcio WHERE ID = :ID")
                connection.execute(sql, {"nom":nom, "descripcio":descripcio, "ID":EstatHora_id})
                connection.commit()
                return jsonify({"message": f"EstatHora with ID {EstatHora_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No EstatHora found with ID {EstatHora_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
