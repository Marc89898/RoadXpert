import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MyStudentsCard = ({ student, backgroundImage }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    console.log("Student from MyStudentCard:", student);
    navigation.navigate("StudentInfo", { student: student });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <Card style={styles.card}>
        <Card.Cover source={backgroundImage} style={styles.cardCover} />
        <Image
          source={require("../../assets/images/Students/imgOverlay.png")}
          style={styles.overlayImage}
        />
        <Text style={styles.overlayText}>{student.Nom}</Text>
        <Text style={styles.smallText}>{student.DNI}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default MyStudentsCard;
