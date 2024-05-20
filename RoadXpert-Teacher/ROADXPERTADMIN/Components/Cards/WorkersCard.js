import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const WorkersCard = ({ name, desc, onPress }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity>
        <Card style={styles.card} onPress={onPress}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.leftContent}>
              <Image source={require("../../assets/defaultImg.png")} style={styles.profileImage} />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.ageText}>{desc}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  ageText: {
    fontSize: 12,
    color: "#666",
  },
});

export default WorkersCard;