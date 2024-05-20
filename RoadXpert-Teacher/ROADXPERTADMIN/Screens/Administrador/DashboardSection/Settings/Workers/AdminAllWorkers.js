import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import WorkersCard from "../../../../../Components/Cards/WorkersCard";
import { useNavigation } from "@react-navigation/native";
import { APIService } from "../../../../../ApiService";

const AdminAllWorkers = () => {
  const navigation = useNavigation();
  const [Professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    getWorkers();
  }, []);

  const getWorkers = async () => {
    const professorsFromApi = await APIService.fetchAllProfessors();
    setProfessors(professorsFromApi);
    setFilteredProfessors(professorsFromApi);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = Professors.filter((professor) =>
      professor.Nom.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProfessors(filtered);
  };

  const handleOpen = (professor) => {
    setSelectedProfessor(professor);
    setIsOptionsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleEdit = () => {
    navigation.navigate("AdminViewWorker", { professor: selectedProfessor });
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedProfessor) {
      const professorID = selectedProfessor.ID;
      await APIService.deleteProfessor(professorID);
      getWorkers();
    }
    handleClose();
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOptionsVisible(false);
      setSelectedProfessor(null);
    });
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Workers</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminRegisterPerson")}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.cardContainer}>
        {filteredProfessors.map((professor, index) => (
          <WorkersCard
            key={index}
            name={professor.Nom}
            desc={professor.DNI}
            onPress={() => handleOpen(professor)}
          />
        ))}
      </View>
      {isOptionsVisible && (
        <Animated.View style={[styles.optionsContainer, { transform: [{ translateY: slideAnim }] }]}>
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
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 24,
    marginBottom: 10,
  },
  cardContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
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

export default AdminAllWorkers;
