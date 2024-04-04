// PrePractice.js

import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import BackNavigation from "./BottomNavigation/BackNavigation";
import SignatureCanvas from "react-native-signature-canvas";
import MainButton from "../assets/Buttons/mainButton.js";
import CustomTextInput from "../assets/Inputs/CustomTextInput.js";

const PrePractice = () => {
  const signatureRef = useRef();

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
            <View style={styles.clearButtonContainer}>
              <Button title="Limpiar Firma" onPress={handleClearSignature} />
            </View>
          </View>
          <View>
            <MainButton title="Arranquemos!!" />
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
    marginTop: 30,
  },
  signatureCanvas: {
    height: 200,
    borderWidth: 1,
    borderColor: "#000",
  },
  clearButtonContainer: {
    marginTop: 10,
  },
});

export default PrePractice;
