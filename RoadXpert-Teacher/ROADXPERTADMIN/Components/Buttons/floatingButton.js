import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import chatBotImg from "../../assets/images/Dashboard/chatBot.jpg";

const floatingButton = () => {
  const navigation = useNavigation();
  const handleOpen = () => {
    navigation.navigate("ChatBot");
  };
  return (
    <TouchableOpacity style={styles.mainButton} onPress={handleOpen}>
      <Image source={chatBotImg} style={styles.buttonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: "#007AFF",
    width: 56,
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
  },
  buttonImage: {
    width: 35,
    height: 35,
  },
});

export default floatingButton;
