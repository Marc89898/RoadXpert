import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import CustomTextInput from "../../Components/Inputs/CustomTextInput";
import CustomSelectInput from "../../Components/Inputs/CustomSelectInput";
import MainButton from "../../Components/Buttons/mainButton";

const UserProfile = () => {
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
          <Text style={styles.headerText}>User Profile</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Image:</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleImageUpload(false)}
            >
              <MaterialIcons name="cloud-upload" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <CustomTextInput label="Nombre:" placeholder="Antonio" />
          <CustomTextInput label="Apellido:" placeholder="Rodriguez" />
          <CustomTextInput label="Segundo Apellido:" placeholder="Martin" />
          <CustomTextInput label="Motor:" placeholder="2.0 TDI" />
          <CustomSelectInput label="Sex:" options={opcionesSexo} />
          <CustomTextInput label="DNI:" placeholder="99999999Z" />

          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Carnet de conducir:</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleImageUpload(false)}
            >
              <MaterialIcons name="cloud-upload" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CustomTextInput label="Direccion:" placeholder="Olot" />
        </View>
        <MainButton title="Guardar" />
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

export default UserProfile;