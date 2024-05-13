import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackNavigation from "../Screens/Navigation/BackNavigation";
import RolesCard from "../Components/Cards/RolesCard";
import { useNavigation } from "@react-navigation/native";
import { APIService } from "../ApiService";

const AllRoles = () => {
  const navigation = useNavigation();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Llamamos a la función para obtener los roles cuando el componente se monta
    getRoles();
  }, []);

  const handleOpen = () => {
    navigation.navigate("CreateRoles");
  };

  const getRoles = async () => {
    // Obtenemos los roles de la API y actualizamos el estado
    const rolesFromApi = await APIService.fetchAllRoles();
    setRoles(rolesFromApi);
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
        {roles.map((role, index) => (
          <RolesCard
            key={index}
            name={role.Nom}
          />
        ))}
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
