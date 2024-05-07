import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const StudentInfo = ({ route }) => {
  const { student } = route.params;
  const navigation = useNavigation();

  const goToStudentProfile = () => {
    navigation.navigate("StudentProfile", { student });
  };

  const handlerouteClick = () => {
    navigation.navigate("Categories", { student });
  };

  const handleroutesView = () => {
    navigation.navigate("MapScreen", { student });
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>{student.Nom}</Text>
      </View>

      <TouchableOpacity onPress={goToStudentProfile}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image source={require("../../assets/images/Students/imgOverlay.png")} style={styles.image} />
            <View>
              <Text style={styles.nameText}>View Profile</Text>
              <Text style={styles.infoText}>
                Nombre, DNI, Dirección, Teléfono, Profesor...
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={handleroutesView}>
          <Card style={styles.routesCard}>
            <Card.Content style={{ backgroundColor: "#00041A" }}>
              <Text style={styles.cardHeaderText}>Ver Rutas</Text>
              <Image
                source={require("../../assets/images/RouteInformation/Map.png")}
                style={styles.cardImage}
              />
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlerouteClick}>
          <Card style={styles.routesCard}>
            <Card.Content style={{ backgroundColor: "#081A00" }}>
              <Text style={styles.cardHeaderText}>Categorias</Text>
              <Image
                source={require("../../assets/images/RouteInformation/Sign.png")}
                style={styles.cardImage}
              />
            </Card.Content>
          </Card>
        </TouchableOpacity>
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
    marginTop: 20,
    width: 346,
    height: 121,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 16,
  },
  nameText: {
    fontSize: 20,
  },
  infoText: {
    color: "#616161",
    fontSize: 10,
    width: 200,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 400,
    alignSelf: "center",
    marginVertical: 10,
    padding: 8,
  },
  cardHeaderText: {
    fontSize: 20,
    color: "white",
  },
  cardImage: {
    marginTop: 10,
  },
  routesCard: {
    margin: 10,
    width: 160,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default StudentInfo;
