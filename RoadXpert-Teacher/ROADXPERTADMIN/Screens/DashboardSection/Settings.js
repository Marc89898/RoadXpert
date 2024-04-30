import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MainButton from "../../Components/Buttons/mainButton";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleAdmin = () => {
    navigation.navigate("Admin");
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Configuración</Text>

        <TouchableOpacity onPress={handleAdmin}>
          <View style={styles.iconAdminContainer}>
            <Text style={styles.adminText}>Admin</Text>
            <View style={styles.iconContainer}>
              <Icon name="account-cog" size={18} color="#333" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton style={styles.button} title="LogOut" />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 25,
  },
  iconAdminContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 50,
    gap: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 15,
    marginRight: 24,
  },
  adminText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    marginHorizontal: 24,
  },
});

export default Settings;
