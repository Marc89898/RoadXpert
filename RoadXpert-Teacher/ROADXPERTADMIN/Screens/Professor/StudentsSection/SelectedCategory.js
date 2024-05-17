import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const SelectedCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, subText, subTextInfo, imageSource, annotations } =
    route.params || {};
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);

  const openRoute = (practicaRuta) => {
    navigation.navigate("OneRouteScreen", { practicaRuta });
  };

  // Obtener las coordenadas mínimas y máximas de los marcadores
  const [minLatitude, minLongitude, maxLatitude, maxLongitude] =
    annotations.reduce(
      ([minLat, minLon, maxLat, maxLon], annotation) => {
        const [latitude, longitude] =
          annotation.Posicio.split(",").map(parseFloat);
        return [
          Math.min(minLat, latitude),
          Math.min(minLon, longitude),
          Math.max(maxLat, latitude),
          Math.max(maxLon, longitude),
        ];
      },
      [90, 180, -90, -180]
    );

  // Calcular la región del mapa
  const { width, height } = Dimensions.get("window");
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA =
    (maxLongitude - minLongitude) / (width / height) || LATITUDE_DELTA;

  const region = {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2,
    latitudeDelta: maxLatitude - minLatitude + LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={{ flex: 1 }}>
      <BackNavigation />
      <View style={styles.container}>
        <Text style={styles.headerText}>{category}</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {annotations.map((annotation, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Title style={styles.title}>
                  {annotation.CategoriaEscrita}
                </Title>
                <View style={styles.paragraphContainer}>
                  <Paragraph style={styles.paragraph}>
                    Categoria Numerica: {annotation.CategoriaNumerica}
                  </Paragraph>
                  <Paragraph style={styles.paragraph}>
                    Gravedad: {annotation.Gravedad}
                  </Paragraph>
                  <Paragraph style={styles.paragraph}>
                    Fecha: {new Date(annotation.Data).toLocaleDateString()}
                  </Paragraph>
                </View>
                <TouchableOpacity
                  style={styles.openRouteButton}
                  onPress={() => openRoute(annotation.Ruta)}
                >
                  <Text style={styles.buttonText}>Ver Ruta</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.mapTitleContainer}>
        <Text style={styles.mapTitle}>Mapa</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={region}>
          {annotations.map((annotation, index) => {
            const [latitude, longitude] =
              annotation.Posicio.split(",").map(parseFloat);
            return (
              <Marker
                key={index}
                coordinate={{ latitude, longitude }}
                title={annotation.Descripcio}
                onPress={() => setSelectedAnnotation(annotation)}
              />
            );
          })}
        </MapView>
        {selectedAnnotation && (
          <View style={styles.selectedAnnotationContainer}>
            <Text style={styles.selectedAnnotationText}>
              {new Date(selectedAnnotation.Data).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingLeft: 24,
    marginBottom: 20,
    height: "auto",
  },
  scrollContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 25,
  },
  card: {
    alignSelf: "center",
    width: "80%",
    marginBottom: 10,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  paragraphContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  paragraph: {
    fontSize: 14,
    color: "gray",
  },
  openRouteButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  mapTitleContainer: {
    marginTop: 0,
    alignItems: "flex-start",
  },
  mapTitle: {
    paddingLeft: 24,
    fontSize: 25,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    height: 300,
  },
  map: {
    flex: 1,
  },
  selectedAnnotationContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    zIndex: 1000,
  },
  selectedAnnotationText: {
    fontSize: 16,
  },
});

export default SelectedCategory;
