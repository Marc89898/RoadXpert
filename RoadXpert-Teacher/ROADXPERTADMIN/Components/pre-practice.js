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

const PrePractice = () => {
  const signatureRef = useRef();
  const navigation = useNavigation();

  const handleStartButtonPress = () => {
    navigation.navigate("StartRoute"); 
  };

  const handleClearSignature = () => {
    signatureRef.current.clearSignature();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Pre-Practice</Text>
          <CustomTextInput
            label="Nombre del alumno:"
            placeholder="Youssef Joubayr Mejd El Aarab"
          />
          <CustomTextInput
            label="Num. Práctica:"
            placeholder="Escriba aquí ..."
          />
          <CustomTextInput
            label="Tipo de carnet:"
            placeholder="Escriba aquí ..."
          />
          <CustomTextInput
            label="Nombre de la práctica:"
            placeholder="Escriba aquí ..."
          />
          <CustomTextInput
            label="Duración de la práctica:"
            placeholder="Escriba aquí ..."
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
              title="Arranquemos!!"
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

export default PrePractice;
