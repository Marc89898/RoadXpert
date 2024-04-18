from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
HistorialPractica_bp = Blueprint('HistorialPractica', __name__)

@HistorialPractica_bp.route("/HistorialPractica", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM HistorialPractica")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                HistorialPractica_dict = {}
                for idx, column in enumerate(result.keys()):
                    HistorialPractica_dict[column] = row[idx]
                autoescoles.append(HistorialPractica_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@HistorialPractica_bp.route("/HistorialPractica/<string:codiPractica>", methods=['GET'])
def get_HistorialPractica_by_id(codiPractica):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM HistorialPractica WHERE codiPractica = :codiPractica")
            result = conn.execute(query, {"codiPractica": codiPractica})
            HistorialPractica = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    HistorialPractica[column] = row[idx]
            if HistorialPractica:
                return jsonify(HistorialPractica), 200
            else:
                return jsonify({"message": f"No HistorialPractica found with ID {codiPractica}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@HistorialPractica_bp.route("/HistorialPractica", methods=['POST'])
def post_new_HistorialPractica():
    """POST of a driving school"""
    data = request.json
    Data = data.get('data')
    accio = data.get('accio')
    codiPractica = data.get('codiPractica')
    descripcio = data.get('descripcio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO HistorialPractica (Data, accio, descripcio, codiPractica) VALUES (:Data, :accio, :descripcio, :codiPractica)")
            connection.execute(sql, {"Data":Data, "accio":accio, "descripcio":descripcio, "codiPractica": codiPractica})
            connection.commit()
            return jsonify({"message": "HistorialPractica added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@HistorialPractica_bp.route("/HistorialPractica/<string:codiPractica>", methods=['DELETE'])
def delete_HistorialPractica(codiPractica):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM HistorialPractica WHERE codiPractica = :codiPractica")
            result = conn.execute(query, {"codiPractica": codiPractica})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"HistorialPractica with ID {codiPractica} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No HistorialPractica found with ID {codiPractica}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@HistorialPractica_bp.route("/HistorialPractica/<string:codiPractica>", methods=['PUT'])
def update_HistorialPractica(codiPractica):
    """PUT para actualizar un registro de HistorialPractica por su ID"""
    data = request.json
    Data = data.get('data')
    Accio = data.get('Accio')
    Descripcio = data.get('Descripcio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM HistorialPractica WHERE CodiPractica = :CodiPractica")
            result_check = connection.execute(query_check, {"CodiPractica": codiPractica})
            HistorialPractica = result_check.fetchone()
            if HistorialPractica:
                sql = text("UPDATE HistorialPractica SET Data = :Data, Accio = :Accio, Descripcio = :Descripcio WHERE CodiPractica = :CodiPractica")
                connection.execute(sql, {"Data": Data, "Accio": Accio, "Descripcio": Descripcio, "CodiPractica": codiPractica})
                connection.commit()
                return jsonify({"message": f"HistorialPractica with ID {codiPractica} updated successfully"}), 200
            else:
                return jsonify({"message": f"No HistorialPractica found with ID {codiPractica}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
