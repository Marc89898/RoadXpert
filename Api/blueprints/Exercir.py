from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Exercir_bp = Blueprint('Exercir', __name__)

@Exercir_bp.route("/Exercir", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Exercir")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Exercir_dict = {}
                for idx, column in enumerate(result.keys()):
                    Exercir_dict[column] = row[idx]
                autoescoles.append(Exercir_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Exercir_bp.route("/Exercir/<string:Exercir_id>", methods=['GET'])
def get_Exercir_by_id(Exercir_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Exercir WHERE id = :id")
            result = conn.execute(query, {"id": Exercir_id})
            Exercir = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Exercir[column] = row[idx]
            if Exercir:
                return jsonify(Exercir), 200
            else:
                return jsonify({"message": f"No Exercir found with ID {Exercir_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Exercir_bp.route("/Exercir", methods=['POST'])
def post_new_Exercir():
    """POST of a driving school"""
    data = request.json
    rolID = data.get('rolID')
    treballadorID = data.get('treballadorID')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Exercir (rolID, treballadorID) VALUES (:rolID, :treballdorID)")
            connection.execute(sql, rolID=rolID, treballadorID=treballadorID)
            connection.commit()
            return jsonify({"message": "Exercir added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@Exercir_bp.route("/Exercir/<int:Exercir_id>", methods=['DELETE'])
def delete_Exercir(Exercir_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Exercir WHERE id = :id")
            result = conn.execute(query, {"id": Exercir_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Exercir with ID {Exercir_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Exercir found with ID {Exercir_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@Exercir_bp.route("/Exercir/<int:Exercir_id>", methods=['PUT'])
def update_Exercir(Exercir_id):
    """PUT para actualizar un Exercir específico por ID"""
    data = request.json
    rolID = data.get('rolID')
    treballadorID = data.get('treballadorID')
    try:
        with engine.connect() as connection:
            # Verificar si el Exercir con el ID dado existe
            query_check = text("SELECT * FROM Exercir WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Exercir_id})
            connection.commit()
            Exercir = result_check.fetchone()
            if Exercir:
                # Exercir existe, proceder con la actualización
                sql = text("UPDATE Exercir SET rolID = :rolID, treballadorID = :treballadorID WHERE id = :id")
                connection.execute(sql, rolID=rolID, treballadorID=treballadorID, id=Exercir_id)
                return jsonify({"message": f"Exercir with ID {Exercir_id} updated successfully"}), 200
            else:
                # No se encontró ningún Exercir con el ID dado
                return jsonify({"message": f"No Exercir found with ID {Exercir_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
