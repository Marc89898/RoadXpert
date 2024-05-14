import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const AllStudentsCard = ({ student, handleNavigate }) => {
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.card}>
      <Card>
        <Card.Content style={styles.cardContent}>
          <View style={styles.leftContent}>
            <Image
              source={require("../../assets/defaultImg.png")}
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{student.Nom}</Text>
              <Text style={styles.dniText}>{student.DNI}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  nameText: {
    fontSize: 15,
  },
  dniText: {
    fontSize: 12,
    color: "#666",
  },
});

export default AllStudentsCard;
