import React, { useState, useEffect } from "react";
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
import BackNavigation from "../Navigation/BackNavigation";
import { useNavigation } from '@react-navigation/native';
import ApiHelper from "../../data/ApiHelper";

const StudentCard = ({ student, onOpen }) => {
  const handleOpen = () => {
    onOpen(student);
  };

  return (
    <TouchableOpacity onPress={handleOpen} style={styles.card}>
      <Card>
        <Card.Content style={styles.cardContent}>
          <View style={styles.leftContent}>
            <Image source={require("../../assets/images/Students/imgOverlay.png")} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{student.nombre}</Text>
              <Text style={styles.dniText}>{student.dni}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const AllStudents = ({ navigation }) => {
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

  const handleOpenStudent = (student) => {
    navigation.navigate('StudentInfo', { student });
  };

  const filteredStudents = students.filter((student) =>
    student.nombre.toLowerCase().includes(searchQuery.toLowerCase())
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
          <StudentCard
            key={index}
            student={student}
            onOpen={handleOpenStudent}
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
  dniText: {
    fontSize: 12,
    color: "#666",
  },
});

export default AllStudents;
