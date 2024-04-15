from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
from datetime import time
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Practica_bp = Blueprint('Practica', __name__)

@Practica_bp.route("/Practica", methods=['GET'])
def get_practicas():
    """GET all the driving practices"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Practica")
            result = conn.execute(query)
            practicas = []
            for row in result.fetchall():
                practica_dict = {}
                for idx, column in enumerate(result.keys()):
                    if type(row[idx]) is time:
                        practica_dict[column] = row[idx].strftime('%H:%M:%S')
                    else:
                        practica_dict[column] = row[idx]
                practicas.append(practica_dict) 
            return jsonify(practicas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Practica_bp.route("/Practica/<string:Practica_id>", methods=['GET'])
def get_Practica_by_id(Practica_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Practica WHERE id = :id")
            result = conn.execute(query, {"id": Practica_id})
            Practica = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    if isinstance(row[idx], time):
                        Practica[column] = str(row[idx])
                    else:
                        Practica[column] = row[idx]
            if Practica:
                return jsonify(Practica), 200
            else:
                return jsonify({"message": f"No Practica found with ID {Practica_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Practica_bp.route("/Practica/Alumn/<string:alumne_id>", methods=['GET'])
def get_practicas_by_alumn_id(alumne_id):
    """GET all the driving practices for a specific student"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Practica WHERE AlumneID = :AlumneID")
            result = conn.execute(query, {"AlumneID": alumne_id})
            practicas = []
            for row in result.fetchall():
                practica_dict = {}
                for idx, column in enumerate(result.keys()):
                    if isinstance(row[idx], time):
                        practica_dict[column] = str(row[idx])
                    else:
                        practica_dict[column] = row[idx]
                practicas.append(practica_dict)
            if practicas:
                return jsonify(practicas), 200
            else:
                return jsonify({"message": f"No Practiques found for student with ID {alumne_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@Practica_bp.route("/Practica", methods=['POST'])
def post_new_Practica():
    """POST of a driving school"""
    data = request.json
    alumneID = data.get('alumneID')
    ruta = data.get('ruta')
    km = data.get('km')
    dataInici = data.get('dataInici')
    dataFi = data.get('dataFi')
    pagat = data.get('pagat')
    horaID = data.get('horaID')
    vehicleId = data.get('vehicleID')
    estatHora = data.get('estatHora')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Practica (alumneID, ruta, km, dataInici, dataFi, pagat, horaID, vehicleId, estatHora) VALUES (:alumneID, :ruta, :km, :dataInici, :dataFi, :pagat, :horaID, :vehicleId, :estatHora)")
            connection.execute(sql, {"ID": generate_uuid(), "alumneID": alumneID, "ruta":ruta, "km":km, "dataInici":dataInici, "dataFi":dataFi, "pagat":pagat, "horaID":horaID, "vehicleId":vehicleId, "estatHora":estatHora})
            connection.commit()
            return jsonify({"message": "Practica added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Practica_bp.route("/Practica/<string:Practica_id>", methods=['PUT'])
def put_update_Practica(Practica_id):
    """PUT para actualizar un registro de Practica por su ID"""
    data = request.json
    AlumneID = data.get('AlumneID')
    Ruta = data.get('Ruta')
    Km = data.get('Km')
    HoraInici = data.get('HoraInici')
    HoraFi = data.get('HoraFi')
    ProfesorID = data.get('ProfesorID')
    VehicleID = data.get('VehicleID')
    EstatHoraID = data.get('EstatHoraID')
    Data = data.get('Data')
    try:
        with engine.connect() as connection:
            # Verificar si el registro de Practica con el ID dado existe
            query_check = text("SELECT * FROM Practica WHERE ID = :Practica_id")
            result_check = connection.execute(query_check, {"Practica_id": Practica_id})
            Practica = result_check.fetchone()
            if Practica:
                # El registro de Practica existe, proceder con la actualización
                sql = text("UPDATE Practica SET AlumneID = :AlumneID, Ruta = :Ruta, Km = :Km, HoraInici = :HoraInici, HoraFi = :HoraFi, EstatHoraID = :EstatHoraID, VehicleID = :VehicleID, ProfesorID = :ProfesorID, Data = :Data WHERE ID = :Practica_id")
                connection.execute(sql, {"AlumneID": AlumneID, "Ruta": Ruta, "Km": Km, "HoraInici": HoraInici, "HoraFi": HoraFi, "EstatHoraID": EstatHoraID, "ProfesorID": ProfesorID, "VehicleID": VehicleID, "Data": Data, "Practica_id": Practica_id})
                connection.commit()
                return jsonify({"message": f"Practica with ID {Practica_id} updated successfully"}), 200
            else:
                # No se encontró ningún registro de Practica con el ID dado
                return jsonify({"message": f"No Practica found with ID {Practica_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@Practica_bp.route("/Practica/<string:Practica_id>", methods=['DELETE'])
def delete_Practica(Practica_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Practica WHERE id = :id")
            result = conn.execute(query, {"id": Practica_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Practica with ID {Practica_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Practica found with ID {Practica_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
