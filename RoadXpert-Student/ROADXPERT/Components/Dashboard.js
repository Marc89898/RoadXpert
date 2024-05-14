import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CircleImage1 from "../assets/images/Dashboard/notification.png";
import CircleImage2 from "../assets/images/Dashboard/settings.png";
import TuImagen from "../assets/images/Dashboard/ProvaFoto.jpeg";
import { APIService } from "./ApiService";
import Config from "../configuracions";
import Icon from "react-native-vector-icons/FontAwesome";

const Dashboard = () => {
  const navigation = useNavigation();
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleNotifications = () => {
    navigation.navigate("notificationsScreen");
  };

  useEffect(() => {
    const loadNextEvent = async () => {
      try {
        const events = await APIService.fetchEventsCalendar(Config.IDALUMNE);
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
            <Image source={CircleImage1} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.circle}>
          <Image source={CircleImage2} style={styles.circleImage} />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>¡I'm, Dashboard Page!</Text>
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
                  {/* <Icon name="calendar" size={20} color="black" /> */}
                  <Text style={styles.eventDetailText}>{`${nextEvent.Data.substring(0, 12)}`}</Text>
                </View>

                <View style={styles.eventDetail}>
                  <Text
                    style={styles.eventDetailText}
                  >{`${nextEvent.HoraInici} - ${nextEvent.HoraFi}`}</Text>
                </View>
              </Card.Content>
            </TouchableOpacity>
          </Card>
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
    marginBottom: 20,
  },
  button: {
    margin: 5,
  },
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardContainer: {
    margin: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
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
  overlay: {
    position: "absolute",
    flex: 1,
    top: 50,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
  imageContainer: {
    overflow: "hidden",
  },
  imageBackground: {
    height: 120,
    width: "100%",
    backgroundColor: "#1F41BB",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 10,
    color: "grey",
  },
  imageContainer: {
    borderBottomRightRadius: 100,
    overflow: "hidden",
  },
  cardContent: {
    padding: 10,
  },
  nextEventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
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


  imageContainer: {
    overflow: "hidden",
  },
  imageBackground: {
    height: 120,
    width: "100%",
    backgroundColor: "#1F41BB",
  },

  overlay: {
    position: "absolute",
    flex: 1,
    top: 50,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Dashboard;
