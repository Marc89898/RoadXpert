import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [recording, setRecording] = useState(true); 
  const [watchId, setWatchId] = useState(null); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      if (recording) {
        intervalId = setInterval(async () => {
          const newLocation = await Location.getCurrentPositionAsync({}); // Obtener la ubicación actual
          setLocation(newLocation.coords);
          setCoordinates((prev) => [
            ...prev,
            {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            },
          ]);
        }, 6000);
      }
    })();

    return () => {
      if (watchId) {
        watchId.remove(); // Detener la actualización de la ubicación al desmontar el componente
      }
    };
  }, [recording]);

  const handleButtonPress = () => {
    setRecording(false); // Detener la grabación al presionar el botón
    const locationData = JSON.stringify(coordinates); // Conv ertir las coordenadas a JSON
    console.log(locationData); // Mostrar el JSON en la consola
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
        <Button title="Detener Recorrido" onPress={handleButtonPress} />
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
