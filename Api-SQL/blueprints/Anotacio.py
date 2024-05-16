from sqlalchemy import text
from flask import Blueprint, request, jsonify
import db_configuration as db
from blueprints.utils import generate_uuid

engine = db.engine
Anotacio_bp = Blueprint('Anotacio', __name__)

@Anotacio_bp.route("/Anotacio", methods=['GET'])
def get_all_Anotacions():
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Anotacio")
            result = conn.execute(query)
            Anotacions = [dict(zip(result.keys(), row)) for row in result.fetchall()]
            return jsonify(Anotacions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Anotacio_bp.route("/Anotacio/<string:Anotacio_id>", methods=['GET'])
def get_Anotacio_by_id(Anotacio_id):
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Anotacio WHERE ID = :id")
            result = conn.execute(query, {"id": Anotacio_id})
            Anotacio = result.fetchone()
            if Anotacio:
                return jsonify(dict(zip(result.keys(), Anotacio))), 200
            else:
                return jsonify({"message": f"No Anotacio found with ID {Anotacio_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@Anotacio_bp.route("/Anotacio", methods=['POST'])
def create_Anotacio():
    data = request.json
    tipus = data.get('Tipus')
    descripcio = data.get('Descripcio')
    posicio = data.get('Posicio')
    practica_id = data.get('PracticaID')
    alumne_id = data.get('AlumneID')
    categoria_escrita = data.get('CategoriaEscrita')
    categoria_numerica = data.get('CategoriaNumerica')
    gravedad = data.get('Gravedad')
    try:
        with engine.connect() as connection:
            sql = text("INSERT INTO Anotacio (ID, Tipus, Descripcio, Posicio, PracticaID, AlumneID, CategoriaEscrita, CategoriaNumerica, Gravedad) VALUES (:ID, :Tipus, :Descripcio, :Posicio, :PracticaID, :AlumneID, :CategoriaEscrita, :CategoriaNumerica, :Gravedad)")
            connection.execute(sql, {"ID": generate_uuid(), "Tipus":tipus, "Descripcio":descripcio, "Posicio":posicio, "PracticaID":practica_id, "AlumneID":alumne_id, "CategoriaEscrita":categoria_escrita, "CategoriaNumerica":categoria_numerica, "Gravedad":gravedad})
            connection.commit()
            return jsonify({"message": "Anotacio added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@Anotacio_bp.route("/Anotacio/<string:Anotacio_id>", methods=['PUT'])
def update_Anotacio(Anotacio_id):
    data = request.json
    tipus = data.get('Tipus')
    descripcio = data.get('Descripcio')
    posicio = data.get('Posicio')
    try:
        with engine.connect() as connection:
            query_check = text("SELECT * FROM Anotacio WHERE ID = :id")
            result_check = connection.execute(query_check, {"id": Anotacio_id})
            Anotacio = result_check.fetchone()
            if Anotacio:
                sql = text("UPDATE Anotacio SET Tipus = :Tipus, Descripcio = :Descripcio, Posicio = :Posicio WHERE ID = :id")
                connection.execute(sql, {"Tipus":tipus, "Descripcio":descripcio, "Posicio":posicio, "id":Anotacio_id})
                return jsonify({"message": f"Anotacio with ID {Anotacio_id} updated successfully"}), 200
            else:
                return jsonify({"message": f"No Anotacio found with ID {Anotacio_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@Anotacio_bp.route("/Anotacio/<string:Anotacio_id>", methods=['DELETE'])
def delete_Anotacio(Anotacio_id):
    try:
        with engine.connect() as conn:
            query = text("DELETE FROM Anotacio WHERE ID = :id")
            result = conn.execute(query, {"id": Anotacio_id})
            if result.rowcount > 0:
                return jsonify({"message": f"Anotacio with ID {Anotacio_id} deleted successfully"}), 200
            else:
                return jsonify({"message": f"No Anotacio found with ID {Anotacio_id}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @Anotacio_bp.route("/Anotacio/Alumne/<string:alumne_id>", methods=['GET'])
# def get_Anotacions_by_alumne_id(alumne_id):
#     try:
#         with engine.connect() as conn:
#             query = text("SELECT * FROM Anotacio WHERE AlumneID = :alumne_id")
#             result = conn.execute(query, {"alumne_id": alumne_id})
#             Anotacions = [dict(zip(result.keys(), row)) for row in result.fetchall()]
#             return jsonify(Anotacions), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
@Anotacio_bp.route("/Anotacio/Alumne/<string:alumne_id>", methods=['GET'])
def get_Anotacions_by_alumne_id(alumne_id):
    try:
        with engine.connect() as conn:
            query = text("SELECT * FROM Anotacio WHERE AlumneID = :alumne_id")
            result = conn.execute(query, {"alumne_id": alumne_id})
            Anotacions = [dict(zip(result.keys(), row)) for row in result.fetchall()]

            # Ahora añadimos los datos de cada Practica
            for anotacion in Anotacions:
                practica_id = anotacion['PracticaID']
                practica_query = text("SELECT Data, Ruta FROM Practica WHERE ID = :practica_id")
                practica_result = conn.execute(practica_query, {"practica_id": practica_id}).fetchone()
                if practica_result:
                    anotacion['Data'] = practica_result[0]  # Usa el índice 0 para obtener el valor de 'Data'
                    anotacion['Ruta'] = practica_result[1]  # Usa el índice 0 para obtener el valor de 'Data'

            return jsonify(Anotacions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
