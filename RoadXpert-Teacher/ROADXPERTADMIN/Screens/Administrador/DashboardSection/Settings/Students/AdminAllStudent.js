import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import ApiHelper from "../../../../../data/ApiHelper.js";
import { useNavigation } from "@react-navigation/native";
import AllStudentsCard from "../../../../../Components/Cards/AllStudentsCard.js";

const AdminAllStudent = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const alumnos = await ApiHelper.fetchAlumnos();
      setStudents(alumnos);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleOpen = () => {
    navigation.navigate("AdminRegisterStudent");
  };

  const filteredStudents = students.filter(
    (student) =>
      student.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.DNI.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Students</Text>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>
      <View style={styles.content}>
        {filteredStudents.map((student, index) => (
          <AllStudentsCard
            key={index}
            student={student}
            handleNavigate={() => navigation.navigate("StudentProfile")}
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
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    borderRadius: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default AdminAllStudent;
