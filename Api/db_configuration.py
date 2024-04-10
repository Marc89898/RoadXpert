from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
import pymssql
# DATABASE URL
server2 = 'localhost'
database2 = 'roadXpert'
username2 = 'sa'
password2 = 'Markitus89_'
server = 'roadxpertserver1.database.windows.net'
database = 'RoadXpertDatabase'
username = 'user1'
password = 'RoadXpert1'
connection_string = f'mssql+pymssql://{username2}:{password2}@{server2}/{database2}'
engine = create_engine(connection_string)

def test_database_connection():
    try:
        with engine.connect():
            print("TEST: Connection to the database successful")
            return True
    except OperationalError as e:
        print("Error connecting to the database:", e)
        return False
