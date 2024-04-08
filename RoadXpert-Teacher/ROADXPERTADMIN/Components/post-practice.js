import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import BackNavigation from "./BottomNavigation/BackNavigation";
import SignatureCanvas from "react-native-signature-canvas";
import MainButton from "../assets/Buttons/mainButton.js";
import CustomTextInput from "../assets/Inputs/CustomTextInput.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PostPractice = () => {
  const signatureRef = useRef();
  const navigation = useNavigation();

  const handleStartButtonPress = () => {
    navigation.navigate("StartRouteMap");
  };

  const handleClearSignature = () => {
    signatureRef.current.clearSignature();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Resultados de la practica</Text>
          <CustomTextInput label="Duracion total:" placeholder="58 mins" />
          <CustomTextInput label="Errores:" placeholder="3 errores" />
          <CustomTextInput label="Distancia recorrida:" placeholder="7km" />
          <CustomTextInput label="Maxima Velocidad:" placeholder="43km/h" />
          <Text style={styles.alumnoDataText}>Datos del alumno</Text>
          <CustomTextInput
            label="Nombre del alumno:"
            placeholder="Josep Maria"
          />
          <CustomTextInput
            label="Num. Practica"
            placeholder="Practica 8"
          />
          <CustomTextInput
            label="Nombre de la practica:"
            placeholder="Subidas i aparcamientos"
          />
          <View style={styles.signatureContainer}>
            <Text>Firma del alumno:</Text>
            <SignatureCanvas
              ref={signatureRef}
              backgroundColor="#fff"
              penColor="#000"
              style={styles.signatureCanvas}
            />
            <TouchableOpacity
              style={styles.clearButtonContainer}
              onPress={handleClearSignature}
            >
              <Icon name="trash" size={30} color="red" />
            </TouchableOpacity>
          </View>

          <View>
            <MainButton
              onPress={handleStartButtonPress}
              title="Finalizar Practica"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerText: {
    width: "75%",
    fontSize: 25,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  signatureContainer: {
    position: "relative",
    marginTop: 30,
  },
  alumnoDataText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  signatureCanvas: {
    height: 200,
    borderWidth: 1,
    borderColor: "#000",
  },
  clearButtonContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo transparente para que sea visible
    padding: 5,
    borderRadius: 5,
  },
});

export default PostPractice;
