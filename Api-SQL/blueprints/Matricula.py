from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Matricula_bp = Blueprint('Matricula', __name__)

@Matricula_bp.route("/Matricula", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Matricula")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Matricula_dict = {}
                for idx, column in enumerate(result.keys()):
                    Matricula_dict[column] = row[idx]
                autoescoles.append(Matricula_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Matricula_bp.route("/Matricula/<string:AlumneID>/<string:CarnetID>", methods=['GET'])
def get_Matricula_by_id(AlumneID, CarnetID):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Matricula WHERE AlumneID = :AlumneID AND CarnetID = :CarnetID")
            result = conn.execute(query, {"AlumneID": AlumneID, "CarnetID": CarnetID})
            Matricula = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Matricula[column] = row[idx]
            if Matricula:
                return jsonify(Matricula), 200
            else:
                return jsonify({"message": f"No Matricula found with AlumneID {AlumneID} and CarnetID {CarnetID}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Matricula_bp.route("/Matricula", methods=['POST'])
def post_new_Matricula():
    """POST of a driving school"""
    data = request.json
    alumneID = data.get('alumneID')
    carnetID = data.get('carnetID')
    dataFi = data.get('dataFi')
    dataInici = data.get('dataInici')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Matricula (alumneID, carnetID, dataFi, dataInici) VALUES (:alumneID, :carnetID, :dataFi, :dataInici)")
            connection.execute(sql, {"alumneID":alumneID, "carnetID":carnetID, "dataFi":dataFi, "dataInici":dataInici})
            connection.commit()
            return jsonify({"message": "Matricula added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Matricula_bp.route("/Matricula/<string:AlumneID>/<string:CarnetID>", methods=['PUT'])
def put_update_Matricula(AlumneID, CarnetID):
    """PUT para actualizar un registro de Matricula por su AlumneID y CarnetID"""
    data = request.json
    dataFi = data.get('dataFi')
    dataInici = data.get('dataInici')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Matricula WHERE AlumneID = :AlumneID AND CarnetID = :CarnetID")
            result_check = connection.execute(query_check, {"AlumneID": AlumneID, "CarnetID": CarnetID})
            Matricula = result_check.fetchone()
            if Matricula:
                sql = text("UPDATE Matricula SET dataFi = :dataFi, dataInici = :dataInici WHERE AlumneID = :AlumneID AND CarnetID = :CarnetID")
                connection.execute(sql, {"dataFi": dataFi, "dataInici": dataInici, "AlumneID": AlumneID, "CarnetID": CarnetID})
                connection.commit()
                return jsonify({"message": f"Matricula with AlumneID {AlumneID} and CarnetID {CarnetID} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Matricula found with AlumneID {AlumneID} and CarnetID {CarnetID}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Matricula_bp.route("/Matricula/<string:AlumneID>/<string:CarnetID>", methods=['DELETE'])
def delete_Matricula(AlumneID, CarnetID):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Matricula WHERE AlumneID = :AlumneID AND CarnetID = :CarnetID")
            result = conn.execute(query, {"AlumneID": AlumneID, "CarnetID": CarnetID})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Matricula with AlumneID {AlumneID} and CarnetID {CarnetID} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Matricula found with AlumneID {AlumneID} and CarnetID {CarnetID}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

