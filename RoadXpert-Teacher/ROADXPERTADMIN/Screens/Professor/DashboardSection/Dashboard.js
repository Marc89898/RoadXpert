import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../../../Components/Buttons/floatingButton";

import { APIService } from "../../../ApiService";
import Config from "../../../configuracions";

// Importar imágenes
import NotificationsIcon from "../../../assets/images/Dashboard/notification.png";
import SettingsIcon from "../../../assets/images/Dashboard/settings.png";

const Dashboard = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Función para navegar entre pantallas
  const handleNotifications = () => {
    navigation.navigate("NotificationsScreen");
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };
  const handleStartPractical = () => {
    navigation.navigate("prePractice");
  };


  useEffect(() => {
    const loadNextEvent = async () => {
      try {

        if (typeof Config.ProfessorID === "undefined") {
          console.log("ProfessorID is undefined. Skipping event loading.");
          setLoading(false);
          return;
        }

        const events = await APIService.fetchEventsCalendar(Config.ProfessorID);
        const currentDate = new Date();


        events.sort((a, b) => new Date(a.Data) - new Date(b.Data));

        const nextEvent = events.find(
          (event) => new Date(event.Data) > currentDate
        );
        if (nextEvent) {
          console.log("Next Event: ", nextEvent);
          setNextEvent(nextEvent);
        } else {
          console.log("No upcoming events found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    loadNextEvent();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <View style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.nameText}>
              {Config?.Professor?.Nom} {Config?.Professor?.Cognom} {Config?.Professor?.SegonCognom}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={handleNotifications}>
          <View style={styles.circle}>
            <Image source={NotificationsIcon} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <View style={styles.circle}>
            <Image source={SettingsIcon} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={handleStartPractical}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Empezar Practica</Text>
              <Text style={styles.cardSubtitle}>Calentando motores ...</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>

      {nextEvent && (
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <TouchableOpacity>
              <Card.Content style={styles.cardContent}>
                <View style={styles.textCenter}>
                  <Text style={styles.nextEventTitle}>Siguiente Práctica</Text>
                </View>

                <View style={styles.eventDetail}>
                  <Icon name="calendar" size={20} color="black" />
                  <Text style={styles.eventDetailText}>{`${nextEvent.Data.substring(0, 12)}`}</Text>
                </View>

                <View style={styles.eventDetail}>
                  <Icon name="clock" size={20} color="black" />
                  <Text
                    style={styles.eventDetailText}
                  >{`${nextEvent.HoraInici} - ${nextEvent.HoraFi}`}</Text>
                </View>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        </View>
      )}
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
    // paddingLeft: 10,
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
    margin: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
  },
  cardContent: {
    padding: 10,
  },
  nextEventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 12,
    marginLeft: 5,
  },
  card: {
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 10,
    color: "grey",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  nextEventContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  nextEventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  eventDetailText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Dashboard;
