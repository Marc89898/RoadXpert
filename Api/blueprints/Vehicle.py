from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Vehicle_bp = Blueprint('Vehicle', __name__)

@Vehicle_bp.route("/Vehicle", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Vehicle")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Vehicle_dict = {}
                for idx, column in enumerate(result.keys()):
                    Vehicle_dict[column] = row[idx]
                autoescoles.append(Vehicle_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Vehicle_bp.route("/Vehicle/<string:matricula>", methods=['GET'])
def get_Vehicle_by_id(matricula):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Vehicle WHERE matricula = :matricula")
            result = conn.execute(query, {"matricula": matricula})
            Vehicle = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Vehicle[column] = row[idx]
            if Vehicle:
                return jsonify(Vehicle), 200
            else:
                return jsonify({"message": f"No Vehicle found with ID {matricula}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Vehicle_bp.route("/Vehicle", methods=['POST'])
def post_new_Vehicle():
    """POST of a driving school"""
    data = request.json
    matricula = data.get('matricula')
    marca = data.get('marca')
    model = data.get('model')
    anyFabricacio = data.get('anyFabricacio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Vehicle (matricula, marca, model, anyFabricacio) VALUES (:matricula, :marca, :model, :anyFabricacio)")
            connection.execute(sql, {"matricula": matricula, "marca": marca, "model": model, "anyFabricacio": anyFabricacio})
            connection.commit()
            return jsonify({"message": "Vehicle added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Vehicle_bp.route("/Vehicle/<string:marticula>", methods=['PUT'])
def put_update_Vehicle(marticula):
    """PUT para actualizar un registro de Vehicle por su ID"""
    data = request.json
    matricula = data.get('matricula')
    marca = data.get('marca')
    model = data.get('model')
    anyFabricacio = data.get('anyFabricacio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Vehicle WHERE marticula = :marticula")
            result_check = connection.execute(query_check, {"marticula": marticula})
            connection.commit()
            Vehicle = result_check.fetchone()
            if Vehicle:
                sql = text("UPDATE Vehicle SET matricula = :matricula, marca = :marca, model = :model, anyFabricacio = :anyFabricacio WHERE marticula = :marticula")
                connection.execute(sql, {"matricula":matricula, "marca":marca, "model":model, "anyFabricacio":anyFabricacio, "marticula":marticula})
                return jsonify({"message": f"Vehicle with ID {marticula} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Vehicle found with ID {marticula}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Vehicle_bp.route("/Vehicle/<string:matricula>", methods=['DELETE'])
def delete_Vehicle(matricula):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Vehicle WHERE matricula = :matricula")
            result = conn.execute(query, {"matricula": matricula})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Vehicle with ID {matricula} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Vehicle found with ID {matricula}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
