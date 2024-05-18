import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import MainButton from "../../../../../Components/Buttons/mainButton.js";
import CustomSelectInput from "../../../../../Components/Inputs/CustomSelectInput.js";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked.js";
import { useNavigation } from "@react-navigation/native";
import { APIService } from "../../../../../ApiService.js";
import Modal from 'react-native-modal';

const AdminRegisterVehicle = () => {
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState({
    matricula: "",
    marca: "",
    model: "",
    anyFabricacio: "",
    tipus: "",
    color: ""
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSave = async () => {
    try {
      const response = await APIService.postVehicle(vehicle);
      if (response) {
        console.log("Creado correctamente");
        toggleModal();
      } else {
        console.log("Error en el post del vehículo")
      }
    } catch (error) {
      console.error("Error al crear el vehículo:", error);
    }
  };

  const handleChangeText = (key, value) => {
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [key]: value,
    }));
  };

  const handleTipoChange = (tipo) => {
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      tipus: tipo,
    }));
  };

  const opcionesVehicles = [
    { label: "Coche", value: "Coche" },
    { label: "Motocicleta", value: "Motocicleta" },
    { label: "Camion", value: "Camion" },
    { label: "Tractor", value: "Tractor" },
    { label: "Avion", value: "Avion" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.header}>
          <Text style={styles.headerText}>Register Vehicle</Text>
        </View>

        <View style={styles.contentContainer}>
          <CustomSelectInput
            options={opcionesVehicles}
            onSelect={handleTipoChange}
          />
          <CustomTextInputUnlocked
            placeholder="Matricula"
            onChangeText={(text) => handleChangeText("matricula", text)}
          />
          <CustomTextInputUnlocked
            placeholder="Marca"
            onChangeText={(text) => handleChangeText("marca", text)}
          />
          <CustomTextInputUnlocked
            placeholder="Modelo"
            onChangeText={(text) => handleChangeText("model", text)}
          />
          <CustomTextInputUnlocked
            placeholder="Año"
            onChangeText={(text) => handleChangeText("anyFabricacio", text)}
          />
          <CustomTextInputUnlocked
            placeholder="Color"
            onChangeText={(text) => handleChangeText("color", text)}
          />
        </View>
      </View>
      <MainButton title="Guardar" onPress={handleSave} />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Vehículo creado correctamente</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.modalButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 25,
  },
  contentContainer: {
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    color: "white",
    padding: 10,
    borderRadius: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AdminRegisterVehicle;
