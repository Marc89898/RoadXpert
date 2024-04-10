import React from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { MaterialIcons } from "@expo/vector-icons"; 
import * as ImagePicker from 'expo-image-picker';  

const StudentProfile = ({ route }) => {
  const name = route.params?.name;
  const image = route.params?.image;

  const NameInput = (
    <TextInput style={styles.input} placeholder="Escriba aqui ..." />
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
        <Text style={styles.headerText}>Students's Info</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Imagen de perfil</Text>
        <View style={styles.profileImageContainer}>
          <Image source={image} style={styles.profileImage} />
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
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Apellidos:</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>DNI:</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Gmail:</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Género:</Text>
        {NameInput}
      </View>

      <View style={styles.inputContainer}>
        <Text>Dirección:</Text>
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
