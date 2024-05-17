import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import chatBotImg from "../../assets/images/StartRouteMap/Ruta.png";

const floatingButton = () => {
  const navigation = useNavigation();
  
  const handleOpen = () => {
    navigation.navigate("prePractice");
  };
  return (
    <TouchableOpacity style={styles.mainButton} onPress={handleOpen}>
      <Image source={chatBotImg} style={styles.buttonImage} />
      <Text style={styles.buttonText}>Crear práctica</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: "#1F41BB",
    width: 150,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: "row",
  },
  buttonImage: {
    width: 25,
    resizeMode: "contain",
    height: 25,
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default floatingButton;
