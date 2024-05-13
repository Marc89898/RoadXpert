import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import RolesCard from "../../../../../Components/Cards/RolesCard";
import { useNavigation } from "@react-navigation/native";

const AllRoles = () => {
  const navigation = useNavigation();

  const handleOpen = () => {
    navigation.navigate("CreateRoles");
  };
  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Roles</Text>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <RolesCard name="Admin" desc="2 Members" />
        <RolesCard name="Secretary" desc="10 Members" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  cardContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
});

export default AllRoles;
