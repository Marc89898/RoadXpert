from flask import Flask
from flask_swagger_ui import get_swaggerui_blueprint
import blueprints.horas_libres_bp
from db_configuration import test_database_connection
import blueprints.Alumne , blueprints.Carnet  , blueprints.Anotacio, blueprints.Comet , blueprints.EstatHora , blueprints.Exercir , blueprints.HistorialPractica , blueprints.Hora , blueprints.Hora , blueprints.Horari , blueprints.Incidencia , blueprints.Matricula , blueprints.Practica , blueprints.Treballador , blueprints.TreballadorTeIncidencia , blueprints.Vehicle, blueprints.Rol, blueprints.horas_libres_bp

def blueprint_register():
    app.register_blueprint(blueprints.Alumne.Alumne_bp, url_prefix='/')
    app.register_blueprint(blueprints.Carnet.Carnet_bp, url_prefix='/')
    app.register_blueprint(blueprints.Anotacio.Anotacio_bp, url_prefix='/')
    app.register_blueprint(blueprints.Comet.Comet_bp, url_prefix='/')
    app.register_blueprint(blueprints.EstatHora.EstatHora_bp, url_prefix='/')
    app.register_blueprint(blueprints.Exercir.Exercir_bp, url_prefix='/')
    app.register_blueprint(blueprints.HistorialPractica.HistorialPractica_bp, url_prefix='/')
    app.register_blueprint(blueprints.Hora.Hora_bp, url_prefix='/')
    app.register_blueprint(blueprints.Horari.Horari_bp, url_prefix='/')
    app.register_blueprint(blueprints.Incidencia.Incidencia_bp, url_prefix='/')
    app.register_blueprint(blueprints.Matricula.Matricula_bp, url_prefix='/')
    app.register_blueprint(blueprints.Practica.Practica_bp, url_prefix='/')
    app.register_blueprint(blueprints.Treballador.Treballador_bp, url_prefix='/')
    app.register_blueprint(blueprints.TreballadorTeIncidencia.TreballadorTeIncidencia_bp, url_prefix='/')
    app.register_blueprint(blueprints.Vehicle.Vehicle_bp, url_prefix='/')
    app.register_blueprint(blueprints.Rol.Rol_bp, url_prefix='/')
    app.register_blueprint(blueprints.horas_libres_bp.HorasLibres_bp, url_prefix='/')

SWAGGER_URL="/swagger"
API_URL="/static/swagger.json"
app = Flask(__name__)
blueprint_register()
test_database_connection()
swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Access API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)
app.run(host='172.23.3.204', port=8888)