import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  // Audio managment
  Button,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { getTrafficData } from "./api/trafficService";
// import * as AsyncStorage from '@react-native-community/async-storage';

// audio amanagment
import axios from 'axios';
import { Audio } from 'expo-av';
// import env from '../env';
import env from '../env.js';
import ms from '../prompts/messagesGPT.json';

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

  // Audio managment start
  const [isLoading, setLoading] = useState(false);
  const [recording, setRecording] = useState();
  const [transcriptionText, setTranscriptionText] = useState('');
  const [respondeGPT, setRespondeGPT] = useState('');
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  // Audio managment end

  const toggleConfirmationModal = () => {
    setShowConfirmation(!showConfirmation);
  };

  const confirmFinishPractice = () => {
    navigation.navigate("PostPractice");
    saveRoute();
  };

  const saveRoute = async () => {
    try {
      const routeData = JSON.stringify(routeCoordinates);
      await AsyncStorage.setItem("savedRoute", routeData);
      console.log("Route data saved successfully!");
    } catch (error) {
      console.error("Error saving route data:", error);
    }
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


  // Audio managment start
  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    try {
      const text = await speechToText(uri);
      setTranscriptionText(text);

      const respondeGPT = await interpretGPT(text);
      if (respondeGPT === undefined) {
        setRespondeGPT('No se pudo interpretar el texto');
        return;
      }

      setRespondeGPT(respondeGPT.tipo + ", " + respondeGPT.CategoriaEscrita + ", " + respondeGPT.categoriaNumerica + ", " + respondeGPT.gravedad);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscriptionText('Error occurred during transcription.');
    }
  }



  const speechToText = async (audioURL) => {
    setLoading(true);
    try {
      const uploadUrl = await uploadAudio(audioURL);
      const transcriptText = await transcribeAudio(uploadUrl);
      setLoading(false);
      return transcriptText;
    } catch (error) {
      console.error("Error al transcribir el audio:", error);
      setLoading(false);
      throw new Error(`Error al transcribir el audio: ${error.message}`);
    }
  };

  const uploadAudio = async (audioURL) => {
    const baseUrl = 'https://api.assemblyai.com/v2';
    const headers = { authorization: env.ASSEMBLY_API_KEY };

    const audioData = await fetch(audioURL);
    const audioBlob = await audioData.arrayBuffer();

    const uploadResponse = await axios.post(`${baseUrl}/upload`, audioBlob, { headers });
    return uploadResponse.data.upload_url;
  };

  const transcribeAudio = async (uploadUrl) => {
    const baseUrl = 'https://api.assemblyai.com/v2';
    const headers = { authorization: env.ASSEMBLY_API_KEY };

    const data = { audio_url: uploadUrl, language_code: 'es' };
    const response = await axios.post(`${baseUrl}/transcript`, data, { headers });

    const transcriptId = response.data.id;
    const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;

    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, { headers });
      const transcriptionResult = pollingResponse.data;

      if (transcriptionResult.status === 'completed') {
        return transcriptionResult.text;
      } else if (transcriptionResult.status === 'error') {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  const interpretGPT = async (text) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...ms, { role: "user", content: text }] // aqui debe ir todo el jsonjunto al 'text'
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.GPT3_API_KEY}`,
          },
        }
      );
      const completions = response.data.choices;
      if (completions.length > 0) {
        const completionText = completions[0].message.content;
        console.log("GPT3 Completions:", completionText);

        return new Anotacio(completionText);

      }
    } catch (error) {
      console.error("Error al interpretar texto con GPT-3:", error);
    }
  };

  // Audio managment end

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

            {/* Audio managment start */}
            <TouchableOpacity onPress={startRecording} style={[styles.microphoneCircle, { backgroundColor: recording ? 'red' : 'black', transform: recording ? [{ scale: 1.2 }] : [{ scale: 1 }] }]}>
              <View style={[styles.btnContainer]}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Icon name="microphone" size={24} color="white" onPress={recording ? stopRecording : startRecording} />
                )}
              </View>
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

class Anotacio {
  constructor(jsonString) {
    const jsonObject = JSON.parse(jsonString);
    this.tipo = jsonObject.tipo;
    this.CategoriaEscrita = jsonObject.CategoriaEscrita;
    this.categoriaNumerica = jsonObject.categoriaNumerica;
    this.gravedad = jsonObject.gravedad;
  }
}

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
