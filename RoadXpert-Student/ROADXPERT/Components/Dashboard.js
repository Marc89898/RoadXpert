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
import NotificationsImg from "../assets/images/Dashboard/notification.png";
import SettingsImg from "../assets/images/Dashboard/settings.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { APIService } from "./ApiService";
import Config from "../configuracions";
import FloatingButton from "./Components/Buttons/floatingButton";

const Dashboard = () => {
  const navigation = useNavigation();
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

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
            <Image source={NotificationsImg} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <View style={styles.circle}>
            <Image source={SettingsImg} style={styles.circleImage} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity>
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
                  <Text style={styles.eventDetailTextOpacity}>5a Practica</Text>
                  <Text style={styles.eventDetailTextOpacity}>
                    Volkswagen GT
                  </Text>
                </View>
              </View>

              <View style={styles.eventDetail}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color="black"
                />
                {/* <Text style={styles.eventInfo}>{`${nextEvent.Data.substring(
                  0,
                  12
                )}`}</Text> */}
              </View>

              <View style={styles.eventDetail}>
                <MaterialCommunityIcons name="clock" size={20} color="black" />
                {/* <Text
                  style={styles.eventInfo}
                >{`${nextEvent.HoraInici} - ${nextEvent.HoraFi}`}</Text> */}
              </View>

              <View style={styles.eventDetail}>
                <MaterialCommunityIcons
                  name="car-sports"
                  size={20}
                  color="black"
                />
                <Text style={styles.eventInfo}>
                  {/* {`  ${nextEventCar?.Marca} ${nextEventCar?.Model}` ||
                    "Not assigned"} */}
                </Text>
              </View>
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
                  {/* <Icon name="calendar" size={20} color="black" /> */}
                  <Text
                    style={styles.eventDetailText}
                  >{`${nextEvent.Data.substring(0, 12)}`}</Text>
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
});

export default Dashboard;
