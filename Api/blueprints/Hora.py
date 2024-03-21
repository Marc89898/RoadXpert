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
Hora_bp = Blueprint('Hora', __name__)

@Hora_bp.route("/Hora", methods=['GET'])
def get_horas():
    """GET of all the hours"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Hora")
            result = conn.execute(query)
            horas = []
            for row in result.fetchall():
                hora_dict = {}
                for idx, column in enumerate(result.keys()):
                    # Convertir objetos de tipo time a string antes de agregarlos al diccionario
                    value = row[idx]
                    if isinstance(value, time):
                        value = value.strftime("%H:%M:%S")  # Convertir a formato HH:MM:SS
                    hora_dict[column] = value
                horas.append(hora_dict) 
            return jsonify(horas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Hora_bp.route("/Hora/<string:Hora_id>", methods=['GET'])
def get_Hora_by_id(Hora_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Hora WHERE id = :id")
            result = conn.execute(query, {"id": Hora_id})
            Hora = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    # Convertir objetos de tipo time a string antes de agregarlos al diccionario
                    value = row[idx]
                    if isinstance(value, time):
                        value = value.strftime("%H:%M:%S")  # Convertir a formato HH:MM:SS
                    Hora[column] = value
            if Hora:
                return jsonify(Hora), 200
            else:
                return jsonify({"message": f"No Hora found with ID {Hora_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Hora_bp.route("/Hora", methods=['POST'])
def post_new_Hora():
    """POST of a driving school"""
    data = request.json
    DiaSetmana = data.get('diaSetmana')
    HoraInici = data.get('HoraInici')
    HoraFi = data.get('horaFi')
    HorariID = data.get('horariID')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Hora (ID, DiaSetmana, HoraInici, HoraFi, HorariID) VALUES (:ID, :DiaSetmana, :HoraInici, :HoraFi, :HorariID)")
            connection.execute(sql, {"ID":generate_uuid(), "DiaSetmana":DiaSetmana, "HoraInici":HoraInici, "HoraFi":HoraFi, "HorariID":HorariID})
            connection.commit()
            return jsonify({"message": "Hora added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Hora_bp.route("/Hora/<int:Hora_id>", methods=['PUT'])
def put_update_Hora(Hora_id):
    """PUT para actualizar un registro de Hora por su ID"""
    data = request.json
    diaSetmana = data.get('diaSetmana')
    horaInici = data.get('horaInici')
    horaFi = data.get('horaFi')
    horariID = data.get('horariID')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Hora WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Hora_id})
            connection.commit()
            Hora = result_check.fetchone()
            if Hora:
                sql = text("UPDATE Hora SET diaSetmana = :diaSetmana, horaInici = :horaInici, horaFi = :horaFi, horariID = :horariID WHERE id = :id")
                connection.execute(sql, diaSetmana=diaSetmana, horaInici=horaInici, horaFi=horaFi, horariID=horariID, id=Hora_id)
                return jsonify({"message": f"Hora with ID {Hora_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Hora found with ID {Hora_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Hora_bp.route("/Hora/<string:Hora_id>", methods=['DELETE'])
def delete_Hora(Hora_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Hora WHERE id = :id")
            result = conn.execute(query, {"id": Hora_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Hora with ID {Hora_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Hora found with ID {Hora_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
