import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, Animated } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from '../ApiService';
import { DataAdapter } from './Adapter';
import Config from "../configuracions"
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

export default function ProfessorCalendar() {
  const [events, setEvents] = useState();
  const [eventToManage, setEventToManage] = useState(null);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableHours, setAvailableHours] = useState(['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']);
  const [selectedAlumn, setSelectedAlumn] = useState('');
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(availableHours[0]);
  const [students, setStudents] = useState([]);
  const navigation = useNavigation();
  const optionsAnimation = useRef(new Animated.Value(0)).current;

  const fetchData = async () => {
    try {
      const result = await APIService.fetchEventsCalendar(Config.Professor.ID);
      const adaptedData = await DataAdapter.adaptPracticaToAgenda(result);
      setEvents(adaptedData);
    } catch (error) {
      console.log('ERROR IN THE DATABASE: ' + error);
    }
  };

  const handleOptionsPress = (item) => {
    setEventToManage(item);
    setOptionsModalVisible(true);
  
    Animated.timing(optionsAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const loadStudents = async () => {
    try {
      const studentsData = await APIService.fetchAllAlumns();
      const formattedStudents = studentsData.map(student => ({
        id: student.ID,
        name: student.Nom
      }));
      setStudents(formattedStudents);
    } catch (error) {
      console.error('Error al cargar los alumnos:', error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleDeleteConfirmation = async (item) => {
    setEventToManage(item);
    setDeleteConfirmationVisible(true);
    const eventId = eventToManage.id;
    try {
      await APIService.deleteEventCalendar(eventId);
      console.log('Event deleted successfully:', eventId);

      Alert.alert(
        'Evento Eliminado',
        'El evento se ha eliminado correctamente.',
        [
          {
            text: 'OK', onPress: async () => {
              setDeleteConfirmationVisible(false);
              fetchData();
            }
          }
        ],
        { cancelable: false }
      );
      fetchData();
    } catch (error) {
      console.error("Error in the delete petition: " + error.message)
    }
  };

  const handleAcceptEvent = async () => {
    try {
      await APIService.modifyEventEstat(eventToManage.id, "EstatHora_2");
      console.log('Event accepted successfully:', eventToManage.id);
      Alert.alert('Evento Aceptado', 'El evento se ha aceptado correctamente.');
      setEventToManage(null);
      fetchData();
    } catch (error) {
      console.error("Error in the accept petition: " + error.message);
    }
  };

  const handleAddEvent = () => {
    const eventId = uuidv4();
    const Horas = selectedHour.split(" ");
    const event = {
      id: eventId,
      name: "Practica",
      horaInicial: Horas[0],
      horaFinal: Horas[2],
      Ruta: "",
      Coche: "",
      Estat: '',
      AlumneID: selectedAlumn.id,
      ProfessorID: Config.Professor.ID,
      VehicleID: '3456JKL',
      data: selectedDate
    };
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      if (updatedEvents[selectedDate]) {
        updatedEvents[selectedDate].push(event);
      } else {
        updatedEvents[selectedDate] = [event];
      }
      const eventAdapted = DataAdapter.adaptJsonToDatabase(event);
      APIService.addEventCalendar(eventAdapted);
      return updatedEvents;
    });
  };

  const addPractica = async () => {
    try {
      const fetchedHours = await APIService.fetchAvailableHours(Config.Professor.ID, selectedDate);
      loadStudents();
      if (fetchedHours) {
        setAvailableHours(fetchedHours);
        setModalVisible(true);
      } else {
        console.error('No se pudieron obtener las horas disponibles');
      }
    } catch (error) {
      console.error('Error al obtener las horas disponibles:', error.message);
    }
  };

  const handleModalSubmit = () => {
    handleAddEvent();
    setModalVisible(false);
    setSelectedHour(availableHours[0]);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedHour(availableHours[0]);
  };

  const renderAvailableHours = () => {
    return availableHours.map((hour) => (
      <TouchableOpacity
        key={hour}
        style={[styles.hourButton, selectedHour === hour ? styles.selectedHourButton : null]}
        onPress={() => setSelectedHour(hour)}
      >
        <Text style={styles.hourButtonText}>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  const optionsTranslateY = optionsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });


  const handleCloseOptions = () => {
    Animated.timing(optionsAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOptionsModalVisible(false));
  };

  const renderEmptyDate1 = () => {
    return (
      <Text style={[styles.emptyDateText]}>
        <Text style={[styles.boldText, styles.emptyDateText2]}>EMPTY DATE!</Text>
      </Text>
    );
  };

  return (
    <View style={{ flex: 1 }}>
        <Agenda
          theme={{
            agendaTodayColor: 'blue',
            agendaKnobColor: 'black',
            selectedDayBackgroundColor: 'grey',
            agendaDayNumColor: 'black',
            agendaDayTextColor: 'black',
            monthTextColor: 'blue',
            textMonthFontSize: 40,
            textMonthFontWeight: 'bold',
            arrowColor: 'blue',
            textSectionTitleColor: 'blue',
            textDayFontWeight: 'bold',
          }}
          style={styles.agenda}
          selected={selectedDate}
          items={events}
          onDayPress={handleDayPress}
          renderEmptyData={renderEmptyDate1}
          renderItem={(item) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleOptionsPress(item)}
            >
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemText, styles.boldText]}>PRACTICE</Text>
                <View style={styles.separator} />
                <Text style={styles.itemText}><Text style={styles.boldText}>Start: </Text>{item.horaInicial}</Text>
                <Text style={styles.itemText}><Text style={styles.boldText}>End: </Text>{item.horaFinal}</Text>
                <Text style={styles.itemText}>
                  <Text style={styles.boldText}>State: </Text>
                  {item.Estat ? item.Estat : "Confirmada"}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.boldText}>Alumno: </Text>
                  {item.alumne ? item.alumne : selectedAlumn.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      <Animated.View style={[styles.optionsContainer, { transform: [{ translateY: optionsTranslateY }] }]}>
  {eventToManage && (
    <View style={styles.optionsContent}>
      <Text style={styles.modalTitle}>¿Qué acción deseas realizar?</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleAcceptEvent}>
        <Text style={styles.optionButtonText}>Confirmar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#ff6961' }]} onPress={() => handleDeleteConfirmation(eventToManage)}>
        <Text style={styles.optionButtonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionButton, { backgroundColor: '#bdbdbd' }]} onPress={handleCloseOptions}>
        <Text style={styles.optionButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )}
</Animated.View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons onPress={addPractica} name="add-circle" size={70} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.refreshButton} onPress={() => {fetchData()}}>
        <Ionicons name="refresh" size={40} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Fecha:</Text>
            <TextInput
              style={styles.input}
              value={selectedDate}
              onChangeText={() => {
                setSelectedDate();
              }}
              type="date"
            />
            <Text>Selecciona una hora de inicio:</Text>
            <View style={styles.availableHoursContainer}>{renderAvailableHours()}</View>
            <Text>Selecciona un Alumno:</Text>
            <Picker
              selectedValue={selectedAlumn}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedAlumn(itemValue)
              }>
              {students.map((student, index) => (
                <Picker.Item label={student.name} value={student} key={index} />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleModalSubmit}>
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={handleModalCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
  },
  emptyDateText2: {
    color: "black"
  },
  agenda: {
    marginTop: 20,
  },
  emptyDateText: {
    textAlignVertical: "center",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    marginTop: 15,
    margin: 5,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  boldText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemTextContainer: {
    paddingHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  loadingText: {
    textAlign: 'center',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 5,
    borderRadius: 5,
    width: '40%',
  },
  availableHoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  hourButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  selectedHourButton: {
    backgroundColor: 'blue',
  },
  hourButtonText: {
    color: 'black',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 12,
    width: 200,
    marginBottom: 10,
  },
  optionButtonText: {
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  optionsContent: {
    alignItems: 'center',
  },
});
