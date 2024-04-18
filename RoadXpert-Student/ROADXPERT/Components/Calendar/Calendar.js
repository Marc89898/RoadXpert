import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from '../ApiService';
import { DataAdapter } from './Adapter';
import { Alert } from 'react-native';

export default function Calendar() {
    const IDALUMNE = 'Alumne_4';
    const ProfesorID = "Treballador_1";
    const [data, setData] = useState(null);
    const [events, setEvents] = useState({}); 
    const today = new Date();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState(['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventEstat, setEventEstat] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [selectedHour, setSelectedHour] = useState(availableHours[0]); // Nuevo estado para la hora seleccionada

    // Effect to fill the events
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await APIService.fetchEventsCalendar(IDALUMNE);
          const adaptedData = DataAdapter.adaptDataDelete(result);
          setData(adaptedData);
          setEvents(adaptedData);
        } catch (error) {
          console.error('ERROR IN THE DATABASE');
        }
      };
  
      fetchData();
    }, []);
  

  
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
      const event = {
        id: eventId,
        name: eventName,
        duration: "45m",
        horaInicial: selectedHour, // Utiliza selectedHour en lugar de selectedHour
        Ruta: selectedRoute,
        Coche: selectedCar,
        Estat: 'Practica Solicitada',
        AlumneID: IDALUMNE,
        ProfessorID: 'Treballador_3',
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
        const fetchedHours = await APIService.fetchAvailableHours(ProfesorID, selectedDate);
        if (fetchedHours) {
          setAvailableHours(fetchedHours); // Elimina setAvailableHours(null)
          setModalVisible(true);
        } else {
          console.error('No se pudieron obtener las horas disponibles');
        }
      } catch (error) {
        console.error('Error al obtener las horas disponibles:', error);
      }
    };
    
  
    const handleModalSubmit = () => {
      handleAddEvent();
      setModalVisible(false);
      setEventName('');
      setSelectedRoute('');
      setSelectedCar('');
      setSelectedHour(availableHours[0]); // Utiliza setSelectedHour en lugar de availableHours[0]
    };
  
    const handleModalCancel = () => {
      setModalVisible(false);
      setEventName('');
      setSelectedRoute('');
      setSelectedCar('');
      setSelectedHour(availableHours[0]); // Utiliza setSelectedHour en lugar de availableHours[0]
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
        <Agenda
          onDayPress={handleDayPress}
          selected={selectedDate}
          items={events}
          renderItem={(item, key) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleDeleteConfirmation(item)}>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}><Text style={styles.boldText}>Name: </Text>{item.name}</Text>
                <Text style={styles.itemText}><Text style={styles.boldText}>Time: </Text>{item.horaInicial}</Text>
                <Text style={styles.itemText}><Text style={styles.boldText}>Duration: </Text>{item.duration}</Text>
                <Text style={styles.itemText}><Text style={styles.boldText}>Route: </Text>{item.Ruta}</Text>
                <Text style={styles.itemText}><Text style={styles.boldText}>Car: </Text>{item.Coche}</Text>
                <Text style={styles.itemText}><Text style={styles.boldText}>State: </Text>{item.Estat}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
              <Text>Selecciona una hora:</Text>
              <View style={styles.availableHoursContainer}>{renderAvailableHours()}</View>
              <TextInput
                style={styles.input}
                value={eventName}
                onChangeText={setEventName}
                placeholder="Nombre de la práctica"
              />
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
    itemText: {
      color: '#888',
      fontSize: 16,
    },
    item: {
      margin: 5,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    boldText: {
      color: 'black',
      fontWeight: 'bold',
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
