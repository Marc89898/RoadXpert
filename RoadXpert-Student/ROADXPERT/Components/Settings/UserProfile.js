import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import BackNavigation from "../BottomNavigation/BackNavigation";
import CustomTextInput from "../Components/Inputs/CustomTextInput";
import Config from "../../configuracions";

const UserProfile = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <BackNavigation />
        <View style={styles.header}>
          <Text style={styles.headerText}>User Profile</Text>
        </View>

        <View style={styles.contentContainer}>
          <CustomTextInput label="Nombre:" placeholder={Config.Alumne.Nom} readOnly/>
          <CustomTextInput label="Apellido:" placeholder={Config.Alumne.Cognom}  readOnly/>
          <CustomTextInput label="Segundo Apellido:" placeholder={Config.Alumne.SegonCognom} readOnly/>
          <CustomTextInput label="Sex:" placeholder={Config.Alumne.Sexe} readOnly/>
          <CustomTextInput label="DNI:" placeholder={Config.Alumne.DNI} readOnly/>
          <CustomTextInput label="Carnet:" placeholder={Config.Alumne.CarnetConduirFront} readOnly/>
          <CustomTextInput label="Direccion:" placeholder={Config.Alumne.Adreca} readOnly/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 25,
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  colorpick: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleContainer: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
  },
  rectangleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadContainer: {
    alignItems: "left",
    marginTop: 20,
  },
  uploadLabel: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  icon: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProfile;
