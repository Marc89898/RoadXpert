import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import CustomSelectInputUnlocked2 from "../../../../../Components/Inputs/CustomSelectInputUnlocked2.js";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked.js";
import { APIService } from "../../../../../ApiService.js";
import { sha256 } from "../../../../../utils";

const AdminRegisterPerson = () => {
  const navigation = useNavigation();

  const [opcionesRoles, setOpcionesRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const opcionesSexo = [
    { label: "Home", value: "Home" },
    { label: "Dona", value: "Dona" },
  ];

  const [opcionesHorario, setOpcionesHorario] = useState(true);
  const [loadingHorarios, setLoadingHorarios] = useState(true);

  const [professor, setProfessor] = useState({
    nom: "",
    cognom: "",
    segonCognom: "",
    dni: "",
    adreca: "",
    sexe: opcionesSexo[0].value,
    carnetConduirFront: "",
    carnetConduirDarrera: "",
    horariID: opcionesHorario.length > 0 ? opcionesHorario[0].value : "",
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

    const fetchHorarios = async () => {
      try {
        const horarios = await APIService.fetchHoraris();
        const opcionesHorario = horarios.map(horario => ({ label: horario.Nom, value: horario.ID }));
        setOpcionesHorario(opcionesHorario);
        setLoadingHorarios(false);
      } catch (error) {
        console.error("Error fetching horarios:", error);
      }
    };
    fetchRoles();
    fetchHorarios();
  }, []);

  const handleSave = async () => {
    try {
      if (!professor.sexe || !professor.password) {
        Alert.alert("Error", "Debe seleccionar el sexo y proporcionar una contraseña");
        return;
      }
      const hashedPassword = await sha256(professor.password);
      const professorData = { ...professor, password: hashedPassword };

      await APIService.postProfessor(professorData);
      Alert.alert("Éxito", "Profesor guardado correctamente");
      navigation.goBack()
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
    console.log("Professor after input change:", professor);
  };

  const handleSelectSexo = (value) => {
    setProfessor(prevState => ({ ...prevState, sexe: value }));
    console.log("Professor after selecting sexo:", professor);
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
              <CustomSelectInputUnlocked2
                label="Rol"
                options={opcionesRoles}
                onSelect={(value) => handleInputChange("rol", value)}
              />
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
        {loadingHorarios ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {opcionesHorario.length > 0 ? (
              <CustomSelectInputUnlocked2
                label="Horario"
                options={opcionesHorario}
                onSelect={(value) => handleInputChange("horariID", value)}
              />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>Horario</Text>
              </View>
            )}
          </>
        )}
        <CustomSelectInputUnlocked2
          label="Sexo"
          options={opcionesSexo}
          onSelect={(value) => handleSelectSexo(value)}
        />
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
