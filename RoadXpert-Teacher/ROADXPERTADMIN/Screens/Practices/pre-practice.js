import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import SignatureCanvas from "react-native-signature-canvas";
import MainButton from "../../Components/Buttons/mainButton.js";
import CustomTextInput from "../../Components/Inputs/CustomTextInput.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PrePractice = () => {
  const navigation = useNavigation();
  const signatureRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const handleClearSignature = () => {
    signatureRef.current.clearSignature();
  };

  const handleSaveSignature = () => {
    setShowModal(false); 
  };

  const handleStartButtonPress = () => {
    navigation.navigate("StartRouteMap"); 
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
            <Text style={styles.signatureText}>Firma del alumno:</Text>
            <TouchableOpacity
              style={styles.signatureButton}
              onPress={() => setShowModal(true)}
            >
              <Icon name="pencil" size={20} color="black" />
              <Text style={styles.signatureButtonText}>Firmar</Text>
            </TouchableOpacity>
          </View>
          <MainButton onPress={handleStartButtonPress} title="Arranquemos!!" />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Firma del alumno</Text>
            <View style={styles.signatureCanvasContainer}>
              <SignatureCanvas
                ref={signatureRef}
                backgroundColor="#fff"
                penColor="#000"
                style={styles.signatureCanvas}
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleClearSignature}
              >
                <Text style={[styles.modalButtonText, {color: "red"}]}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#5cb85c" }]}
                onPress={handleSaveSignature}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: "flex-start",
  },
  signatureText: {
    marginBottom: 10,
  },
  signatureButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  signatureButtonText: {
    marginLeft: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    height: 300,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  signatureCanvasContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 150,
  },
  signatureCanvas: {
    height: 200,
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PrePractice;