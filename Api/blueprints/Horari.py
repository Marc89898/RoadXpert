from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Horari_bp = Blueprint('Horari', __name__)

@Horari_bp.route("/Horari", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Horari")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Horari_dict = {}
                for idx, column in enumerate(result.keys()):
                    Horari_dict[column] = row[idx]
                autoescoles.append(Horari_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Horari_bp.route("/Horari/<string:Horari_id>", methods=['GET'])
def get_Horari_by_id(Horari_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Horari WHERE id = :id")
            result = conn.execute(query, {"id": Horari_id})
            Horari = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Horari[column] = row[idx]
            if Horari:
                return jsonify(Horari), 200
            else:
                return jsonify({"message": f"No Horari found with ID {Horari_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Horari_bp.route("/Horari", methods=['POST'])
def post_new_Horari():
    """POST of a driving school"""
    data = request.json
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Horari (ID, nom, descripcio) VALUES (:ID, :nom, :descripcio)")
            connection.execute(sql, {"ID": generate_uuid(), "nom":nom, "descripcio":descripcio})
            connection.commit()
            return jsonify({"message": "Horari added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Horari_bp.route("/Horari/<string:Horari_id>", methods=['PUT'])
def put_update_Horari(Horari_id):
    """PUT para actualizar un registro de Horari por su ID"""
    data = request.json
    nom = data.get('nom')
    descripcio = data.get('descripcio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Horari WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Horari_id})
            connection.commit()
            Horari = result_check.fetchone()
            if Horari:
                sql = text("UPDATE Horari SET nom = :nom, descripcio = :descripcio WHERE id = :id")
                connection.execute(sql, {"nom":nom, "descripcio":descripcio, "id":Horari_id})
                return jsonify({"message": f"Horari with ID {Horari_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Horari found with ID {Horari_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Horari_bp.route("/Horari/<string:Horari_id>", methods=['DELETE'])
def delete_Horari(Horari_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Horari WHERE id = :id")
            result = conn.execute(query, {"id": Horari_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Horari with ID {Horari_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Horari found with ID {Horari_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
