import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import MainButton from "../../../../../Components/Buttons/mainButton.js";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked.js";
import CustomSelectInputUnlocked2 from "../../../../../Components/Inputs/CustomSelectInputUnlocked2.js"
import { APIService } from "../../../../../ApiService.js";
import { sha256 } from "../../../../../utils.js";

const AdminRegisterStudent = () => {
  const [alumn, setAlumn] = useState({
    nom: "",
    dni: "",
    adreca: "",
    telefon: "",
    contrasenya: "",
    professorID: ""
  });
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const fetchedProfessors = await APIService.fetchAllProfessors();
      setProfessors(fetchedProfessors);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Alumne: ", alumn)
      const response = await APIService.postAlumn(alumn);
      if (response) {
        showAlert("Alumno creado", "El alumno se ha creado correctamente.");
      } else {
        console.error("Error en el post de Alumno:", response);
      }
    } catch (error) {
      console.error("Error en el post de Alumno:", error);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const handlePasswordChange = async (text) => {
    try {
      const hashedPassword = await sha256(text);
      setAlumn((prevAlumn) => ({ ...prevAlumn, contrasenya: hashedPassword }));
    } catch (error) {
      console.error("Error hashing password:", error);
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
          <CustomTextInputUnlocked
            placeholder="Nombre"
            onChangeText={(text) => setAlumn((prevAlumn) => ({ ...prevAlumn, nom: text }))}
          />
          <CustomTextInputUnlocked
            placeholder="Dni"
            onChangeText={(text) => setAlumn((prevAlumn) => ({ ...prevAlumn, dni: text }))}
          />
          <CustomTextInputUnlocked
            placeholder="Adreca"
            onChangeText={(text) => setAlumn((prevAlumn) => ({ ...prevAlumn, adreca: text }))}
          />
          <CustomTextInputUnlocked
            placeholder="Numero"
            onChangeText={(text) => setAlumn((prevAlumn) => ({ ...prevAlumn, telefon: text }))}
          />
          <CustomTextInputUnlocked
            placeholder="Contrasenya"
            onChangeText={handlePasswordChange}
          />
          <CustomSelectInputUnlocked2
            options={professors.map((professor) => ({
              label: professor.Nom,
              value: professor.ID,
            }))}
            onSelect={(professorID) => {
              setSelectedProfessor(professorID);
              setAlumn((prevAlumn) => ({ ...prevAlumn, professorID }));
            }}
            selectedValue={selectedProfessor}
            placeholder="Professor"
          />
        </View>
      </View>
      <MainButton title="Guardar" onPress={handleSave} />
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
});

export default AdminRegisterStudent;
