from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db

engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Comet_bp = Blueprint('Comet', __name__)

@Comet_bp.route("/Comet", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Comet")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Comet_dict = {}
                for idx, column in enumerate(result.keys()):
                    Comet_dict[column] = row[idx]
                autoescoles.append(Comet_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Comet_bp.route("/Comet/<string:practicaID>/<string:anotacioID>", methods=['GET'])
def get_Comet_by_id(practicaID, anotacioID):
    """GET filtered for id of the driving schools"""
    try:

        with engine.connect() as conn:
            query = text("SELECT * FROM Comet WHERE practicaID = :practicaID AND anotacioID = :anotacioID")
            result = conn.execute(query, {"practicaID": practicaID, "anotacioID": anotacioID})
            Comet = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Comet[column] = row[idx]
            if Comet:
                return jsonify(Comet), 200
            else:
                return jsonify({"message": f"No Comet found with ID {practicaID + "&&" + anotacioID}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@Comet_bp.route("/Comet", methods=['POST'])
def post_new_Comet():
    """POST of a driving school"""
    data = request.json
    practicaID = data.get('practicaID')
    anotacioID = data.get('anotacioID')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Comet (practicaID, anotacioID) VALUES (:practicaID, :anotacioID)")
            connection.execute(sql, {"practicaID":practicaID, "anotacioID":anotacioID})
            connection.commit()
            return jsonify({"message": "Comet added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Comet_bp.route("/Comet/<int:Comet_id>", methods=['DELETE'])
def delete_Comet(Comet_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Comet WHERE id = :id")
            result = conn.execute(query, {"id": Comet_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Comet with ID {Comet_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Comet found with ID {Comet_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
