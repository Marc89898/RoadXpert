import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from '../ApiService';
import { DataAdapter } from './Adapter';
import { Alert } from 'react-native';
import Config from "../configuracions"
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";



export default function ProfessorCalendar() {
  const [events, setEvents] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableHours, setAvailableHours] = useState(['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']);
  const [selectedAlumn, setSelectedAlumn] = useState('');
  const [eventName, setEventName] = useState('');
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedHour, setSelectedHour] = useState(availableHours[0]);
  const [students, setStudents] = useState([]);
  const navigation = useNavigation();

  fetchData = async () => {
    try {
      const result = await APIService.fetchEventsCalendar(Config.ProfessorID);
      const adaptedData = DataAdapter.adaptPracticaToAgenda(result);
      setSelectedDate(selectedDate.toString());
      setEvents(adaptedData);
    } catch (error) {
      console.error('ERROR IN THE DATABASE: ' + error);
    }
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


  const handleDeleteConfirmation = (item) => {
    setEventToDelete(item);
    setDeleteConfirmationVisible(true);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleDeleteEvent = async () => {
    const eventId = eventToDelete.id;
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
              fetchData()
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error in the delete petition: " + error.message)
    }
  };


  const handleAddEvent = () => {
    const eventId = uuidv4();
    Horas = selectedHour.split(" ")
    const event = {
      id: eventId,
      name: "Practica",
      horaInicial: Horas[0],
      horaFinal: Horas[2],
      Ruta: "",
      Coche: "",
      Estat: '',
      AlumneID: selectedAlumn.id,
      ProfessorID: Config.ProfessorID,
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
      eventAdapted = DataAdapter.adaptJsonToDatabase(event)
      APIService.addEventCalendar(eventAdapted)
      return updatedEvents;
    });
  };

  const addPractica = async () => {
    try {
      const fetchedHours = await APIService.fetchAvailableHours(Config.ProfessorID, selectedDate);
      loadStudents()
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

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const renderEmptyDate1 = () => {
    return (
      <Text style={[styles.emptyDateText]}>
        <Text style={[styles.boldText, styles.emptyDateText2]}>EMPTY DATE!</Text>
      </Text>

    );
  }

  return (
    <View style={{ flex: 1 }}>
      {events !== null ? (
        <Agenda
          theme={
            {
              
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
            }
          }
          style={styles.agenda}
          selected={selectedDate}
          items={events}
          onDayPress={handleDayPress}
          renderEmptyData={renderEmptyDate1}
          renderItem={(item) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleDeleteConfirmation(item)}>
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
      ) : (
        <Text style={[styles.itemText, styles.loadingText]}>
          <Text style={styles.boldText}>LOADING EVENTS...</Text>
        </Text>
      )}
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
              <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={handleModalCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={handleModalSubmit}>
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons onPress={addPractica} name="add-circle" size={70} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmationVisible}
        onRequestClose={() => {
          setDeleteConfirmationVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Vas a borrar una practica estas seguro ? </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleDeleteEvent}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={handleCancelDelete}>
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
});
