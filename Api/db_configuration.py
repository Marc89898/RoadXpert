from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
import pymssql
from urllib.parse import quote_plus

server = 'localhost'
database = 'RoadXpertDatabase'
username = 'sa'
password = 'Passw0rd!'

password_encoded = quote_plus(password)

connection_string = f'mssql+pymssql://{username}:{password_encoded}@{server}/{database}'
engine = create_engine(connection_string)

def test_database_connection():
    try:
        with engine.connect():
            print("TEST: Connection to the database successful")
            return True
    except OperationalError as e:
        print("Error connecting to the database:", e)
        return False
