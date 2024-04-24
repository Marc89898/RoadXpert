import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackNavigation from "../Screens/Navigation/BackNavigation";
import MainButton from "../Components/Buttons/mainButton.js";
import CustomSelectInput from "../Components/Inputs/CustomSelectInput.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../Components/Inputs/CustomTextInput.js";

const RegisterVehicle = () => {
  const navigation = useNavigation();

  const handleSave = () => {
    console.log("Guardado");
    navigation.navigate("CreateSchool");
  };

  const opcionesVehicles = [
    { label: "Coche", value: "Coche" },
    { label: "Motocicleta", value: "Motocicleta" },
    { label: "Camion", value: "Camion" },
    { label: "Tractor", value: "Tractor" },
    { label: "Avion", value: "Avion" },
  ];

  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission denied",
          "You need to enable permission to access the library"
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setImage(pickerResult.uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.header}>
          <Text style={styles.headerText}>Register Vehicle</Text>
        </View>

        <View style={styles.contentContainer}>
          <CustomSelectInput
            label="Eliminar alumnos"
            options={opcionesVehicles}
          />
          <CustomTextInput
            label="Marca de vehiculo:"
            placeholder="Volkswagen"
          />
          <CustomTextInput label="Modelo de vehiculo:" placeholder="Golf" />
          <CustomTextInput label="CV de potencia:" placeholder="125cv" />
          <CustomTextInput label="Motor:" placeholder="2.0 TDI" />
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Vehicle image:</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleImageUpload(false)}
            >
              <MaterialIcons name="cloud-upload" size={24} color="black" />
            </TouchableOpacity>
          </View>

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
  uploadContainer: {
    alignItems: "left",
    marginTop: 20,
  },
  uploadLabel: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  icon: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterVehicle;
