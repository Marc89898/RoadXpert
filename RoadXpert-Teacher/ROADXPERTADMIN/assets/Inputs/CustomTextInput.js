// CustomTextInput.js

import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({ label, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.CustomTextLabel}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  CustomTextLabel: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: "#656565",
    borderRadius: 5,
    padding: 0,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default CustomTextInput;
