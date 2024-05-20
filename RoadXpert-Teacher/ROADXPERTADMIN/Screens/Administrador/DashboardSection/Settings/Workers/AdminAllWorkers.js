import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import WorkersCard from "../../../../../Components/Cards/WorkersCard";
import { useNavigation } from "@react-navigation/native";
import { APIService } from "../../../../../ApiService";

const AdminAllWorkers = () => {
  const navigation = useNavigation();
  const [Professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getWorkers();
  }, []);

  const handleOpen = (professor) => {
    setSelectedProfessor(professor);
    setIsModalVisible(true);
  };

  const getWorkers = async () => {
    const professorsFromApi = await APIService.fetchAllProfessors();
    setProfessors(professorsFromApi);
  };

  const handleEdit = () => {
    setIsModalVisible(true);
    navigation.navigate("AdminViewWorker", { professor: selectedProfessor });
  };

  const handleDelete = () => {
    if (selectedProfessor) {
      const professorID = selectedProfessor.ID;
      APIService.deleteProfessor(professorID);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>Workers</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminCreateWorker")}>
          <Text style={styles.buttonText}>Create new</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {Professors.map((professor, index) => (
          <WorkersCard
            key={index}
            name={professor.Nom}
            desc={professor.DNI}
            onPress={() => handleOpen(professor)}
          />
        ))}
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
            <Text style={styles.modalButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
            <Text style={styles.modalButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginTop: 16,
    paddingHorizontal: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  modalButtonText: {
    fontSize: 18,
  },
});

export default AdminAllWorkers;
