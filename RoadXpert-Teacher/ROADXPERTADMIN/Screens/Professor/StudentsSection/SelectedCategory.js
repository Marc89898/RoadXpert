import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';

const SelectedCategory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, subText, subTextInfo, imageSource, annotations } = route.params || {};
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);

  const openRoute = (practicaRuta) => {
    navigation.navigate("OneRouteScreen", { practicaRuta });
  }

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
                <Title style={styles.title}>{annotation.CategoriaEscrita}</Title>
                <View style={styles.paragraphContainer}>
                  <Paragraph style={styles.paragraph}>Categoria Numerica: {annotation.CategoriaNumerica}</Paragraph>
                  <Paragraph style={styles.paragraph}>Gravedad: {annotation.Gravedad}</Paragraph>
                  <Paragraph style={styles.paragraph}>Fecha: {new Date(annotation.Data).toLocaleDateString()}</Paragraph>
                </View>
                <TouchableOpacity style={styles.openRouteButton} onPress={() => openRoute(annotation.Ruta)}>
                  <Text style={styles.buttonText}>Ver Ruta</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.imageContainer}>
                <Image
                  source={imageSource}
                  style={[styles.image, { resizeMode: "contain" }]}
                />
              </View> */}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.mapTitleContainer}>
        <Text style={styles.mapTitle}>Mapa</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map}>
          {annotations.map((annotation, index) => {
            // Dividir las coordenadas en latitud y longitud
            const [latitude, longitude] = annotation.Posicio.split(",").map(parseFloat);
            // Crear el marcador con las coordenadas y la descripción
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
            <Text style={styles.selectedAnnotationText}>{new Date(selectedAnnotation.Data).toLocaleDateString()}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    paddingLeft: 24,
    marginBottom: 20,
    // Ajusta la altura de la parte superior aquí
    height: 100, 
  },
  scrollContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 25,
  },
  card: {
    alignSelf: "center",
    width: '80%',
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
    marginTop: 20,
    alignItems: "flex-start",
  },
  mapTitle: {
    paddingLeft: 24,
    fontSize: 25,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    // Ajusta la altura del mapa aquí
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
