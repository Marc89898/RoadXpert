import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const WorkersCard = ({ name, desc, image }) => {
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
    navigation.navigate("CreateRoles", { name, desc });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpen}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.leftContent}>
              <Image source={image} style={styles.profileImage} />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.descText}>{desc}</Text>
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
              <TouchableOpacity style={styles.optionItem}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.optionItem}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  descText: {
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

export default WorkersCard;
