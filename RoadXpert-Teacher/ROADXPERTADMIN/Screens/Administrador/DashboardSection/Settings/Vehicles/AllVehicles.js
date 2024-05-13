import React, { useState, useEffect } from "react"; // Importa useState y useEffect desde React
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import { useNavigation } from "@react-navigation/native";
import CarCard from "../../../../../Components/Cards/CarCard";
import { APIService } from "../ApiService";

const AllVehicles = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const carsData = await APIService.getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error.message);
      }
    }

    fetchCars();
  }, []);

  const handleOpen = () => {
    navigation.navigate("RegisterVehicle");
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Coches</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {cars.map((car, index) => (
          <CarCard
            key={index}
            cardTitle={car.Marca + ' ' + car.Model}
            cardSubtitle={car.Tipus === 'Disponible' ? 'Disponible' : 'No Disponible'}
            circleColor={car.Tipus === 'Disponible' ? 'red' : 'green'}
            iconName="arrow-right"
            imagePath={require("../assets/images/CarsScreen/VolkswagenGolf.png")}
            onPress={() => handleOpen(car)}
          />
        ))}
      </ScrollView>
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
