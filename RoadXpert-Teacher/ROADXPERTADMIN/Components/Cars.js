import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, Card } from "react-native-paper";
import BackNavigation from "./BottomNavigation/BackNavigation";
import Icon from "react-native-vector-icons/Feather";

const Cars = () => {
  const navigation = useNavigation();

  const CarCard = () => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.cardTitle}>Volkswagen Tiguan</Text>
          <View style={styles.subtitleContainer}>
            <View style={styles.circle}></View>
            <Text style={styles.cardSubtitle}>Disponible</Text>
          </View>
          <Icon
            name="arrow-right"
            style={styles.icon}
            size={20}
            color="black"
          />
        </View>
        <View style={styles.rightContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/CarsScreen/VolkswagenGolf.png")}
              style={styles.image}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Coches</Text>
      </View>
      <CarCard />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  cardSubtitle: {
    marginLeft: 5,
    fontSize: 10,
    color: "gray",
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 20,
  },
  image: {
    position: 'relative',
    width: 201.53,
    left: 20,
    height: 120,
  },
  icon: {
    marginTop: 20,
    color: "blue",
  },
});

export default Cars;
