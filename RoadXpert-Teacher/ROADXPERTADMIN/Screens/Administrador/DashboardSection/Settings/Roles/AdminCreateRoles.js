import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked.js";
import MainButton from "../../../../../Components/Buttons/mainButton.js";
import { APIService } from "../../../../../ApiService.js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminCreateRoles = () => {
  const [rol, setRole] = useState({ nom: "", descripcio: "" });
  const navigator = useNavigation();
  const handleSave = async () => {
    try {
      console.log("Rol: ", rol);
      // Validar que los campos obligatorios no es  tén vacíos
      if (!rol.nom || !rol.descripcio) {
        console.error("Los campos 'Nom' y 'Descripcio' son obligatorios.");
        return;
      }
  
      const response = await APIService.postRole(rol);
      if (response) {
        console.log("Rol creado:", response);
        Alert.alert("Rol creado", "El rol se ha creado correctamente.");
        navigator.goBack();
      } else {
        console.log("Error al crear el rol");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackNavigation />
      <Text style={styles.headerText}>Crear Roles</Text>
      <View style={styles.inputContainer}>
        <CustomTextInputUnlocked
          placeholder="Rol"
          onChangeText={text => setRole(prevState => ({ ...prevState, nom: text }))}
        />
        <CustomTextInputUnlocked
          placeholder="Descripción"
          onChangeText={text => setRole(prevState => ({ ...prevState, descripcio: text }))}
        />
      </View>
      <MainButton title="Guardar" onPress={() => {handleSave()}} />
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
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default AdminCreateRoles;
