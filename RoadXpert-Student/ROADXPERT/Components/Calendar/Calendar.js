import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from '../ApiService';
import { DataAdapter } from './Adapter';
import { Alert } from 'react-native';
import Config from "../../configuracions"
import { Picker } from '@react-native-picker/picker';
export default function Calendar() {

    const [data, setData] = useState(null);
    const [events, setEvents] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [availableHours, setAvailableHours] = useState(['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedAlumn, setSelectedAlumn] = useState('');
    const [students, setStudents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [selectedHour, setSelectedHour] = useState(availableHours[0]);


    const fetchData = async () => {
      try {
        const result = await APIService.fetchEventsCalendar(Config.IDALUMNE);
        const adaptedData = await DataAdapter.adaptDataDelete(result);
        setData(adaptedData);
        setEvents(adaptedData);
      } catch (error) {
        console.error('ERROR IN THE DATABASE: ' + error);
      }
      
    };
    // Effect to fill the events
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleDeleteConfirmation = (item) => {
      setEventToDelete(item);
      setDeleteConfirmationVisible(true);
      fetchData();
    };
  
      
    const handleDayPress = (day) => {
      setSelectedDate(day.dateString);
    };

    const handleDeleteEvent = async () => {
      const eventId = eventToDelete.id;
      try {
        const updatedEvent = await APIService.deleteEventCalendar(eventId, "EstatHora_6");
        console.log('Event updated successfully:', updatedEvent);

        Alert.alert(
          'Evento Actualizado',
          'El evento se ha modificado correctamente.',
          [
            { text: 'OK', onPress: () => {
                setDeleteConfirmationVisible(false);
              }
            }
          ],
          { cancelable: false }
        );
        
      } catch(error) {
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
        Ruta: selectedRoute,
        Coche: selectedCar,
        Estat: 'Practica Solicitada',
        AlumneID: Config.IDALUMNE,
        ProfessorID: Config.ProfesorID,
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
    

    const renderEmptyDate1 = () => {
      return (
        <Text style={[styles.emptyDateText]}>
          <Text style={[styles.boldText, styles.emptyDateText2]}>EMPTY DATE!</Text>
        </Text>
  
      );
    }

    const addPractica = async () => {
      try {
        const fetchedHours = await APIService.fetchAvailableHours(Config.ProfesorID, selectedDate);
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
      setEventName('');
      setSelectedRoute('');
      setSelectedCar('');
      setSelectedHour(availableHours[0]);
    };
  
    const handleModalCancel = () => {
      setModalVisible(false);
      setEventName('');
      setSelectedRoute('');
      setSelectedCar('');
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

                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={[styles.itemText, styles.loadingText]}>
            <Text style={styles.boldText}>LOADING EVENTS...</Text>
          </Text>
        )}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons onPress={addPractica} name="add-circle" size={70} color="black" />
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
              <Text>¿Estás seguro de que deseas eliminar este evento? Vas a mandar una peticion para borrar la practica a tu professor</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleDeleteEvent}>
                  <Text style={styles.buttonText}>Peticion para Eliminar</Text>
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
  