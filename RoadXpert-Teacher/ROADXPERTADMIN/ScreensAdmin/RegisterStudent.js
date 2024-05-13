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

// const newAlumnData = {
//   Nom: "Nuevo Alumno",
//   DNI: "12345678A",
//   Adreca: "Calle Ejemplo, 123",
//   Telefon: "123456789",
//   Contrasenya: "contraseña123",
//   ProfessorID: 1,
// };

// try {
//   const response = await APIService.postAlumn(newAlumnData);
//   console.log('Alumn added successfully:', response);
// } catch (error) {
//   console.error('Failed to add alumn:', error);
// }



const RegisterStudent = () => {
  const navigation = useNavigation();

  const opcionesVehicles = [{ label: "ROL OPTION", value: "OPTION" }];
  const opcionesSexo = [
    { label: "Hombre", value: "Hombre" },
    { label: "Mujer", value: "Mujer" },
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
          <Text style={styles.headerText}>Register Student</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Image:</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleImageUpload(false)}
            >
              <MaterialIcons name="cloud-upload" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
          <CustomTextInput label="Nombre:" placeholder="Antonio" />
          <CustomTextInput label="DNI:" placeholder="99999999Z" />
          <CustomTextInput label="Adreça:" placeholder="Olot" />
          <CustomTextInput label="Telefon:" placeholder="984353150" />
        </View>
      </View>
      <MainButton title="Guardar" />
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

export default RegisterStudent;
