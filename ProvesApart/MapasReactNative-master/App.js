import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";

const initialPointLocations = []; // Inicializar el array de puntos fuera del componente

export default function App() {
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
        }, 2000);
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

  const showRouteInMap = async (routeUrl) => {
    try {
      routeUrl = 'ruta.json'

      const fileUri = FileSystem.documentDirectory + routeUrl;
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
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            ...location,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          {pointLocations.map((favoriteLocation, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: favoriteLocation.latitude,
                longitude: favoriteLocation.longitude,
              }}
              title={favoriteLocation.title}
              description={favoriteLocation.description}
              pinColor="blue" // Establecer el color del marcador en azul
            />
          ))}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Mi Ubicación"
            description="Estoy aquí"
          />
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
          onPress={handleLoadRoutePress}
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


