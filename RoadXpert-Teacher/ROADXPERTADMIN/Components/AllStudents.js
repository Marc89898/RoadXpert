import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Provider as PaperProvider,
  Card,
  IconButton,
} from "react-native-paper";
import BackNavigation from "./BottomNavigation/BackNavigation";
import NavBar from "./BottomNavigation/NavBar";
import { useNavigation } from '@react-navigation/native';

const StudentCard = ({ name, age, image, onDelete }) => {
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleOptions = (studentName) => {
    setShowOptions(!showOptions);
    setSelectedStudent(studentName);
  };

  const closeModal = () => {
    setShowOptions(false);
  };

  const handleOpen = () => {
    navigation.navigate('StudentInfo', { name, image })  
  };

  const handleDelete = () => {
    onDelete(selectedStudent);
    setShowOptions(false);
  };

  const handleEdit = () => {
    navigation.navigate('StudentProfile', { name, image })
  };

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.leftContent}>
            <Image source={image} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.ageText}>{age}</Text>
            </View>
          </View>
          <IconButton
            icon="cog"
            color="#007bff"
            size={24}
            onPress={() => toggleOptions(name)}
            style={styles.filterIcon}
          />
        </Card.Content>
      </Card>

      <Modal
        visible={showOptions}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>OPCIONES</Text>
              <Text style={styles.modalSubHeaderText}>
                {selectedStudent ? selectedStudent : ""}
              </Text>
            </View>
            <TouchableOpacity onPress={handleOpen}
              style={styles.optionItem}
            >
              <Text>Abrir</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.optionItem} onPress={handleDelete}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={handleEdit}
              style={styles.optionItem}
            >
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const AllStudents = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([
    {
      name: "Mariano Gomez",
      age: "18 años",
      image: require("../assets/images/Students/imgProbaToni.jpg"),
    },
    {
      name: "Pere Naus",
      age: "25 años",
      image: require("../assets/images/Students/imgProbaTom.jpg"),
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
  filterIcon: {
    marginRight: -10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  modalHeaderText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 17,
  },
  modalSubHeaderText: {
    color: "#666",
    opacity: 0.6,
    fontSize: 10,
  },
  optionItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});

export default AllStudents;
