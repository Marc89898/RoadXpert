import { React, useEffect, useState } from "react";
import { APIService } from "../../ApiService";
import  Config  from "../../configuracions";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import CircleImage1 from "../../assets/images/Dashboard/notification.png";
import CircleImage2 from "../../assets/images/Dashboard/settings.png";
import TuImagen from "../../assets/images/Dashboard/ProvaFoto.jpeg";

const Dashboard = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
        if (typeof Config.ProfessorID === 'undefined') {
          console.log("ProfessorID is undefined. Skipping event loading.");
          setLoading(false);
          return;
        }
        const events = await APIService.fetchEventsCalendar(Config.ProfessorID);
        const currentDate = new Date();
        events.sort((a, b) => new Date(a.Data) - new Date(b.Data));
        const nextEvent1 = events.find(
          (event) => new Date(event.Data) > currentDate
        );
        if (nextEvent1) {
          console.log("Next Event: ", nextEvent1);
          setNextEvent(nextEvent1);
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
        <ImageBackground source={TuImagen} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.nameText}>
              {Config?.Professor?.Nom} {Config?.Professor?.Cognom} {Config?.Professor?.SegonCognom}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={handleNotifications}>
          <View style={styles.circle}>
            <Image source={CircleImage1} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <View style={styles.circle}>
            <Image source={CircleImage2} style={styles.circleImage} />
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
        <View style={styles.nextEventContainer}>
          <Text style={styles.nextEventTitle}>Siguiente Practica:</Text>
          <View style={styles.eventDetail}>
            <Icon name="calendar" size={20} color="black" />
            <Text
              style={styles.eventDetailText}
            >{`Fecha: ${nextEvent.Data}`}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Icon name="clock" size={20} color="black" />
            <Text
              style={styles.eventDetailText}
            >{`Hora: ${nextEvent.HoraInici} - ${nextEvent.HoraFi}`}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Icon name="map-marker" size={20} color="black" />
            <Text
              style={styles.eventDetailText}
            >{`Ruta: ${nextEvent.Ruta}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderBottomRightRadius: 100,
    overflow: "hidden",
  },
  imageBackground: {
    height: 232,
    width: "100%",
    resizeMode: "cover",
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
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  welcomeText: {
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
