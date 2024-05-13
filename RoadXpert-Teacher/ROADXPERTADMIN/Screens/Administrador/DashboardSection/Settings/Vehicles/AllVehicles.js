import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import { useNavigation } from "@react-navigation/native";
import CarCard from "../../../../../Components/Cards/CarCard";

const AllVehicles = () => {
  const navigation = useNavigation();

  const handleOpen = () => {
    navigation.navigate("RegisterVehicle");
  };
  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Vehicles</Text>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <CarCard
          cardTitle="Volkswagen Golf"
          cardSubtitle="No Disponible"
          circleColor="red"
          iconName="arrow-right"
          imagePath={require("../../../.../../../../assets/images/CarsScreen/VolkswagenGolf.png")}
        />
        <CarCard
          cardTitle="Volkswagen Golf 5"
          cardSubtitle="Disponible"
          circleColor="green"
          iconName="arrow-right"
          imagePath={require("../../../.../../../../assets/images/CarsScreen/VolkswagenGolf.png")}
        />
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

export default AllVehicles;
