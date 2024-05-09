import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "../Navigation/BackNavigation";
import { Button } from "react-native-paper";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import ApiHelper from "../../data/ApiHelper";

const MapScreen = ({ route }) => {
  const { student } = route.params;
  const alumnoId = student.ID;
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);
  const [practicas, setPracticas] = useState([]);
  const [practiceRouteFilters, setPracticeRouteFilters] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [markers, setMarkers] = useState([]);

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
    renderPracticeRoutes();
    renderMarkers();
  }, [practiceRouteFilters]);

  const fetchPracticas = async () => {
    try {
      const fetchedPracticas = await ApiHelper.fetchPracticasPorAlumno(alumnoId);
      const filters = fetchedPracticas.map(practica => ({
        id: practica.id,
        url: practica.ruta,
        showing: false
      }));
      // console log del numero de las practicas que hay
      setPracticas(fetchedPracticas);
      console.log("Numero de fetchedPracticas:", fetchedPracticas.length);
      setPracticeRouteFilters(filters);
      console.log("Numero de filters:", filters.length);
    } catch (error) {
      console.error("Error fetching practicas:", error);
    }
  };

  const toggleFilter = (id) => {
    setPracticeRouteFilters(prevFilters =>
      prevFilters.map(filter =>
        filter.id === id ? { ...filter, showing: !filter.showing } : filter
      )
    );
  };

  const renderPracticeRoutes = async () => {
    const routes = [];
    for (const filter of practiceRouteFilters) {
      if (filter.showing) {
        const coordinates = await getPracticeRouteCoordinates(filter.url);
        routes.push(coordinates);
      }
    }
    setRouteCoordinates(routes);
  };

  const renderMarkers = async () => {
    const markers = [];
    for (const filter of practiceRouteFilters) {
      if (filter.showing) {
        const practiceMarkers = await getPracticeMarkers(filter.url);
        markers.push(...practiceMarkers);
      }
    }
    setMarkers(markers);
  };

  const getPracticeRouteCoordinates = async (rutaId) => {
    try {
      const fileUri = await ApiHelper.downloadFileFromMongo(rutaId);
      const routeData = await FileSystem.readAsStringAsync(fileUri);
      const routeGeoJSON = JSON.parse(routeData);

      return routeGeoJSON.geometry.coordinates.map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
    } catch (error) {
      console.error("Error al cargar la ruta:", error);
      return [];
    }
  };

  const getPracticeMarkers = async (rutaId) => {
    try {
      const fileUri = await ApiHelper.downloadFileFromMongo(rutaId);
      const routeData = await FileSystem.readAsStringAsync(fileUri);
      const routeGeoJSON = JSON.parse(routeData);

      if (routeGeoJSON.features) {
        return routeGeoJSON.features.map((feature) => ({
          id: feature.properties.id,
          coordinate: {
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          },
          title: feature.properties.title,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al cargar los marcadores:", error);
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <BackNavigation style={styles.backNavigation} />
      <MapView
        style={[styles.map, { zIndex: -1 }]}
        initialRegion={initialPosition}
      >
        {routeCoordinates.map((coordinates, index) => (
          <Polyline
            key={index}
            coordinates={coordinates}
            strokeColor="blue"
            strokeWidth={2}
          />
        ))}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            // description={marker.description}
            pinColor="orange"
          />
        ))}
      </MapView>
      <View style={styles.header}>
        <Text style={styles.headerText}>{student.Nom}</Text>
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
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Prácticas</Text>
            <ScrollView contentContainerStyle={styles.modalScrollView}>
              {practiceRouteFilters.map((filter) => (
                <View key={filter.id} style={styles.filterItem}>
                  <Text>{(practicas.find(practica => practica.id === filter.id)?.data || "").slice(0, 16)}</Text>
                  <Text>{practiceRouteFilters.length}</Text>
                  <Switch
                    value={filter.showing}
                    onValueChange={() => toggleFilter(filter.id)}
                  />
                </View>
              ))}
            </ScrollView>
            <Button
              style={styles.exitButton}
              mode="contained"
              onPress={() => setModalVisible(false)}
            >
              Guardar
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalScrollView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 2,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  modalContent: {
    justifyContent: "flex-end",
    marginBottom: 0,
    marginTop: 150,
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: "left",
    color: "black",
  },
  exitButton: {
    marginHorizontal: 20,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default MapScreen;
