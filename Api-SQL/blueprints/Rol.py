from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Rol_bp = Blueprint('Rol', __name__)

@Rol_bp.route("/Rol", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Rol")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Rol_dict = {}
                for idx, column in enumerate(result.keys()):
                    Rol_dict[column] = row[idx]
                autoescoles.append(Rol_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Rol_bp.route("/Rol/<string:Rol_id>", methods=['GET'])
def get_Rol_by_id(Rol_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Rol WHERE id = :id")
            result = conn.execute(query, {"id": Rol_id})
            Rol = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Rol[column] = row[idx]
            if Rol:
                return jsonify(Rol), 200
            else:
                return jsonify({"message": f"No Rol found with ID {Rol_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Rol_bp.route("/Rol", methods=['POST'])
def post_new_Rol():
    """POST of a driving school"""
    data = request.json
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Rol (ID, nom, descripcio) VALUES (:ID, :nom, :descripcio)")
            connection.execute(sql, {"ID": generate_uuid(), "nom":nom, "descripcio":descripcio})
            connection.commit()
            return jsonify({"message": "Rol added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Rol_bp.route("/Rol/<string:Rol_id>", methods=['PUT'])
def put_update_Rol(Rol_id):
    """PUT para actualizar un registro de Rol por su ID"""
    data = request.json
    nom = data.get('Nom')
    descripcio = data.get('Descripcio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Rol WHERE ID = :ID")
            result_check = connection.execute(query_check, {"ID": Rol_id})
            Rol = result_check.fetchone()
            if Rol:
                sql = text("UPDATE Rol SET Nom = :Nom, Descripcio = :Descripcio WHERE ID = :ID")
                connection.execute(sql, {"Nom": nom, "Descripcio": descripcio, "ID": Rol_id})
                connection.commit()
                return jsonify({"message": f"Rol with ID {Rol_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Rol found with ID {Rol_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Rol_bp.route("/Rol/<string:Rol_id>", methods=['DELETE'])
def delete_Rol(Rol_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Rol WHERE id = :id")
            result = conn.execute(query, {"id": Rol_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Rol with ID {Rol_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Rol found with ID {Rol_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
