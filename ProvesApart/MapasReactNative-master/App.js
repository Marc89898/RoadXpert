import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [recording, setRecording] = useState(true);
  const [lastSavedLocation, setLastSavedLocation] = useState(null);
  // Variable para controlar la ruta
  const [isInRoute, setIsInRoute] = useState(false); 

  useEffect(() => {
    let intervalId;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      // Verificar si se está grabando y si la ruta está activa
      if (recording && isInRoute) { 
        intervalId = setInterval(async () => {
          // Obtener la ubicación actual
          const newLocation = await Location.getCurrentPositionAsync({});

          // Actualizar la ubicación actual
          setLocation(newLocation.coords);

          // Verificar si la ubicación actual es diferente a la última guardada
          if (
            !lastSavedLocation ||
            newLocation.coords.latitude !== lastSavedLocation.latitude ||
            newLocation.coords.longitude !== lastSavedLocation.longitude
          ) {

            // Guardar la ubicación actual
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
        }, 2000); // Guardar la ubicación cada 2 segundos
      } else {
        clearInterval(intervalId); // Detener el intervalo si la ruta no está activa
      }
    })();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [recording, isInRoute, lastSavedLocation]);

  const handleButtonPress = async () => {
    // Verificar si la ruta está activa
    if (isInRoute) {
      // Detener la grabación de la ruta
      setRecording(false);
      setIsInRoute(false);

      // Crear un objeto GeoJSON con la ruta
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
      };

      // Convertir el objeto GeoJSON a una cadena de texto
      const routeData = JSON.stringify(routeGeoJSON);

      // guardar la ruta en un archivo JSON y guardarlo en la carpeta de descargas
      saveRouteFile(routeData);
        
      // Limpiar las coordenadas de la ruta
      setCoordinates([]);

      // Mostrar la ruta en formato GeoJSON en la consola
      console.log(routeData);
    } else {
      // Iniciar la grabación de la ruta
      setRecording(true);
      setIsInRoute(true);
    }
  };

  const saveRouteFile = async (routeData) => {
    try {
      const fileUri = FileSystem.documentDirectory + 'ruta.json'; // Ruta del archivo en la carpeta de documentos
      // vaciar el archivo si ya existe
      await FileSystem.writeAsStringAsync(fileUri, '');
      await FileSystem.writeAsStringAsync(fileUri, routeData); // Escribir el archivo JSON
      console.log('Ruta guardada en:', fileUri);
    } catch (error) {
      console.error('Error al guardar la ruta:', error);
    }
  }

  const handleLoadRoutePress = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'ruta.json'; // Ruta del archivo en la carpeta de documentos
      const routeData = await FileSystem.readAsStringAsync(fileUri); // Leer el archivo JSON
      const routeGeoJSON = JSON.parse(routeData); // Convertir la cadena JSON a objeto GeoJSON
      
      // Mostrar la ruta en el mapa
      setCoordinates(routeGeoJSON.geometry.coordinates.map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      })));
    } catch (error) {
      console.error('Error al cargar la ruta:', error);
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