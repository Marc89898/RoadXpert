import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, Card } from "react-native-paper";
import BackNavigation from "./BottomNavigation/BackNavigation";
import Icon from "react-native-vector-icons/Feather";

const Cars = () => {
  const navigation = useNavigation();

  const CarCard = ({ cardTitle, cardSubtitle, circleColor }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{cardTitle}</Text>
          <View
            style={styles.subtitleContainer}
          >
            <View style={[styles.circle, { backgroundColor: circleColor }]}></View>
            <Text style={styles.cardSubtitle}>{cardSubtitle}</Text>
          </View>
          <Icon
            name="arrow-right"
            style={styles.icon}
            size={20}
            color="black"
          />
        </View>
        {/* <Image style={styles.image} source={require("../assets/images/CarsScreen/VolkswagenGolf.png")} /> */}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Coches</Text>
      </View>
      <CarCard cardTitle="Volkswagen Golf" cardSubtitle="Disponible" circleColor="red" />
      <CarCard cardTitle="Volkswagen Golf" cardSubtitle="No Disponible" circleColor="green" />
    </View>
  );
};

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
  card: {
    width: 340,
    height: 128,
    borderRadius: 20,
    backgroundColor: "#DDDDDD",
    alignSelf: "center",
    marginTop: 20,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textContainer: {
    width: 140,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "green",
  },
  cardTitle: {
    fontSize: 15,
  },
  image: {
    width: 201.53,
    height: 120,
    marginLeft: 10,
  },
  cardSubtitle: {
    marginLeft: 5,
    fontSize: 10,
    color: "gray",
  },
  icon: {
    marginTop: 20,
    color: "blue",
  },
});

export default Cars;
