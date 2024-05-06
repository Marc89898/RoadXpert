import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import StudentCard from "../../Components/Cards/StudentsCard";

const AllStudents = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([
    {
      name: "Mariano Gomez",
      age: "18 años",
      image: require("../../assets/images/Students/imgProbaToni.jpg"),
    },
    {
      name: "Pere Naus",
      age: "25 años",
      image: require("../../assets/images/Students/imgProbaTom.jpg"),
    },
  ]);

  const handleDeleteStudent = (studentName) => {
    const updatedStudents = students.filter(
      (student) => student.name !== studentName
    );
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Students</Text>
        <View style={styles.searchContainer}></View>
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
          <StudentCard
            key={index}
            name={student.name}
            age={student.age}
            image={student.image}
            onDelete={handleDeleteStudent}
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
