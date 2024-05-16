import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import CustomSelectInput from "../../../../../Components/Inputs/CustomSelectInput.js";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked.js";
import DuoButton from "../../../../../Components/Buttons/duoButton.js";
import { APIService } from "../../../../../ApiService.js";

const AdminRegisterPerson = () => {
  const navigation = useNavigation();

  const [opcionesRoles, setOpcionesRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const opcionesSexo = [
    { label: "Hombre", value: "Hombre" },
    { label: "Mujer", value: "Mujer" },
  ];
  
  const [professor, setProfessor] = useState({
    nom: "",
    cognom: "",
    segonCognom: "",
    dni: "",
    adreca: "",
    sexe: "",
    carnetConduirFront: "",
    carnetConduirDarrera: "",
    horariID: "",
    password: ""
  });
  
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await APIService.fetchAllRoles();
        const nombresRoles = roles.map(role => ({ label: role.Nom, value: role.ID }));
        setOpcionesRoles(nombresRoles);
        setLoadingRoles(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSave = async () => {
    try {
      await APIService.postProfessor(professor);
    } catch(error) {
      console.error("Error en guardar el profesor: ", error);
    }
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  const handleInputChange = (key, value) => {
    setProfessor(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSelectSexo = (value) => {
    handleInputChange("sexe", value);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackNavigation />
      <Text style={styles.headerText}>REGISTRAR</Text>
      <View style={styles.contentContainer}>
        {loadingRoles ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {opcionesRoles.length > 0 ? (
              <CustomSelectInput options={opcionesRoles} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>Rol</Text>
              </View>
            )}
          </>
        )}
        <CustomTextInputUnlocked
          placeholder="Nombre"
          onChangeText={text => handleInputChange("nom", text)}
        />
        <CustomTextInputUnlocked
          placeholder="Apellido"
          onChangeText={text => handleInputChange("cognom", text)}
        />
        <CustomTextInputUnlocked
          placeholder="Segundo Apellido"
          onChangeText={text => handleInputChange("segonCognom", text)}
        />
        <CustomTextInputUnlocked
          placeholder="Dni"
          onChangeText={text => handleInputChange("dni", text)}
        />
        <CustomTextInputUnlocked
          placeholder="Direccion"
          onChangeText={text => handleInputChange("adreca", text)}
        />
        <CustomTextInputUnlocked
          placeholder="Contraseña"
          onChangeText={text => handleInputChange("password", text)}
        />
        <CustomSelectInput options={opcionesSexo}  onSelect={handleSelectSexo}/>
        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Carnet de conducir:</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={handleImageUpload}
          >
            <MaterialIcons name="cloud-upload" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  contentContainer: {
    marginBottom: 20,
  },
  placeholder: {
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "lightgray",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminRegisterPerson;
