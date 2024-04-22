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

def obtener_horario(professor_id, conn):
    horari_query = text("SELECT * FROM Horari WHERE ID = (SELECT HorariID FROM Treballador WHERE ID = :professor_id)")
    horari_result = conn.execute(horari_query, {"professor_id": professor_id})
    horari_row = horari_result.fetchone()

    if not horari_row:
        return None

    # Convertir la tupla a un diccionario
    horari_dict = dict(zip(horari_result.keys(), horari_row))
    return horari_dict['ID']  # ID del horario


def obtener_horas_laborales(dia_semana, horari_id, conn):
    hora_query = text("SELECT * FROM Hora WHERE DiaSetmana = :dia AND HorariID = :horari_id")
    hora_result = conn.execute(hora_query, {"dia": dia_semana, "horari_id": horari_id})

    horas_laborales = []

    for hora_row in hora_result.fetchall():
        hora_row_dict = dict(zip(hora_result.keys(), hora_row))

        hora_inici = hora_row_dict['HoraInici'].hour
        hora_fi = hora_row_dict['HoraFi'].hour

        print('lllhora_inici:', hora_inici)        
        print('lllhora_fi:', hora_fi)
        duracio_practica = hora_row_dict['DuracioPractica']
        num_horas = int((hora_fi - hora_inici) * 60 / duracio_practica)

        for i in range(num_horas):
            hora = {
                "HoraInici": (hora_inici + i),
                "HoraFi": (hora_inici + i + 1)
            }
            horas_laborales.append(hora)

    return horas_laborales

def obtener_horas_ocupadas(professor_id, fecha, conn):
    practica_query = text("SELECT * FROM Practica WHERE ProfessorID = :professor_id AND Data = :fecha")
    practica_result = conn.execute(practica_query, {"professor_id": professor_id, "fecha": fecha})

    horas_ocupadas = []

    for practica_row in practica_result.fetchall():
        practica_row_dict = dict(zip(practica_result.keys(), practica_row))

        # get all the hours between hora_inici and hora_fi
        hora_inici = practica_row_dict['HoraInici'].hour
        hora_fi = practica_row_dict['HoraFi'].hour
        print('hora_inici:', hora_inici)        
        print('hora_fi:', hora_fi)
        horas_ocupadas.append({"HoraFi": hora_fi, "HoraInici": hora_inici})

    return horas_ocupadas

def convertir_a_formato_time(lista_horas):
    for hora in lista_horas:
        hora['HoraInici'] = f"{hora['HoraInici']}:00:00"
        hora['HoraFi'] = f"{hora['HoraFi']}:00:00"
    return lista_horas


@HorasLibres_bp.route("/horas_libres", methods=['GET'])
def get_horas_libres():
    try:
        fecha = get_fecha()
        professor_id = request.args.get('professor_id')

        with engine.connect() as conn:
            horari_id = obtener_horario(professor_id, conn)

            # Si el profesor no tiene horario asignado
            if not horari_id:
                return jsonify({"message": "Professor no encontrado"}), 404

            dia_semana = fecha.strftime('%A')
            horas_laborales = obtener_horas_laborales(dia_semana, horari_id, conn)
            horas_ocupadas = obtener_horas_ocupadas(professor_id, fecha, conn)

            horas_disponibles = [hora for hora in horas_laborales if hora not in horas_ocupadas]

            horas_disponibles = convertir_a_formato_time(horas_disponibles)
            return jsonify(horas_disponibles), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500