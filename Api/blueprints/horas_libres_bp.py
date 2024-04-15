from sqlalchemy import text
from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
import db_configuration as db
import datetime

engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()

HorasLibres_bp = Blueprint('HorasLibres', __name__)

@HorasLibres_bp.route("/horas_libres", methods=['GET'])
def get_horas_libres():
    """GET free hours for a specific day and teacher"""
    try:
        dia = request.args.get('dia')
        profesor_id = request.args.get('profesor_id')
        fecha = request.args.get('fecha', datetime.date.today())

        with engine.connect() as conn:
            query = text("""
                DECLARE @DiaSetmana varchar(15) = :dia;
                DECLARE @Data date = :fecha;
                DECLARE @ProfesorID varchar(36) = :profesor_id;

                WITH HorarioProfesor AS (
                    SELECT h.ID, h.DiaSetmana, h.HoraInici, h.HoraFi
                    FROM Hora h
                    INNER JOIN Treballador t ON h.HorariID = t.HorariID
                    WHERE t.ID = @ProfesorID AND h.DiaSetmana = @DiaSetmana
                ),
                HorasOcupadas AS (
                    SELECT HoraInici, HoraFi
                    FROM Practica
                    WHERE [Data] = @Data AND ProfesorID = @ProfesorID
                )
                SELECT hp.HoraInici, hp.HoraFi
                FROM HorarioProfesor hp
                LEFT JOIN HorasOcupadas ho ON hp.HoraInici = ho.HoraInici AND hp.HoraFi = ho.HoraFi
                WHERE ho.HoraInici IS NULL AND ho.HoraFi IS NULL;
            """)
            
            result = conn.execute(query, {"dia": dia, "fecha": fecha, "profesor_id": profesor_id})
            horas_libres = []
            for row in result.fetchall():
                hora_libre = {}
                for idx, column in enumerate(result.keys()):
                    hora_libre[column] = str(row[idx])
                horas_libres.append(hora_libre)

            return jsonify(horas_libres), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
