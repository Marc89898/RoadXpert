import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import CarCard from "../../../Components/Cards/CarCard"; 
import { APIService } from "../../ApiService";

export default function MyCars() {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);

  const handleCardPress = (carData) => {
    navigation.navigate("CarInfo", { carData });
  };

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
            imagePath={require("../../assets/images/CarsScreen/VolkswagenGolf.png")}
            onPress={() => handleCardPress(car)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 25,
  },
  scrollContainer: {
    flex: 1,
  },
});
