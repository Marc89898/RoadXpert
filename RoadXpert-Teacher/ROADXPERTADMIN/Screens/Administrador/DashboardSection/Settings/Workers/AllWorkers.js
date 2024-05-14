import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import WorkersCard from "../../../../../Components/Cards/WorkersCard";
import { useNavigation } from "@react-navigation/native";
import { APIService } from "../../../../../ApiService";

const AllWorkers = () => {
  const navigation = useNavigation();
  const [Professors, setProfessors] = useState([]);

  useEffect(() => {
    getWorkers();
  }, []);

  const handleOpen = () => {
    navigation.navigate("RegisterPerson");
  };

  const getWorkers = async () => {
    const professorsFromApi = await APIService.fetchAllProfessors();
    setProfessors(professorsFromApi);
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Workers</Text>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {Professors.map((professor, index) => (
          <WorkersCard
            key={index}
            name={professor.Nom}
            desc={professor.DNI}
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

export default AllWorkers;
