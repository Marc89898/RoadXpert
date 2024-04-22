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

const CreateRoles = () => {
  const navigation = useNavigation();
  const [colorSeleccionado, setColorSeleccionado] = useState("black");
  const [mostrarSelector, setMostrarSelector] = useState(false);

const handleSave = () => {
    console.log("Guardado");
    navigation.navigate("CreateSchool");
}

  const handleColorSeleccionado = (color) => {
    setColorSeleccionado(color);
    setMostrarSelector(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Drivingschool</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.colorSelectionContainer}>
            <Text style={styles.label}>Color</Text>
            <TouchableOpacity
              style={[styles.colorpick, { backgroundColor: colorSeleccionado }]}
              onPress={() => setMostrarSelector(true)}
            >
              <Text>Seleccionar Color</Text>
            </TouchableOpacity>
            {mostrarSelector && (
              <ColorPicker
                onColorSelected={handleColorSeleccionado}
                style={{ flex: 1 }}
              />
            )}
          </View>
          <CustomTextInput label="Rol name:" placeholder="Admin" />

          <View style={styles.rectangleContainer}>
            <Text style={styles.rectangleText}>Permisos de alumnos</Text>
          </View>
          <CustomSelectInput label="Crear alumnos"/>
          <CustomSelectInput label="Eliminar alumnos"/>
          <CustomSelectInput label="Gestionar alumnos"/>

          <View style={styles.rectangleContainer}>
            <Text style={styles.rectangleText}>Permisos de vehiculos</Text>
          </View>
          <CustomSelectInput label="Crear vehiculos"/>
          <CustomSelectInput label="Eliminar vehiculos"/>
          <CustomSelectInput label="Gestionar vehiculos"/>
          
          <View style={styles.rectangleContainer}>
            <Text style={styles.rectangleText}>Permisos de professores</Text>
          </View>
          <CustomSelectInput label="Crear professores"/>
          <CustomSelectInput label="Eliminar professores"/>
          <CustomSelectInput label="Gestionar professores"/>

        </View>
          <MainButton title="Guardar" onPress={handleSave} />
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

export default CreateRoles;
