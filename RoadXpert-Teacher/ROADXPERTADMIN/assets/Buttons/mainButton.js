import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MainButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    padding: 10,
    width: "85%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 13,
  },
});

export default MainButton;
