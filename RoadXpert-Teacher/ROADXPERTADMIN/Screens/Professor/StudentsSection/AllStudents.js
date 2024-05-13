import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import ApiHelper from "../../../data/ApiHelper";
import AllStudentsCard from "../../../Components/Cards/AllStudentsCard";

const AllStudents = () => {
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
      console.error('Error fetching students:', error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.DNI.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Students</Text>
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
    paddingLeft: 24,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    flex: 1,
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

export default AllStudents;
