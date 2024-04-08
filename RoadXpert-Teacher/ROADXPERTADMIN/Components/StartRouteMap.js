import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "./BottomNavigation/BackNavigation";

const StartRouteMap = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
        setLocation(newLocation);
        setRouteCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          },
        ]);
      });
    })();
  }, []);

  const goToPostPractice = () => {
    navigation.navigate("PostPractice");
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF0000" // color de la línea de la ruta
            strokeWidth={6} // ancho de la línea
          />
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi Ubicación"
          />
        </MapView>
      )}

      <BackNavigation />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Práctica 8</Text>
          <TouchableOpacity style={styles.infoIconContainer}>
            <Icon name="info-circle" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <TouchableOpacity style={styles.microphoneCircle}>
              <Icon name="microphone" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.addressText}>Carrer de riudara, 25</Text>
            <Text style={styles.addressText}>OLOT</Text>
          </View>
          <TouchableOpacity
            style={styles.flagIconContainer}
            onPress={goToPostPractice}
          >
            <View style={styles.flagCircle}>
              <Icon name="flag-checkered" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    marginBottom: 20,
    flex: 1,
  },
  infoIconContainer: {
    marginLeft: 10,
  },
  addressContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    left: 20,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  flagIconContainer: {
    marginLeft: 5,
    width: 57,
    height: 57,
    borderRadius: 28.5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  flagCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  microphoneCircle: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartRouteMap;
