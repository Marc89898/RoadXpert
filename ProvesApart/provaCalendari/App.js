import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from './ApiService';
import { DataAdapter } from './Adapter';

export default function App() {
  const IDALUMNE = '77844111-E0AD-41A1-BC63-51A5EE79DDDF';
  const [data, setData] = useState(null);
  const [events, setEvents] = useState({});

  // Effect to fill the events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await APIService.fetchEvents(IDALUMNE);
        const adaptedData = DataAdapter.adaptData(result);
        setData(adaptedData);
        setEvents(adaptedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  console.log("Datos finales:", data);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const availableHours = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedHour, setSelectedHour] = useState(availableHours[0]);
  const [eventName, setEventName] = useState('');
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDeleteConfirmation = (item) => {
    setEventToDelete(item);
    setDeleteConfirmationVisible(true);
  };

  const handleDeleteEvent = () => {
    const eventId = eventToDelete.id;
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      for (const date in updatedEvents) {
        const eventsOnDate = updatedEvents[date];
        const eventIndex = eventsOnDate.findIndex((event) => event.id === eventId);
        if (eventIndex !== -1) {
          updatedEvents[date] = [...eventsOnDate.slice(0, eventIndex), ...eventsOnDate.slice(eventIndex + 1)];
          if (updatedEvents[date].length === 0) {
            delete updatedEvents[date];
          }
        }
      }
      return updatedEvents;
    });
    setDeleteConfirmationVisible(false);
  };

  const handleAddEvent = () => {
    const eventId = uuidv4();
    const event = { id: eventId, descripcion: eventName, hora: selectedHour };
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      if (updatedEvents[selectedDate]) {
        updatedEvents[selectedDate].push(event);
      } else {
        updatedEvents[selectedDate] = [event];
      }
      return updatedEvents;
    });
  };

  const addPractica = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    handleAddEvent();
    setModalVisible(false);
    setEventName('');
    setSelectedDate(formattedDate);
    setSelectedHour(availableHours[0]);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEventName('');
    setSelectedDate(formattedDate);
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
      <Agenda
        selected={formattedDate}
        items={events}
        renderItem={(item, key) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleDeleteConfirmation(item)}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}><Text style={styles.boldText}>Event: </Text>{item.descripcion}</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Time: </Text>{item.hora}</Text>
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
              onChangeText={setSelectedDate}
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
            <Text>¿Estás seguro de que deseas eliminar este evento?</Text>
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