from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Treballador_bp = Blueprint('Treballador', __name__)

@Treballador_bp.route("/Treballador", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Treballador")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Treballador_dict = {}
                for idx, column in enumerate(result.keys()):
                    Treballador_dict[column] = row[idx]
                autoescoles.append(Treballador_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Treballador_bp.route("/Treballador/<string:Treballador_id>", methods=['GET'])
def get_Treballador_by_id(Treballador_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Treballador WHERE id = :id")
            result = conn.execute(query, {"id": Treballador_id})
            Treballador = {}
            for row in result.fetchall():
                for idx, column in enumerate(result.keys()):
                    Treballador[column] = row[idx]
            if Treballador:
                return jsonify(Treballador), 200
            else:
                return jsonify({"message": f"No Treballador found with ID {Treballador_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Treballador_bp.route("/Treballador", methods=['POST'])
def post_new_Treballador():
    """POST of a driving school"""
    data = request.json
    nom = data.get('nom')
    cognom = data.get('cognom')
    segonCognom = data.get('segonCognom')
    dni = data.get('dni')
    adreca = data.get('adreca')
    sexe = data.get('sexe')
    carnetConduirFront = data.get('carnetConduirFront')
    carnetConduirDarrera = data.get('carnetConduirDarrera')
    rol = data.get('rol')
    horariID = data.get('horariID')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Treballador (ID, nom, cognom, segonCognom, dni, adreca, sexe, carnetConduirFront, carnetConduirDarrera, horariID) VALUES (:ID, :nom, :cognom, :segonCognom, :dni, :adreca, :sexe, :carnetConduirFront, :carnetConduirDarrera, :horariID)")
            connection.execute(sql, {"ID": generate_uuid(), "nom":nom, "cognom":cognom, "segonCognom":segonCognom, "dni":dni, "adreca":adreca, "sexe":sexe, "carnetConduirFront":carnetConduirFront, "carnetConduirDarrera":carnetConduirDarrera, "horariID":horariID})
            connection.commit()
            return jsonify({"message": "Treballador added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Treballador_bp.route("/Treballador/<string:Treballador_id>", methods=['PUT'])
def put_update_Treballador(Treballador_id):
    """PUT para actualizar un registro de Treballador por su ID"""
    data = request.json
    nom = data.get('nom')
    cognom = data.get('cognom')
    segonCognom = data.get('segonCognom')
    dni = data.get('dni')
    adreca = data.get('adreca')
    sexe = data.get('sexe')
    carnetConduirFrontal = data.get('carnetConduirFrontal')
    carnetConduirDerrera = data.get('carnetConduirDerrera')
    rol = data.get('rol')
    horariID = data.get('horariID')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Treballador WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Treballador_id})
            Treballador = result_check.fetchone()
            if Treballador:
                sql = text("UPDATE Treballador SET nom = :nom, cognom = :cognom, segonCognom = :segonCognom, dni = :dni, adreca = :adreca, sexe = :sexe, carnetConduirFrontal = :carnetConduirFrontal, carnetConduirDerrera = :carnetConduirDerrera, rol = :rol, horariID = :horariID WHERE id = :id")
                connection.execute(sql, nom=nom, cognom=cognom, segonCognom=segonCognom, dni=dni, adreca=adreca, sexe=sexe, carnetConduirFrontal=carnetConduirFrontal, carnetConduirDerrera=carnetConduirDerrera, rol=rol, horariID=horariID, id=Treballador_id)
                return jsonify({"message": f"Treballador with ID {Treballador_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Treballador found with ID {Treballador_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Treballador_bp.route("/Treballador/<string:Treballador_id>", methods=['DELETE'])
def delete_Treballador(Treballador_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Treballador WHERE id = :id")
            result = conn.execute(query, {"id": Treballador_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Treballador with ID {Treballador_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Treballador found with ID {Treballador_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
