import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FloatingButton from "../../../Components/Buttons/floatingButton";

import { APIService } from "../../../ApiService";
import Config from "../../../configuracions";

// Importar imágenes
import NotificationsIcon from "../../../assets/images/Dashboard/notification.png";
import SettingsIcon from "../../../assets/images/Dashboard/settings.png";
import CarIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Dashboard = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [nextEventAlumn, setNextEventAlumn] = useState();
  const [nextEventCar, setNextEventCar] = useState();
  
  const handleNotifications = () => {
    navigation.navigate("NotificationsScreen");
  };
  const handleSettings = () => {
    navigation.navigate("AdminSettings");
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
          console.log("AlumneID: ", nextEvent.AlumneID)
          var result = await APIService.fetchAlumn(nextEvent.AlumneID)
          setNextEventAlumn(result)
          var resultCoche = await APIService.fetchCar(nextEvent.VehicleID)
          setNextEventCar(resultCoche)
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
              {Config?.Professor?.Nom} {Config?.Professor?.Cognom}{" "}
              {Config?.Professor?.SegonCognom}
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

      {nextEvent && (
        <View style={styles.cardContainer}>
          <TouchableOpacity>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.cardTitle}>Siguiente Encuentro</Text>

                <View style={styles.eventDetail}>
                  <Image
                    source={require("../../../assets/imgDefault.png")}
                    style={styles.eventDetailImage}
                  />
                  <View style={styles.eventTextDetail}>
                    <Text style={styles.eventDetailText}>{nextEventAlumn?.Nom}</Text>
                  </View>
                </View>

                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.eventInfo}>{`${nextEvent.Data.substring(0, 12)}`}</Text>
                </View>

                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons name="clock" size={20} color="black" />
                  <Text style={styles.eventInfo}>{`${nextEvent.HoraInici} - ${nextEvent.HoraFi}`}</Text>
                </View>
                <View style={styles.eventDetail}>
                <CarIcon name="car" size={20} color="black"/>
                  <Text style={styles.eventDetail}>
                    {`  ${nextEventCar?.Marca} ${nextEventCar?.Model}`}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.startButton]}>
                    <Text style={styles.buttonText}>Empezar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      )}

      <FloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
  },
  imageBackground: {
    height: 120,
    width: "100%",
    backgroundColor: '#1F41BB',
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
  eventDetailTextOpacity: {
    fontSize: 13,
    color: "gray",
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eventDetailImage: {
    resizeMode: "cover",
    width: 70,
    height: 70,
    borderRadius:
    10,
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
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  card: {
    elevation: 5,
  },
  nextEventContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
  },
  startButton: {
    backgroundColor: '#1F41BB',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Dashboard;
