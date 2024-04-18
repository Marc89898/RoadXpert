import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

const CarInfo = ({ route }) => {
  const { cardData } = route.params;

  const navigation = useNavigation();

  const handleConsultarMapa = () => {
    navigation.navigate("MapScreen");
  }

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Coches</Text>
      </View>
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{cardData.cardTitle}</Text>
                <View style={styles.subtitleContainer}>
                  <View
                    style={[
                      styles.circle,
                      { backgroundColor: cardData.circleColor },
                    ]}
                  ></View>
                  <Text style={styles.cardSubtitle}>
                    {cardData.cardSubtitle}
                  </Text>
                </View>
                <Icon
                  name="arrow-right"
                  style={styles.icon}
                  size={20}
                  color="black"
                />
              </View>
              <Image
                style={styles.image}
                source={
                  typeof cardData.imagePath === "string"
                    ? { uri: cardData.imagePath }
                    : cardData.imagePath
                }
              />
            </View>
          </Card.Content>
        </View>
      </Card>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Información del vehículo</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Kilómetros Recorridos</Text>
          <Text style={styles.infoValue}>120 km</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Ver Recorrido</Text>
          <Text style={styles.infoLink} onPress={handleConsultarMapa}>Consultar Mapa</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Transmisión</Text>
          <Text style={styles.infoValue}>Manual</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Caballos de Potencia</Text>
          <Text style={styles.infoValue}>130 CV</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Motor</Text>
          <Text style={styles.infoValue}>2.0 TDI</Text>
        </View>
      </View>
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
    width: 160,
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
  cardContainer: {
    overflow: "hidden",
    borderRadius: 20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 201,
    height: 120,
    marginLeft: 0,
  },
  cardSubtitle: {
    marginLeft: 5,
    fontSize: 10,
    color: "gray",
  },
  icon: {
    marginTop: 20,
    color: "blue",
    opacity: 0,
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoItem: {
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: "black",
  },
  infoValue: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  infoLink: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
export default CarInfo;