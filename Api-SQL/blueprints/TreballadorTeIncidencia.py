from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
TreballadorTeIncidencia_bp = Blueprint('TreballadorTeIncidencia', __name__)

@TreballadorTeIncidencia_bp.route("/TreballadorTeIncidencia", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM TreballadorTeIncidencia")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                TreballadorTeIncidencia_dict = {}
                for idx, column in enumerate(result.keys()):
                    TreballadorTeIncidencia_dict[column] = row[idx]
                autoescoles.append(TreballadorTeIncidencia_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@TreballadorTeIncidencia_bp.route("/TreballadorTeIncidencia/<string:TreballadorTeIncidencia_id>", methods=['GET'])
def get_TreballadorTeIncidencia_by_id(TreballadorTeIncidencia_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM TreballadorTeIncidencia WHERE id = :id")
            result = conn.execute(query, {"id": TreballadorTeIncidencia_id})
            TreballadorTeIncidencia = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    TreballadorTeIncidencia[column] = row[idx]
            if TreballadorTeIncidencia:
                return jsonify(TreballadorTeIncidencia), 200
            else:
                return jsonify({"message": f"No TreballadorTeIncidencia found with ID {TreballadorTeIncidencia_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@TreballadorTeIncidencia_bp.route("/TreballadorTeIncidencia", methods=['POST'])
def post_new_TreballadorTeIncidencia():
    """POST of a driving school"""
    data = request.json
    treballadorID = data.get('treballadorID')
    incidenciaID = data.get('incidenciaID')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO TreballadorTeIncidencia (treballadorID, incidenciaDI) VALUES (:treballadorID, :incidenciaID)")
            connection.execute(sql, {"treballadorID":treballadorID, "incidenciaID":incidenciaID})
            connection.commit()
            return jsonify({"message": "TreballadorTeIncidencia added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@TreballadorTeIncidencia_bp.route("/TreballadorTeIncidencia/<string:TreballadorTeIncidencia_id>", methods=['DELETE'])
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
    
@TreballadorTeIncidencia_bp.route("/TreballadorTeIncidencia/<int:TreballadorTeIncidencia_id>", methods=['PUT'])
def update_TreballadorTeIncidencia(TreballadorTeIncidencia_id):
    """PUT to update a specific TreballadorTeIncidencia by ID"""
    data = request.json
    treballadorID = data.get('treballadorID')
    incidenciaID = data.get('incidenciaID')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM TreballadorTeIncidencia WHERE id = :id")
            result_check = connection.execute(query_check, {"id": TreballadorTeIncidencia_id})
            TreballadorTeIncidencia = result_check.fetchone()
            if TreballadorTeIncidencia:
                sql = text("UPDATE TreballadorTeIncidencia SET treballadorID = :treballadorID, incidenciaID = :incidenciaID WHERE id = :id")
                connection.execute(sql, {"treballadorID":treballadorID, "incidenciaID":incidenciaID, "id":TreballadorTeIncidencia_id})
                connection.commit()
                return jsonify({"message": f"TreballadorTeIncidencia with ID {TreballadorTeIncidencia_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No TreballadorTeIncidencia found with ID {TreballadorTeIncidencia_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
