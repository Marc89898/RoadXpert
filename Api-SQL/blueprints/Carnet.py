from sqlalchemy import text
from flask import Flask
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid
engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()
Carnet_bp = Blueprint('Carnet', __name__)
@Carnet_bp.route("/Carnet", methods=['GET'])
def get_autoescoles():
    """GET of all the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Carnet")
            result = conn.execute(query)
            autoescoles = []
            for row in result.fetchall():
                Carnet_dict = {}
                for idx, column in enumerate(result.keys()):
                    Carnet_dict[column] = row[idx]
                autoescoles.append(Carnet_dict) 
            return jsonify(autoescoles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Carnet_bp.route("/Carnet/<string:Carnet_id>", methods=['GET'])
def get_Carnet_by_id(Carnet_id):
    """GET filtered for id of the driving schools"""
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Carnet WHERE id = :id")
            result = conn.execute(query, {"id": Carnet_id})
            Carnet = result.fetchone()
            
            if Carnet:
                Carnet_list = list(Carnet)
                return jsonify(Carnet_list), 200
            else:
                return jsonify({"message": f"No Carnet found with ID {Carnet_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Carnet_bp.route("/Carnet", methods=['POST'])
def post_new_Carnet():
    """POST of a driving license"""
    data = request.json
    categoria = data.get('categoria')
    dataExpedicio = data.get('dataExpedicio')
    dataCaducitat = data.get('dataCaducitat')
    autoritatExpedidora = data.get('autoritatExpedidora')
    restriccions = data.get('restriccions')
    numCarnet = data.get('numCarnet')
    paisExpedicio = data.get('paisExpedicio')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Carnet (ID, categoria, dataExpedicio, dataCaducitat, autoritatExpedidora, restriccions, numCarnet, paisExpedicio) VALUES (:ID, :categoria, :dataExpedicio, :dataCaducitat, :autoritatExpedidora, :restriccions, :numCarnet, :paisExpedicio)")
            connection.execute(sql, {"ID":generate_uuid(), "categoria":categoria, "dataExpedicio":dataExpedicio, "dataCaducitat":dataCaducitat, "autoritatExpedidora":autoritatExpedidora, "restriccions":restriccions, "numCarnet":numCarnet, "paisExpedicio":paisExpedicio})
            connection.commit()
            return jsonify({"message": "Carnet added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Carnet_bp.route("/Carnet/<string:Carnet_id>", methods=['PUT'])
def put_update_Carnet(Carnet_id):
    print(Carnet_id)
    """PUT to update a Carnet record by its ID"""
    data = request.json
    categoria = data.get('categoria')
    dataExpedicio = data.get('dataExpedicio')
    dataCaducitat = data.get('dataCaducitat')
    autoritatExpedidora = data.get('autoritatExpedidora')
    restriccions = data.get('restriccions')
    numCarnet = data.get('numCarnet')
    paisExpedicio = data.get('paisExpedicio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Carnet WHERE id = :id")
            result_check = connection.execute(query_check, {"id": Carnet_id})
            Carnet = result_check.fetchone()
            connection.commit()
            if Carnet:
                sql = text("UPDATE Carnet SET categoria = :categoria, dataExpedicio = :dataExpedicio, dataCaducitat = :dataCaducitat, autoritatExpedidora = :autoritatExpedidora, restriccions = :restriccions, numCarnet = :numCarnet, paisExpedicio = :paisExpedicio WHERE id = :id")
                connection.execute(sql, {"categoria":categoria, "dataExpedicio":dataExpedicio, "dataCaducitat":dataCaducitat, "autoritatExpedidora":autoritatExpedidora, "restriccions":restriccions, "numCarnet":numCarnet, "paisExpedicio":paisExpedicio, "id":Carnet_id})
                connection.commit()
                return jsonify({"message": f"Carnet with ID {Carnet_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Carnet found with ID {Carnet_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Carnet_bp.route("/Carnet/<string:Carnet_id>", methods=['DELETE'])
def delete_Carnet(Carnet_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Carnet WHERE id = :id")
            result = conn.execute(query, {"id": Carnet_id})
            conn.commit()
            if result.rowcount > 0:
                return jsonify({"message": f"Carnet with ID {Carnet_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Carnet found with ID {Carnet_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
