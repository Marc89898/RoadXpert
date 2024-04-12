import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { Button } from "react-native-paper";
import { GoogleMapsServices } from "react-native-google-maps-services";
import * as Location from "expo-location";

const MapScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);

  const handleMapTouch = async (latitude, longitude) => {
    const API_KEY = "YOUR_API_KEY"; // Replace with your Google Maps API key

    const url = `https://maps.googleapis.com/maps/api/directions/json?`;
    const params = new URLSearchParams({
      origin: `${initialPosition.latitude},${initialPosition.longitude}`, 
      destination: `${latitude},${longitude}`, 
      mode: "driving", 
      key: API_KEY,
    });

    try {
      const response = await fetch(url + params.toString());
      const data = await response.json();

      if (data.status === "OK") {
        console.log("Directions:", data.routes[0].legs[0]); 
      } else {
        console.error("Directions error:", data.status);
      }
    } catch (error) {
      console.error("Directions request error:", error);
    }
    
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <BackNavigation style={styles.backNavigation} />
      <MapView
        style={[styles.map, { zIndex: -1 }]}
        initialRegion={initialPosition}
        onPress={(event) => {
          const { nativeEvent } = event;
          const latitude = nativeEvent.coordinate.latitude;
          const longitude = nativeEvent.coordinate.longitude;
          handleMapTouch(latitude, longitude);
        }}
      >
        {initialPosition && (
          <Marker
            coordinate={{
              latitude: initialPosition.latitude,
              longitude: initialPosition.longitude,
            }}
          />
        )}
      </MapView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Maps</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Filtrar</Text>
            <View style={styles.viewModel}></View>
            <Button
              style={styles.continueButton}
              mode="contained"
              onPress={() => setModalVisible(false)}
            >
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  backNavigation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    position: "absolute",
    top: 100,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  headerText: {
    fontSize: 25,
    color: "black",
  },
  icon: {
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
  },
  viewModel: {
    borderRadius: 15,
    height: 200,
    backgroundColor: "grey",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    fontSize: 25,
    color: "black",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MapScreen;
