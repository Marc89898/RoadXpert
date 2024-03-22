import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { useNavigation } from "@react-navigation/native";

const CustomCard = ({ title, subtitle, backgroundImage }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    // Navegar a la pantalla StudentsInfo y enviar los datos
    navigation.navigate("StudentInfo", {
      name: title,
      image: backgroundImage,
    });
  };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <Card style={styles.card}>
        <Card.Cover source={backgroundImage} style={styles.cardCover} />
        <Image
          source={require("../assets/images/Students/imgOverlay.png")}
          style={styles.overlayImage}
        />
        <Text style={styles.overlayText}>{title}</Text>
        <Text style={styles.smallText}>{subtitle}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const MyStudents = () => {
  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>My Students</Text>
      </View>
      <View style={styles.cardContainer}>
        <CustomCard
          title={"Tony Stark"}
          subtitle={"23 years old"}
          backgroundImage={require("../assets/images/Students/imgProbaToni.jpg")}
        />
        <CustomCard
          title={"Peter Parker"}
          subtitle={"20 years old"}
          backgroundImage={require("../assets/images/Students/imgProbaToni.jpg")}
        />
        <CustomCard
          title={"Bruce Wayne"}
          subtitle={"35 years old"}
          backgroundImage={require("../assets/images/Students/imgProbaToni.jpg")}
        />
        {/* Agrega más CustomCards según sea necesario */}
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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 400,
    alignSelf: "center",
    marginVertical: 10,
    padding: 8,
  },
  card: {
    width: 169,
    margin: 9,
    height: 181,
    borderRadius: 20,
    overflow: "hidden",
  },
  overlayText: {
    position: "absolute",
    bottom: 34,
    left: 14,
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  smallText: {
    position: "absolute",
    bottom: 15,
    left: 14,
    color: "#D7D3D3",
    fontSize: 12,
  },
  cardCover: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  overlayImage: {
    opacity: 0.5,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default MyStudents;
