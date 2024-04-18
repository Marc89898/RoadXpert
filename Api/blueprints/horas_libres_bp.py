from sqlalchemy import text
from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
import db_configuration as db
import locale
import datetime

engine = db.engine
Session = sessionmaker(bind=engine)
session = Session()

HorasLibres_bp = Blueprint('HorasLibres', __name__)

# Configurar el locale para español
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

def get_fecha():
    fecha_str = request.args.get('fecha', datetime.date.today().strftime('%Y-%m-%d'))
    fecha = datetime.datetime.strptime(fecha_str, '%Y-%m-%d').date()
    return fecha

def obtener_horario(profesor_id, conn):
    horari_query = text("SELECT * FROM Horari WHERE ID = (SELECT HorariID FROM Treballador WHERE ID = :profesor_id)")
    horari_result = conn.execute(horari_query, {"profesor_id": profesor_id})
    horari_row = horari_result.fetchone()

    if not horari_row:
        return None

    return horari_row[0]  # ID del horario

def obtener_horas_laborales(dia_semana, horari_id, conn):
    hora_query = text("SELECT * FROM Hora WHERE DiaSetmana = :dia AND HorariID = :horari_id")
    hora_result = conn.execute(hora_query, {"dia": dia_semana, "horari_id": horari_id})

    horas_laborales = []

    for hora_row in hora_result.fetchall():
        hora_inici = hora_row[2].hour  # HoraInici
        hora_fi = hora_row[3].hour     # HoraFi
        duracio_practica = hora_row[5]  # DuracioPractica

        num_horas = int((hora_fi - hora_inici) * 60 / duracio_practica)

        for i in range(num_horas):
            hora = {
                "HoraInici": (hora_inici + i),
                "HoraFi": (hora_inici + i + 1)
            }
            horas_laborales.append(hora)

    return horas_laborales

def obtener_horas_ocupadas(profesor_id, fecha, conn):
    practica_query = text("SELECT * FROM Practica WHERE ProfesorID = :profesor_id AND Data = :fecha")
    practica_result = conn.execute(practica_query, {"profesor_id": profesor_id, "fecha": fecha})

    horas_ocupadas = []

    for practica_row in practica_result.fetchall():
        hora_inici = practica_row[3].hour
        hora_fi = practica_row[4].hour

        horas_ocupadas.append({"HoraFi": hora_fi, "HoraInici": hora_inici})

    return horas_ocupadas

@HorasLibres_bp.route("/horas_libres", methods=['GET'])
def get_horas_libres():
    try:
        fecha = get_fecha()
        profesor_id = request.args.get('profesor_id')

        with engine.connect() as conn:
            horari_id = obtener_horario(profesor_id, conn)

            if not horari_id:
                return jsonify({"message": "Profesor no encontrado"}), 404

            dia_semana = fecha.strftime('%A')
            horas_laborales = obtener_horas_laborales(dia_semana, horari_id, conn)
            horas_ocupadas = obtener_horas_ocupadas(profesor_id, fecha, conn)

            horas_disponibles = [hora for hora in horas_laborales if hora not in horas_ocupadas]

            return jsonify(horas_disponibles), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
