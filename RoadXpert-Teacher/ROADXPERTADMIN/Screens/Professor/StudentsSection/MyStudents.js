import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-paper";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import { useNavigation } from "@react-navigation/native";
import ApiHelper from "../../../data/ApiHelper";
import Config from "../../../configuracions";
import MyStudentsCard from "../../../Components/Cards/MyStudentsCard";

const MyStudents = () => {
  const navigation = useNavigation();
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const alumnosData = await ApiHelper.fetchAlumnosPorProfesor(Config.Professor.ID);
        setAlumnos(alumnosData);
      } catch (error) {
        console.error("Error fetching alumnos:", error);
      }
    };
    fetchAlumnos();
  }, []);

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
        {alumnos.map((alumno) => (
          <MyStudentsCard
            key={alumno.ID}
            student={alumno}
          />
        ))}
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
