import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackNavigation from "../Navigation/BackNavigation";
import CustomCard from "../../Components/Cards/MyStudentsCard";

const MyStudents = () => {
  const navigation = useNavigation();

  const handleAllStudentsPress = () => {
    navigation.navigate("AllStudents");
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>My Students</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAllStudentsPress}
        >
          <Text style={styles.buttonText}>All Students</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <CustomCard
          title={"Tony Stark"}
          subtitle={"23 years old"}
          backgroundImage={require("../../assets/images/Students/imgProbaToni.jpg")}
        />
        <CustomCard
          title={"Peter Parker"}
          subtitle={"20 years old"}
          backgroundImage={require("../../assets/images/Students/imgProbaTom.jpg")}
        />
        <CustomCard
          title={"Bruce Wayne"}
          subtitle={"35 years old"}
          backgroundImage={require("../../assets/images/Students/imgProbaBruce.jpg")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 400,
    alignSelf: "center",
    marginVertical: 10,
    padding: 8,
  },
});

export default MyStudents;
