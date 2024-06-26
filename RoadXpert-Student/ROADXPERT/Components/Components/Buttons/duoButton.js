import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { APIService } from "../../ApiService";

const DuoButton = ({ text }) => {
  const navigation = useNavigation();
  const onPressDelete = () => {
    console.log("Delete");
  };

  // const onPressConfirm = () => {
  //   console.log("Confirm");
  // };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonDelete} onPress={onPressDelete}>
        <MaterialCommunityIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonConfirm}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    width: "85%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 10,
  },
  buttonDelete: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    width: "20%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonConfirm: {
    marginTop: 10,
    backgroundColor: "#D9D9D9",
    padding: 10,
    height: 50,
    flex: 1,
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

export default DuoButton;
