import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, FlatList } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation.js";
import ApiHelper from "../../../../../data/ApiHelper.js";
import { useNavigation } from "@react-navigation/native";
import AllStudentsCard from "../../../../../Components/Cards/AllStudentsCard.js";

const AdminAllStudent = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // Changed initial value to 0

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

  const handleEdit = () => {
    navigation.navigate("StudentProfile", { student: selectedStudent });
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedStudent) {
      const studentID = selectedStudent.ID;
      await ApiHelper.deleteStudent(studentID);
      fetchStudents();
    }
    handleClose();
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOptionsVisible(false);
      setSelectedStudent(null);
    });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.DNI.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenOptions = (student) => {
    setSelectedStudent(student);
    setIsOptionsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
            onPress={() => handleOpenOptions(student)} // Pass handleOpenOptions directly
          />
        ))}
      </View>
      {isOptionsVisible && (
        <Animated.View style={[styles.optionsContainer, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }]}>
          <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
            <Text style={styles.optionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
            <Text style={styles.optionButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleClose}>
            <Text style={styles.optionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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
  optionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  optionButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AdminAllStudent;
