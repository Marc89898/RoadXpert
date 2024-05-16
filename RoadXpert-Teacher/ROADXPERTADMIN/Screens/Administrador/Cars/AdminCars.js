import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import CarCard from "../../../Components/Cards/CarCard"; 

export default function AdminMyCars() {
  const navigation = useNavigation();

  const handleCardPress = (cardData) => {
    navigation.navigate("CarInfo", { cardData });
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Coches</Text>
      </View>
      <CarCard
        cardTitle="Volkswagen Golf"
        cardSubtitle="Disponible"
        circleColor="red"
        iconName="arrow-right"
        imagePath={require("../../../assets/images/CarsScreen/VolkswagenGolf.png")}
        onPress={() =>
          handleCardPress({
            cardTitle: "Volkswagen Golf",
            cardSubtitle: "Disponible",
            circleColor: "red",
            imagePath: require("../../../assets/images/CarsScreen/VolkswagenGolf.png"),
          })
        }
      />
      <CarCard
        cardTitle="Volkswagen Arteon"
        cardSubtitle="No Disponible"
        circleColor="green"
        iconName= "arrow-right"
        imagePath={require("../../../assets/images/CarsScreen/VolkswagenArteon.webp")}
        onPress={() =>
          handleCardPress({
            cardTitle: "Volkswagen Arteon",
            cardSubtitle: "No Disponible",
            circleColor: "green",
            imagePath: require("../../../assets/images/CarsScreen/VolkswagenArteon.webp"),
          })
        }
      />
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
});
