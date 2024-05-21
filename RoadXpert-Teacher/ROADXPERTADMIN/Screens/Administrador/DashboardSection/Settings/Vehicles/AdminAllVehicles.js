import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import { useNavigation } from "@react-navigation/native";
import CarCard from "../../../../../Components/Cards/CarCard";
import { APIService } from "../../../../../ApiService";

const AdminAllVehicles = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function fetchCars() {
      try {
        const carsData = await APIService.getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error.message);
      }
    }

    fetchCars();
  }, []);

  const handleOpen = () => {
    navigation.navigate("AdminRegisterVehicle");
  };

  const handleEdit = () => {
    const selectedCar = cars[selectedCarIndex];
    navigation.navigate("AdminEditVehicle", { car: selectedCar });
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedCar) {
      const carID = selectedCar.Matricula;
      // Implement delete car functionality
      await APIService.deleteCar(carID);
      Alert.alert("Coche Eliminado!", "Se ha eliminado el coche!");
    }
    handleClose();
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOptionsVisible(false);
      setSelectedCar(null);
    });
  };

  const handleOpenOptions = (car) => {
    const index = cars.indexOf(car);
    setSelectedCarIndex(index);
    setSelectedCar(car);
    setIsOptionsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Vehicles</Text>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {cars.map((car, index) => (
          <TouchableOpacity key={index} onPress={() => handleOpenOptions(car)}>
            <CarCard
              cardTitle={car.Marca + " " + car.Model}
              cardSubtitle={car.Tipus === "Disponible" ? "Disponible" : "No Disponible"}
              circleColor={car.Tipus === "Disponible" ? "red" : "green"}
              iconName="arrow-right"
              imagePath={require("../../../../../assets/images/CarsScreen/VolkswagenGolf.png")}
              onPress={() => handleOpenOptions(car)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {isOptionsVisible && (
        <Animated.View style={[styles.optionsContainer, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }]}>
          <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
            <Text style={styles.optionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
            <Text style={styles.optionButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleClose}>
            <Text style={styles.optionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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
  scrollContainer: {
    flex: 1,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  optionButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AdminAllVehicles;
