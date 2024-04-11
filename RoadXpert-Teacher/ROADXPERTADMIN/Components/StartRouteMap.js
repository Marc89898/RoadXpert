import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { getTrafficData } from "./api/trafficService";

const StartRouteMap = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [street, setStreet] = useState(null);
  const [number, setNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [trafficData, setTrafficData] = useState([]);

  const toggleConfirmationModal = () => {
    setShowConfirmation(!showConfirmation);
  };

  const confirmFinishPractice = () => {
    navigation.navigate("PostPractice");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResponse.length > 0) {
        setStreet(addressResponse[0].street);
        setNumber(addressResponse[0].name);
        setCity(addressResponse[0].city);
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

        const fetchTrafficData = async () => {
          try {
            const data = await getTrafficData(
              newLocation.coords.latitude,
              newLocation.coords.longitude
            );
            setTrafficData(data);
          } catch (error) {
            console.error("Error al obtener datos de tráfico:", error);
          }
        };
        fetchTrafficData();
      });
    })();
  }, []);

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
            strokeColor="#FF0000"
            strokeWidth={6}
          />
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi Ubicación"
          />
          {trafficData.map((trafficPoint, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: trafficPoint.latitude,
                longitude: trafficPoint.longitude,
              }}
              title="Tráfico"
              description={`Intensidad: ${trafficPoint.intensity}`}
              pinColor="red"
            />
          ))}
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
            <Text style={styles.addressText}>{street} {number}</Text>
            <Text style={styles.cityText}>{city}</Text>
          </View>
          <TouchableOpacity
            style={styles.flagIconContainer}
            onPress={toggleConfirmationModal}
          >
            <View style={styles.flagCircle}>
              <Icon name="flag-checkered" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmation}
            onRequestClose={toggleConfirmationModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={require("../assets/images/StartRouteMap/FinishLineIcon.png")}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>
                  ¿Está seguro que desea finalizar la sesión de práctica?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={confirmFinishPractice}
                  >
                    <Text style={styles.buttonText}>CONFIRMAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={toggleConfirmationModal}
                  >
                    <Text style={styles.buttonText}>CANCELAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  cityText: {
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
