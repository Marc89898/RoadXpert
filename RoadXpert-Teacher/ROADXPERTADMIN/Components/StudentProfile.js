import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { MaterialIcons } from "@expo/vector-icons"; // Importa el ícono de cámara

const StudentProfile = ({ route }) => {
  const name = route.params?.name;
  const image = route.params?.image;

  const NameInput = (
    <TextInput style={styles.input} placeholder="Escriba aqui ..." />
  );

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Students's Info</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Imagen de perfil</Text>
        <Image source={image} style={styles.profileImage} />
        <View style={styles.cameraIcon}>
          <MaterialIcons name="camera-alt" size={24} color="black" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Nombre</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Appelidos</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>DNI</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Gmail</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Genero</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Adreça:</Text>
        {NameInput}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 25,
  },
  inputContainer: {
    marginTop: 30,
    marginLeft: 25,
  },
  input: {
    fontSize: 20,
    color: "#656565",
    borderRadius: 5,
    padding: 0,
    fontWeight: "bold",
    marginTop: 5,
  },
  profileImage: {
    marginTop: 10,
    width: 64,
    height: 64,
    borderRadius: 75,
  },
  cameraIcon: {
    backgroundColor: "#CCCCCC",
    width: 64,
    height: 64,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StudentProfile;