import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "../Navigation/BackNavigation";
import { Button } from "react-native-paper";
import * as Location from "expo-location";
import polyline from "@mapbox/polyline";
import ApiHelper from "../../data/ApiHelper";

const MapScreen = ({ route }) => {
  const { student } = route.params;
  const alumnoId = student.ID; // Debes definir el ID del alumno
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [practicas, setPracticas] = useState([]);
  const [filteredPracticas, setFilteredPracticas] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchInitialLocation = async () => {
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
    };

    fetchInitialLocation();
    fetchPracticas();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [practicas, filters]);

  const fetchPracticas = async () => {
    try {
      const fetchedPracticas = await ApiHelper.fetchPracticasPorAlumno(alumnoId); // Debes definir alumnoId
      setPracticas(fetchedPracticas);
    } catch (error) {
      console.error("Error fetching practicas:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...practicas];

    // Aplicar filtros
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (filters[key]) {
          filtered = filtered.filter(practica => practica[key]);
        }
      }
    }

    setFilteredPracticas(filtered);
  };

  const toggleFilter = (key) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  const handleMapTouch = async (latitude, longitude) => {
    const API_KEY = "AIzaSyCNcRVPxV96NruUez95JitKhfMTB_9avcA";

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
        const distanceText = data.routes[0].legs[0].distance.text;
        const durationText = data.routes[0].legs[0].duration.text;
        console.log("Distància:", distanceText);
        console.log("Temps:", durationText);
        setDistance(distanceText);
        setDuration(durationText);

        const route = data.routes[0].overview_polyline.points;
        const decodedRoute = polyline.decode(route);

        setRouteCoordinates(
          decodedRoute.map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }))
        );
      } else {
        console.error("Directions error:", data.status);
      }
    } catch (error) {
      console.error("Directions request error:", error);
    }
  };

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
        {/* Renderizar las rutas */}
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
            {/* Renderizar filtros y controles de interruptor */}
            {practicas.map((practica) => (
              <View key={practica.id} style={styles.filterItem}>
                <Text>{practica.data}</Text>
                <Switch
                  value={filters[practica.id]}
                  onValueChange={() => toggleFilter(practica.id)}
                />
              </View>
            ))}
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
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default MapScreen;
