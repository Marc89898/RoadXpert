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
import CustomSelectInputUnlocked from "../../../../../Components/Inputs/CustomSelectInputUnlocked.js"
import { APIService } from "../../../../../ApiService.js";

const AdminRegisterStudent = () => {
  const [alumn, setAlumn] = useState({
    nom: "",
    dni: "",
    adreca: "",
    telefon: "",
    contrsenya: "",
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
      console.log("Professors: " + fetchedProfessors[1].ID);
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

  const handleProfessorChange = (professor) => {
    setSelectedProfessor(professor);
    setAlumn((prevAlumn) => ({ ...prevAlumn, ProfessorID: professor.value }));
  };

  const handleContrasenyaChange = (text) => {
    setAlumn((prevAlumn) => ({ ...prevAlumn, Contrasenya: text }));
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
            onChangeText={(text) => setAlumn((prevAlumn) => ({ ...prevAlumn, contrasenya: text }))}
          />
          <CustomSelectInputUnlocked
            options={professors.map((professor) => ({
              label: professor.Nom,
              value: professor.ID,
            }))}
            onSelect={(text) => setAlumn((prevAlumn) => ({ ...prevAlumn, professorID: text }))}
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
