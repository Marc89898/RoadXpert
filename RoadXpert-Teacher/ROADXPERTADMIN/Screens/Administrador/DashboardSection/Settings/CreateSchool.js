import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import BackNavigation from "../../../../Components/Navigation/BackNavigation.js";
import CustomTextInput from "../../../../Components/Inputs/CustomTextInput.js";
import MainButton from "../../../../Components/Buttons/mainButton.js";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const CreateSchool = () => {
  const navigation = useNavigation();

  const handleCreateRole = () => {
    navigation.navigate("CreateRoles");
  };

  const handleRegisterVehicle = () => {
    navigation.navigate("RegisterVehicle");
  };

  const handleRegisterPerson = () => {
    navigation.navigate("RegisterPerson");
  };

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
          <Text style={styles.headerText}>Create Drivingschool</Text>
        </View>
        <View style={styles.contentContainer}>
          <CustomTextInput label="Name of the school:" placeholder="Garrotxa" />
          <CustomTextInput label="Eslogan:" placeholder="Just drive it" />
          <CustomTextInput label="NIF:" placeholder="12345678N" />
          <CustomTextInput
            label="Location:"
            placeholder="Carrer de la Rambla"
          />
          <CustomTextInput label="Poblation:" placeholder="Olot" />
          <CustomTextInput label="Postal Code:" placeholder="17800" />

          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Insert Image:</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleImageUpload(false)}
            >
              <MaterialIcons name="cloud-upload" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <Text style={styles.labelText}>Create Roles:</Text>
              <TouchableOpacity
                onPress={handleCreateRole}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Press here {">"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <Text style={styles.labelText}>Registrar Vehiculo:</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegisterVehicle}
              >
                <Text style={styles.buttonText}>Press here {">"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <Text style={styles.labelText}>Registrar Trabajadores:</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegisterPerson}
              >
                <Text style={styles.buttonText}>Press here {">"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MainButton title="Create School" />
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
  buttonContainer: {
    alignItems: "left",
    marginTop: 20,
  },
  buttonRow: {
    marginBottom: 10,
  },
  labelText: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateSchool;
