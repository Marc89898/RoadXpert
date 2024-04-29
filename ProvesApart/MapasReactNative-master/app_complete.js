import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import ApiHelper from "./ApiHelper";

const initialPointLocations = []; // Inicializar el array de puntos fuera del componente
// Datos de ejemplo para crear una práctica
const practicaData2 = {
  AlumneID: 'Alumne_1',
  Ruta: '6627d530f53b02fe8d5bed5c',
  Km: 0,
  HoraInici: '10:00:00', // Formato 'HH:mm:ss
  HoraFi: '11:00:00', // Formato 'HH:mm:ss
  ProfessorID: 'Treballador_1',
  VehicleID: '1234ABC',
  EstatHoraID: 'EstatHora_1',
  Data: '2024-04-23', // Formato 'YYYY-MM-DD'
};

export default function App({ practicaData }) {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [recording, setRecording] = useState(true);
  const [lastSavedLocation, setLastSavedLocation] = useState(null);
  const [isInRoute, setIsInRoute] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pointLocations, setPointLocations] = useState(initialPointLocations); // Utilizar el estado para manejar los puntos

  useEffect(() => {
    let intervalId;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      if (recording && isInRoute) {
        intervalId = setInterval(async () => {
          const newLocation = await Location.getCurrentPositionAsync({});
          console.log('Coordenadas: '+ newLocation.coords.altitude +' - '+ newLocation.coords.latitude)
          setLocation(newLocation.coords);
          setCurrentLocation(newLocation.coords); // Actualizar la ubicación actual

          if (
            !lastSavedLocation ||
            newLocation.coords.latitude !== lastSavedLocation.latitude ||
            newLocation.coords.longitude !== lastSavedLocation.longitude
          ) {
            setCoordinates((prev) => [
              ...prev,
              {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              },
            ]);
            setLastSavedLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
          }
        }, 3000);
      } else {
        clearInterval(intervalId);
      }
    })();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [recording, isInRoute, lastSavedLocation]);

  const handleButtonPress = async () => {
    if (!practicaData) {
      console.log('No se ha proporcionado una clase de práctica');
      practicaData = practicaData2;
      // return;
    }

    if (isInRoute) {
      setRecording(false);
      setIsInRoute(false);

      const routeGeoJSON = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates.map((coord) => [
            coord.longitude,
            coord.latitude,
          ]),
        },
        features: pointLocations.map((location, index) => ({
          type: "Feature",
          properties: {
            title: location.title,
            description: location.description,
          },
          geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          },
        })),
      };

      saveRouteFile(routeGeoJSON);

      setCoordinates([]);
      setPointLocations([]);
    } else {
      setCoordinates([]);
      setRecording(true);
      setIsInRoute(true);
    }
  };

  const saveRouteFile = async (routeData) => {
    try {
      const fileUri = FileSystem.documentDirectory + 'ruta.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(routeData));
      console.log('Ruta guardada en:', fileUri);
      console.log('Ruta: '+ JSON.stringify(routeData))
      await handleFileUpload(fileUri);
      deleteFile(fileUri);

    } catch (error) {
      console.error('Error al guardar la ruta:', error);
    }
  };

  /**
   * Eliminar un archivo
   * @param {*} fileUri URI del archivo a eliminar
   */
  const deleteFile = async (fileUri) => {
    try {
      await FileSystem.deleteAsync(fileUri);
      console.log('Archivo eliminado:', fileUri);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  const showRouteInMap = async () => {
    try {
      const fileUri = await ApiHelper.downloadFileFromMongo(practicaData2.Ruta); // Esperar a que se descargue el archivo
  
      console.log('File URI:', fileUri);
  
      const routeData = await FileSystem.readAsStringAsync(fileUri);
      const routeGeoJSON = JSON.parse(routeData);
  
      setCoordinates(routeGeoJSON.geometry.coordinates.map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      })));
  
      setPointLocations(routeGeoJSON.features.map((feature) => ({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        title: feature.properties.title,
        description: feature.properties.description,
      })));
    } catch (error) {
      console.error('Error al cargar la ruta:', error);
    }
  };
  

  const addPoint = () => {
    if (currentLocation) {
      setPointLocations((prevLocations) => [
        ...prevLocations,
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          title: "Punto de Interés",
          description: "Descripción del punto de interés",
        },
      ]);
    }
  };

  // Ejemplo de subir archivo a MongoDB
  const handleFileUpload = async (file) => {
    try {
      const objectID = await ApiHelper.uploadFileToMongo(file);
      console.log('ObjectID from MongoDB:', objectID);
      practicaData.Ruta = objectID;
      handleCreatePractica(practicaData);
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  // Ejemplo de crear práctica en SQL
  const handleCreatePractica = async (practicaData) => {
    try {
      const response = await ApiHelper.createPracticaInSQL(practicaData);
      console.log('Response from SQL:', response);
    } catch (error) {
      console.error('Error handling create practica:', error);
    }
  };


  return (
    <View style={styles.container}>
      {coordinates.length > 0 && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: currentLocation ? currentLocation.latitude : coordinates[0]?.latitude || 0,
            longitude: currentLocation ? currentLocation.longitude : coordinates[0]?.longitude || 0,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          {/* Marcadores de los puntos favoritos */}
          {pointLocations.map((favoriteLocation, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: favoriteLocation.latitude,
                longitude: favoriteLocation.longitude,
              }}
              title={favoriteLocation.title}
              description={favoriteLocation.description}
              pinColor="blue"
            />
          ))}
          
          {/* Marcador de la ubicación actual */}
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Mi Ubicación"
              description="Estoy aquí"
            >
              {/* Icono personalizado para la ubicación actual
              <Image
                source={require('./assets/favicon.png')}
                style={{ width: 24, height: 24 }}
              /> */}
            </Marker>
          )}
  
          {/* Polilínea */}
          <Polyline
            coordinates={coordinates}
            strokeWidth={5}
            strokeColor="grey"
          />
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isInRoute ? "Detener Ruta" : "Empezar Ruta"}
          onPress={handleButtonPress}
        />
        <Button
          title="Cargar Ruta"
          onPress={showRouteInMap}
        />
        <Button
          title="ADD POINT"
          onPress={addPoint}
        />
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});