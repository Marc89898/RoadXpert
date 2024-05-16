import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import SignatureCanvas from "react-native-signature-canvas";
import MainButton from "../../../Components/Buttons/mainButton.js";
import CustomTextInput from "../../../Components/Inputs/CustomTextInput.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ApiHelper from "../../../data/ApiHelper.js";
import Config from "../../../configuracions.js";

const PrePractice = () => {
  const navigation = useNavigation();
  const signatureRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null); // Almacena el ID del alumno seleccionado
  const [cotxes, setCotxes] = useState([]);
  const [selectedCotxe, setSelectedCotxe] = useState(null); // Almacena la matrícula del vehículo seleccionado

  useEffect(() => {
    fetchAlumnosData();
    fetchCotxesData();
  }, []);

  // Llamada a la función fetchAlumnos para obtener la lista de alumnos
  const fetchAlumnosData = async () => {
    try {
      const alumnosData = await ApiHelper.fetchAlumnos();
      setAlumnos(alumnosData);
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  // Llamada a la función fetchCotxes para obtener la lista de vehículos
  const fetchCotxesData = async () => {
    try {
      const cotxesData = await ApiHelper.fetchCotxes();
      setCotxes(cotxesData);
    } catch (error) {
      console.error('Error fetching cotxes:', error);
    }
  };

  const handleClearSignature = () => {
    signatureRef.current.clearSignature();
  };

  const handleSaveSignature = () => {
    setShowModal(false);
  };

  const handleStartButtonPress = () => {
    // Verificar si se ha seleccionado un alumno
    if (!selectedAlumno) {
      return;
    }
    if (!selectedCotxe) {
      return;
    }

    // Data actual formato 'YYYY-MM-DD'
    const today = new Date();

    // Crear el objeto practicaDataObj con los datos seleccionados
    const practiceDataObj = {
      ID: '',
      AlumneID: selectedAlumno, // ID del alumno seleccionado
      Ruta: '',
      Km: 0,
      HoraInici: new Date().toLocaleTimeString('en-US', { hour12: false }),
      HoraFi: '00:00:00',
      ProfessorID: Config.ProfessorID,
      VehicleID: selectedCotxe, // Matrícula del vehículo seleccionado
      EstatHoraID: 'EstatHora_1',
      Data: today.toISOString().split('T')[0], // Formato 'YYYY-MM-DD' 
      NumPracticas: selectedAlumno && alumnos.find(alumno => alumno.ID === selectedAlumno)?.NumPracticas,
      TotalAnotacions: 0,
      NombreAlumno: selectedAlumno && alumnos.find(alumno => alumno.ID === selectedAlumno)?.Nom,
      // NombrePractica: 'Práctica de conducción',
    };
    navigation.navigate("StartRouteMap", { practiceData: practiceDataObj });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackNavigation />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Pre-Practice</Text>
        <Text style={styles.label}>Alumno:</Text>
        <Picker
          selectedValue={selectedAlumno}
          onValueChange={(itemValue, itemIndex) => setSelectedAlumno(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar alumno..." value={null} />
          {alumnos.map(alumno => (
            <Picker.Item key={alumno.ID} label={`${alumno.Nom} (${alumno.NumPracticas} prácticas)`} value={alumno.ID} />
          ))}
        </Picker>
        <Text style={styles.label}>Vehículo:</Text>
        <Picker
          selectedValue={selectedCotxe}
          onValueChange={(itemValue, itemIndex) => setSelectedCotxe(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar vehículo..." value={null} />
          {cotxes.map(cotxe => (
            <Picker.Item key={cotxe.Matricula} label={`${cotxe.Marca} - ${cotxe.Model} - ${cotxe.Matricula}`} value={cotxe.Matricula} />
          ))}
        </Picker>
        <CustomTextInput
          label="Nombre de la práctica:"
          placeholder="Escriba aquí ..."
          style={styles.textInput}
        />
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureText}>Firma del alumno:</Text>
          <TouchableOpacity
            style={styles.signatureButton}
            onPress={() => setShowModal(true)}
          >
            <Icon name="pencil" size={20} color="black" />
            <Text style={styles.signatureButtonText}>Firmar</Text>
          </TouchableOpacity>
        </View>
        <MainButton onPress={handleStartButtonPress} title="Arranquemos!!" style={styles.startButton} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Firma del alumno</Text>
            <View style={styles.signatureCanvasContainer}>
              <SignatureCanvas
                ref={signatureRef}
                backgroundColor="#fff"
                penColor="#000"
                style={styles.signatureCanvas}
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleClearSignature}
              >
                <Text style={[styles.modalButtonText, { color: "red" }]}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#5cb85c" }]}
                onPress={handleSaveSignature}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contentContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textInput: {
    marginBottom: 20,
  },
  signatureContainer: {
    alignItems: "flex-start",
    marginBottom: 30,
  },
  signatureText: {
    marginBottom: 10,
    fontSize: 18,
  },
  signatureButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  signatureButtonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  startButton: {
    alignSelf: "center",
  },
});

export default PrePractice;