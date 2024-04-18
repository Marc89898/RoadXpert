import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

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

  const handleButtonPress = () => {
    if (isInRoute) {
      setRecording(false);
      setIsInRoute(false); // Detener la grabación y la ruta
      const locationData = JSON.stringify(coordinates);
      console.log(locationData);
    } else {
      setRecording(true);
      setIsInRoute(true); // Iniciar la grabación y la ruta
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
            strokeColor="blue"
          />
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isInRoute ? "Detener Ruta" : "Empezar Ruta"}
          onPress={handleButtonPress}
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