import React from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import { MaterialIcons } from "@expo/vector-icons"; 
import * as ImagePicker from 'expo-image-picker';  

const StudentProfile = ({ route }) => {
  const student = route.params?.student;

  const NameInput = (
    <TextInput style={styles.input} placeholder="Escriba aquí ..." />
  );

  const handleImageUpload = async (isFromCamera) => {
    let result;
    
    if (isFromCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso denegado para acceder a la cámara.');
        return;
      }
      
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso denegado para acceder a la biblioteca de medios.');
        return;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      console.log(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Student's Info</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Imagen de perfil</Text>
        <View style={styles.profileImageContainer}>
          <Image source={student.image} style={styles.profileImage} />
          <TouchableOpacity style={styles.Icon} onPress={() => handleImageUpload(true)}>
            <MaterialIcons name="camera-alt" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Icon} onPress={() => handleImageUpload(false)}>
            <MaterialIcons name="cloud-upload" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Nombre:</Text>
        <TextInput style={styles.input} placeholder="Escriba aquí ..." value={student.nombre} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Apellidos:</Text>
        <TextInput style={styles.input} placeholder="Escriba aquí ..." />
      </View>

      <View style={styles.inputContainer}>
        <Text>DNI:</Text>
        <TextInput style={styles.input} placeholder="Escriba aquí ..." value={student.dni} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Gmail:</Text>
        <TextInput style={styles.input} placeholder="Escriba aquí ..." />
      </View>

      <View style={styles.inputContainer}>
        <Text>Género:</Text>
        <TextInput style={styles.input} placeholder="Escriba aquí ..." />
      </View>

      <View style={styles.inputContainer}>
        <Text>Dirección:</Text>
        <TextInput style={styles.input} placeholder="Escriba aquí ..." />
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
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  profileImage: {
    marginTop: 10,
    width: 64,
    height: 64,
    borderRadius: 75,
  },
  Icon: {
    backgroundColor: "#CCCCCC",
    width: 64,
    height: 64,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StudentProfile;
