import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import AudioManager from "./Models/AudioManager";
import GPTManager from "./Models/GPTManager";
import ApiHelper from "../../../data/ApiHelper";

const StartRouteMap = ({ route }) => {
  // const { practiceData } = route.params;

  const navigation = useNavigation();
  // route managment
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [pointLocations, setPointLocations] = useState([]);
  // Información de la dirección actual
  const [street, setStreet] = useState(null);
  const [number, setNumber] = useState(null);
  const [city, setCity] = useState(null);
  // Modal de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [practiceID, setPracticeID] = useState(null);
  const [routeID, setRouteID] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const toggleConfirmationModal = () => setShowConfirmation(!showConfirmation);

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const confirmFinishPractice = async () => {
    await generateRouteFile();
    // practiceData.HoraFi = new Date().toLocaleTimeString('en-US', { hour12: false });
    // anadir atributo a la practica de TotalAnotacions
    // practiceData.TotalAnotacions = pointLocations.length ? pointLocations.length : 0;
    practiceData.Ruta = routeID;

    try {
      // await ApiHelper.updatePracticaInSQL(practiceData);
    } catch (error) {
      console.error("Error updating practice:", error);
    }

    // // navigation.navigate("PostPractice", { practiceData: practiceData });
  };

  useEffect(() => {
    let intervalId;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      intervalId = setInterval(async () => {
        const newLocation = await Location.getCurrentPositionAsync({});
        setCurrentLocation(newLocation.coords);

        // Verificar si la nueva coordenada es diferente a la última agregada
        const lastCoordinate = coordinates[coordinates.length - 1];
        if (
          !lastCoordinate ||
          (newLocation.coords.latitude !== lastCoordinate.latitude &&
            newLocation.coords.longitude !== lastCoordinate.longitude)
        ) {
          // Agregar la nueva coordenada solo si es diferente
          setCoordinates((prev) => [
            ...prev,
            {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            },
          ]);

          let addressResponse = await Location.reverseGeocodeAsync({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });

          if (addressResponse.length > 0) {
            setStreet(addressResponse[0].street);
            setNumber(addressResponse[0].name);
            setCity(addressResponse[0].city);
          }
        }
      }, 2000);
    })();
  }, [recording]);

  useEffect(() => {
    const createPractice = async () => {
      try {
        // const newPractice = await ApiHelper.createPracticaInSQL(practiceData);
        console.log("Práctica creada:", newPractice.ID);
        // setPracticeID(newPractice.ID);
        // practiceData.ID = newPractice.ID;
      } catch (error) {
        console.error("Error creating practice:", error);
      }
    };

    createPractice();
  }, []);

  const startRecording = async () => {
    try {
      if (isLoading) {
        return;
      }
      const recording = await AudioManager.startRecording();
      setRecording(recording);
      console.log("Grabación iniciada");
    } catch (err) {
      console.error("Error al iniciar la grabación:", err);
    }
  };

  const stopRecording = async () => {
    try {
      setLoading(true);
      const audioUri = await AudioManager.stopRecording(recording);
      setRecording(undefined);
      const text = await AudioManager.speechToText(audioUri);
      const respondeGPT = await GPTManager.interpretGPT(text);

      try {
        addAnotacioToRoute(respondeGPT);
      } catch (error) {
        console.log("No se pudo interpretar el texto");
        addAnotacioToRoute(null);
        return;
      } finally {
        setLoading(false);
      }

      // setRespondeGPT(respondeGPT.tipo + ", " + respondeGPT.CategoriaEscrita + ", " + respondeGPT.categoriaNumerica + ", " + respondeGPT.gravedad);
      setLoading(false);
    } catch (error) {
      console.error("Error al detener la grabación:", error);
    }
  };

  const addAnotacioToRoute = async (anotacio) => {
    if (currentLocation && anotacio != null) {
      const position = `${currentLocation.latitude},${currentLocation.longitude}`;
      const descripcion =
        anotacio.CategoriaEscrita +
        ", " +
        anotacio.categoriaNumerica +
        ", " +
        anotacio.gravedad;
      // const practicaID = practiceData.ID;
      // const alumneID = practiceData.AlumneID;

      try {
        const response = await ApiHelper.addNewAnotacion({
          Tipus: anotacio.tipo,
          Descripcio: descripcion,
          Posicio: position,
          CategoriaEscrita: anotacio.CategoriaEscrita,
          CategoriaNumerica: anotacio.categoriaNumerica,
          Gravedad: anotacio.gravedad,
          PracticaID: practicaID,
          AlumneID: alumneID,
        });
        console.log("Anotación añadida correctamente:", response);
        setPointLocations((prevLocations) => [
          ...prevLocations,
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            title: anotacio.tipo,
            description: descripcion,
          },
        ]);
      } catch (error) {
        console.error("Error al añadir la anotación:", error);
      }
    } else if (currentLocation && anotacio == null) {
      setPointLocations((prevLocations) => [
        ...prevLocations,
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          title: "Anotación",
          description: "No se pudo interpretar el audio",
        },
      ]);
    }
  };

  const generateRouteFile = async () => {
    try {
      // Crear routeGeoJSON cuando se detiene la grabación
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

      // Guardar la ruta
      await saveRouteFile(routeGeoJSON);
    } catch (error) {
      console.error("Error saving route data:", error);
    }
  };

  const saveRouteFile = async (routeData) => {
    try {
      const fileUri = FileSystem.documentDirectory + "ruta.json";
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(routeData));
      console.log("Ruta guardada en:", fileUri);
      console.log("Ruta: " + JSON.stringify(routeData));
      await handleFileUpload(fileUri);
      handleDeleteFile(fileUri);
    } catch (error) {
      console.error("Error al guardar la ruta:", error);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const objectID = await ApiHelper.uploadFileToMongo(file);
      console.log("ObjectID from MongoDB:", objectID);
      // setRouteID(objectID);
      // practiceData.Ruta = objectID;
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleCreatePractica = async (practicaData) => {
    try {
      const response = await ApiHelper.createPracticaInSQL(practicaData);
      console.log("Response from SQL:", response);
    } catch (error) {
      console.error("Error handling create practica:", error);
    }
  };

  const handleDeleteFile = async (fileUri) => {
    try {
      await FileSystem.deleteAsync(fileUri);
      console.log("Archivo eliminado:", fileUri);
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
    }
  };

  return (
    <View style={styles.container}>
      {coordinates.length > 0 && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: currentLocation
              ? currentLocation.latitude
              : coordinates[0]?.latitude || 0,
            longitude: currentLocation
              ? currentLocation.longitude
              : coordinates[0]?.longitude || 0,
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
              pinColor="blue"
            />
          ))}

          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Mi Ubicación"
              description="Estoy aquí"
            />
          )}

          <Polyline
            coordinates={coordinates}
            strokeWidth={5}
            strokeColor="grey"
          />
        </MapView>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Práctica 8</Text>
          <TouchableOpacity
            style={styles.infoIconContainer}
            onPress={toggleInfoModal}
          >
            <Icon name="info-circle" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <TouchableOpacity
              onPress={startRecording}
              style={[
                styles.microphoneCircle,
                {
                  backgroundColor: recording ? "red" : "black",
                  transform: recording ? [{ scale: 1.2 }] : [{ scale: 1 }],
                },
              ]}
            >
              <View style={[styles.btnContainer]}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Icon
                    name="microphone"
                    size={24}
                    color="white"
                    onPress={recording ? stopRecording : startRecording}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.addressText}>
              {street} {number}
            </Text>
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
                  source={require("../../../assets/images/StartRouteMap/FinishLineIcon.png")}
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={showInfoModal}
            onRequestClose={toggleInfoModal}
          >
            <View style={styles.centeredView2}>
              <View style={styles.modalView2}>
                <Text style={styles.modalTitle2}>Información</Text>
                <View style={styles.modalContent2}>
                  <Icon
                    style={styles.icon2}
                    name="flag-checkered"
                    size={24}
                    color="black"
                  />
                  <View style={styles.modalTextContainer2}>
                    <Text style={styles.modalText2}>Finalitzar Practica.</Text>
                  </View>
                </View>
                <View style={styles.modalContent2}>
                  <Icon style={styles.icon2} name="microphone" size={24} color="black" />
                  <View style={styles.modalTextContainer2}>
                    <Text style={styles.modalText2}>Pulsa para grabar el error.</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.closeButton2}
                  onPress={toggleInfoModal}
                >
                  <Text style={styles.closeButtonText2}>Cerrar</Text>
                </TouchableOpacity>
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
    paddingTop: 70,
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
  modalImageModal: {
    width: 40,
    height: 40,
    resizeMode: "contain",
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

  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView2: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset2: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  modalContent2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon2: {
    marginRight: 16,
  },
  modalImage2: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  modalTitle2: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalText2: {
    fontSize: 16,
    color: "#666",
  },
  closeButton2: {
    backgroundColor: "lightblue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText2: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StartRouteMap;
