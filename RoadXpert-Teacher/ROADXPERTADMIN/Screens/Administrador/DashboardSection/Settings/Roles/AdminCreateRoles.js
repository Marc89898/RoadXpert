import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked.js";
import MainButton from "../../../../../Components/Buttons/mainButton.js";
import { APIService } from "../../../../../ApiService.js";

const AdminCreateRoles = () => {
  const [rol, setRole] = useState({
    nom: "",
    descripcio: ""
  });

  const handleSave = async () => {
    try {
      console.log("Rol: ", rol)
      const response = await APIService.postRole(rol);
      if (response) {
        console.log("Rol creado:", response);
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
          onChangeText={text => setRole(prevState => ({ ...prevState, Nom: text }))}
        />
        <CustomTextInputUnlocked
          placeholder="Descripción"
          onChangeText={text => setRole(prevState => ({ ...prevState, Descripcio: text }))}
        />
      </View>
      <MainButton title="Guardar" onPress={handleSave} />
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
