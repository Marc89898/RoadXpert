import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import NotificationsImg from "../assets/images/Dashboard/notification.png";
import SettingsImg from "../assets/images/Dashboard/settings.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { APIService } from "./ApiService";
import Config from "../configuracions";
import FloatingButton from "./Components/Buttons/floatingButton";
import ApiHelper from "../data/ApiHelper";

const Dashboard = () => {
  const student = Config.Alumne;

  const navigation = useNavigation();
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [annotations, setAnnotations] = useState([]);
  const [showAllAnnotations, setShowAllAnnotations] = useState(false);
  const [notEvents, setNotEvents] = useState();

  const getCategoryGeneral = (categoryNumeric) => {
    let objToReturn = {
      titul: "",
      image: "",
    };

    if (categoryNumeric >= 1 && categoryNumeric < 2) {
      objToReturn.titul = "Comprobaciones previas";
      objToReturn.image = require("../assets/images/Categories/PreCheck.png");
    } else if (categoryNumeric >= 2 && categoryNumeric < 3) {
      objToReturn.titul = "Instalación en el vehículo";
      objToReturn.image = require("../assets/images/Categories/Car.png");
    } else if (categoryNumeric >= 3 && categoryNumeric < 4) {
      objToReturn.titul = "Incorporación a la circulación";
      objToReturn.image = require("../assets/images/Categories/Incorporation.png");
    } else if (categoryNumeric >= 4 && categoryNumeric < 5) {
      objToReturn.titul = "Progresión normal";
      objToReturn.image = require("../assets/images/Categories/NormalProgress.png");
    } else if (categoryNumeric >= 5 && categoryNumeric < 6) {
      objToReturn.titul = "Desplazamiento lateral";
      objToReturn.image = require("../assets/images/Categories/LateralMovement.png");
    } else if (categoryNumeric >= 6 && categoryNumeric < 7) {
      objToReturn.titul = "Adelantamiento";
      objToReturn.image = require("../assets/images/Categories/Overtaking.png");
    } else if (categoryNumeric >= 7 && categoryNumeric < 8) {
      objToReturn.titul = "Intersecciones";
      objToReturn.image = require("../assets/images/Categories/Intersections.png");
    } else if (categoryNumeric >= 8 && categoryNumeric < 9) {
      objToReturn.titul = "Cambio de sentido";
      objToReturn.image = require("../assets/images/Categories/ChangeDirection.png");
    } else if (categoryNumeric >= 9 && categoryNumeric < 10) {
      objToReturn.titul = "Paradas y estacionamientos";
      objToReturn.image = require("../assets/images/Categories/StopParking.png");
    } else if (categoryNumeric >= 11 && categoryNumeric < 12) {
      objToReturn.titul = "Obediencia a las señales";
      objToReturn.image = require("../assets/images/Categories/Signals.png");
    } else if (categoryNumeric >= 12 && categoryNumeric < 13) {
      objToReturn.titul = "Utilización de las luces";
      objToReturn.image = require("../assets/images/Categories/Lights.png");
    } else if (categoryNumeric >= 13 && categoryNumeric < 14) {
      objToReturn.titul = "Manejo de mandos";
      objToReturn.image = require("../assets/images/Categories/Controls.png");
    } else if (categoryNumeric >= 14 && categoryNumeric < 15) {
      objToReturn.titul = "Otros mandos y accesorios";
      objToReturn.image = require("../assets/images/Categories/OtherControls.png");
    } else if (categoryNumeric >= 15 && categoryNumeric < 16) {
      objToReturn.titul = "Durante el desarrollo de la prueba";
      objToReturn.image = require("../assets/images/Categories/DuringTest.png");
    } else {
      objToReturn.titul = "Categoría no definida";
      objToReturn.image = require("../assets/images/Categories/Other.png");
    }

    return objToReturn;
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleNotifications = () => {
    navigation.navigate("notificationsScreen");
  };

  const loadNextEvent = async () => {
    try {
      const events = await APIService.fetchEventsCalendar(Config.Alumne.ID);
      const currentDate = new Date();

      const estatHora2Events = events.filter(
        (event) => event.EstatHoraID === "EstatHora_2"
      );

      estatHora2Events.sort((a, b) => new Date(a.Data) - new Date(b.Data));

      const upcomingEvent = estatHora2Events.find(
        (event) => Date.parse(event.Data) >= currentDate.getTime()
      );

      if (!upcomingEvent) {
        setNotEvents("No hay eventos próximos");
      } else {
        setNotEvents(null);
      }

      setNextEvent(upcomingEvent || null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const fetchRecentAnnotations = async () => {
      try {
        const recentAnnotationsData = await ApiHelper.fetchAnotacionesPorAlumno(
          student.ID
        );
        setAnnotations(recentAnnotationsData || []);
      } catch (error) {
        console.error("Error fetching recent annotations:", error);
      }
    };

    fetchRecentAnnotations();
    const anotacionsInterval = setInterval(fetchRecentAnnotations, 5000);
    loadNextEvent();
    const intervalId = setInterval(loadNextEvent, 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(anotacionsInterval);
    };
  }, []);

  const handleViewMoreAnnotations = () => {
    setShowAllAnnotations(!showAllAnnotations);
  };

  const extractCategoryNumber = (description) => {
    const match = description.match(/(\d+(?:\.\d+)?)/g);
    return match ? parseFloat(match[0]) : null;
  };

  const handleAnnotationPress = (annotation) => {
    // Implementar navegación o acción al presionar una anotación
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <View style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.nameText}>{Config.Alumne.Nom}</Text>
          </View>
        </View>
      </View>
      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={handleNotifications}>
          <View style={styles.circle}>
            <Image source={NotificationsImg} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <View style={styles.circle}>
            <Image source={SettingsImg} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {!loading && nextEvent && notEvents == null && (
          <View style={styles.cardContainer}>
            {/* <TouchableOpacity> */}
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View>
                  <Text style={styles.cardTitle}>Siguiente Encuentro</Text>
                </View>

                <View style={styles.eventDetail}>
                  <Image
                    source={require("../assets/imgDefault.png")}
                    style={styles.eventDetailImage}
                  />
                  <View style={styles.eventTextDetail}>
                    <Text style={styles.eventDetailText}>Juan Alberto</Text>
                  </View>
                </View>

                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.eventInfo}>{`${nextEvent.Data.substring(
                    0,
                    12
                  )}`}</Text>
                </View>

                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="clock"
                    size={20}
                    color="black"
                  />
                  <Text
                    style={styles.eventInfo}
                  >{`${nextEvent.HoraInici} - ${nextEvent.HoraFi}`}</Text>
                </View>

                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="car-sports"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.eventInfo}>
                    {`${nextEvent.VehicleID}`}
                  </Text>
                </View>
              </Card.Content>
            </Card>
            {/* </TouchableOpacity> */}
          </View>
        )}

        {notEvents !== null && (
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.cardTitle}>{notEvents}</Text>
              </Card.Content>
            </Card>
          </View>
        )}

        <View style={styles.recentAnnotationsContainer}>
          <View style={styles.annotationsBox}>
            <View style={styles.annotationsHeader}>
              <Text style={styles.recentAnnotationsTitle}>
                Últimas Anotaciones
              </Text>
            </View>

            {annotations && annotations.length > 0 ? (
              annotations
                .slice(0, showAllAnnotations ? 5 : 2)
                .map((annotation, index) => {
                  const categoryNumber = extractCategoryNumber(
                    annotation.Descripcio
                  );
                  const { titul, image } = categoryNumber
                    ? getCategoryGeneral(categoryNumber)
                    : { titul: "", image: "" };

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAnnotationPress(annotation)}
                    >
                      <Card style={styles.annotationCard}>
                        <Card.Content style={styles.annotationCardContent}>
                          <View style={styles.annotationTitleContainer}>
                            <Text style={styles.annotationTitle}>
                              {annotation.CategoriaEscrita}
                            </Text>
                          </View>
                          <View style={styles.annotationDescriptionContainer}>
                            <Text style={styles.annotationDescription}>
                              {annotation.Descripcio}
                            </Text>
                            {image && (
                              <Image
                                source={image}
                                style={styles.annotationImage}
                                resizeMode="contain"
                              />
                            )}
                          </View>
                          <Text style={styles.annotationDate}>
                            {new Date(annotation.Data).toLocaleDateString()}
                          </Text>
                        </Card.Content>
                      </Card>
                    </TouchableOpacity>
                  );
                })
            ) : (
              <Text>No hay anotaciones disponibles</Text>
            )}

            <Button
              mode="contained-tonal"
              onPress={handleViewMoreAnnotations}
              style={styles.viewMoreButton}
            >
              {showAllAnnotations ? "Ver menos" : "Ver más"}
            </Button>
          </View>
        </View>
      </ScrollView>

      <FloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    margin: 5,
  },
  imageContainer: {
    overflow: "hidden",
  },
  imageBackground: {
    height: 120,
    width: "100%",
    backgroundColor: "#1F41BB",
  },
  title: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    alignContent: "center",
    marginTop: 30,
    opacity: 0.3,
  },
  circleContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  circleImage: {
    width: 23,
    resizeMode: "contain",
    borderRadius: 30,
  },
  overlay: {
    position: "absolute",
    flex: 1,
    top: 50,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
  welcomeText: {
    left: 2,
    fontSize: 8,
    color: "white",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  eventDetailImage: {
    resizeMode: "cover",
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  eventDetailText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  eventInfo: {
    fontSize: 12,
    marginLeft: 5,
  },
  eventDetailTextOpacity: {
    fontSize: 13,
    color: "gray",
  },
  textCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  nextEventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  card: {
    elevation: 5,
    backgroundColor: "white",
  },
  nextEventContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  recentAnnotationsContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  annotationsBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  annotationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recentAnnotationsContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  annotationsBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  annotationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recentAnnotationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewMoreButton: {
    marginTop: 12,
  },
  annotationCard: {
    marginBottom: 10,
    elevation: 0,
  },
  annotationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  annotationDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  annotationDate: {
    fontSize: 12,
    color: "gray",
  },
  annotationCardContent: {
    flexDirection: "column",
  },
  annotationTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  annotationDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  annotationImage: {
    width: 50,
    height: 50,
    position: "relative",
    marginLeft: 10,
  },
});

export default Dashboard;
