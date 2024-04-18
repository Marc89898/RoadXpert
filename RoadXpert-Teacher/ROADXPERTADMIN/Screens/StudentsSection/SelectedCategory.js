import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import BackNavigation from "../Navigation/BackNavigation";
import MapView from "react-native-maps";

const SelectedCategory = () => {
  const route = useRoute();
  const { categoryText, subText, subTextInfo, imageSource } =
    route.params || {};

  return (
    <View style={{ flex: 1 }}>
      <BackNavigation />
      <View style={styles.container}>
        <Text style={styles.headerText}>Señales de {categoryText}</Text>
      </View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Title style={styles.title}>{"Señales de " + categoryText}</Title>
            <Paragraph style={styles.paragraph}>{subText}</Paragraph>
            <Paragraph style={styles.paragraphsubText}>{subTextInfo}</Paragraph>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/Categories/StopSign.png")}
              style={[styles.image, { resizeMode: "contain" }]}
            />
          </View>
        </Card.Content>
      </Card>
      <View style={styles.mapTitleContainer}>
        <Text style={styles.mapTitle}>Mapa</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    paddingLeft: 24,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
  },
  card: {
    alignSelf: "center",
    width: 345,
    height: 146,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 10,
    color: "gray",
  },
  paragraphsubText: {
    marginTop: 5,
    backgroundColor: "#5D5D5D",
    paddingHorizontal: 10,
    color: "white",
    paddingVertical: 3,
    borderRadius: 50,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  mapTitleContainer: {
    marginTop: 20,
    alignItems: "left",
  },
  mapTitle: {
    paddingLeft: 24,
    fontSize: 25,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
});

export default SelectedCategory;
