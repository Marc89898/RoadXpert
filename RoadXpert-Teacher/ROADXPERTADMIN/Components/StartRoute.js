import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { AudioRecorderPlayer } from "react-native-audio-recorder-player";

const StartRoute = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    const audioRecorderPlayer = new AudioRecorderPlayer();
    try {
      const path = "your-file-path-here"; 
      const result = await audioRecorderPlayer.startRecorder(path);
      console.log("Recording started", result);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    const audioRecorderPlayer = new AudioRecorderPlayer();
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      console.log("Recording stopped", result);
      setIsRecording(false);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 42.1821,
          longitude: 2.4897,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <BackNavigation />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Práctica 8</Text>
          <TouchableOpacity style={styles.infoIconContainer}>
            <Icon name="info-circle" size={24} color="blue" />
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <TouchableOpacity
              style={styles.microphoneCircle}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Icon name="microphone" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.addressText}>Carrer de riudara, 25</Text>
            <Text style={styles.addressText}>OLOT</Text>
          </View>
          <View style={styles.flagIconContainer}>
            <View style={styles.flagCircle}>
              <Icon name="flag-checkered" size={24} color="black" />
            </View>
          </View>
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

export default StartRoute;
