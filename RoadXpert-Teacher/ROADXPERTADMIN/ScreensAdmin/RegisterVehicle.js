import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackNavigation from "../Screens/Navigation/BackNavigation";
import CustomTextInput from "../Components/Inputs/CustomTextInput.js";
import MainButton from "../Components/Buttons/mainButton.js";
import { MaterialIcons } from "@expo/vector-icons";
import ColorPicker from "react-native-color-picker";
import CustomSelectInput from "../Components/Inputs/CustomSelectInput.js";
import { useNavigation } from "@react-navigation/native";

const RegisterVehicle = () => {
  const navigation = useNavigation();
  const [colorSeleccionado, setColorSeleccionado] = useState("black");
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const handleSave = () => {
    console.log("Guardado");
    navigation.navigate("CreateSchool");
  };

  const handleColorSeleccionado = (color) => {
    setColorSeleccionado(color);
    setMostrarSelector(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.header}>
          <Text style={styles.headerText}>Register Vehicle</Text>
        </View>

        <View style={styles.contentContainer}>
          <CustomSelectInput label="Tipo de vehiculo" value={Si} value2={No} />
          <CustomSelectInput label="Eliminar alumnos" />
          <CustomSelectInput label="Gestionar alumnos" />
          <MainButton title="Guardar" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 25,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  colorpick: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleContainer: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
  },
  rectangleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterVehicle;
