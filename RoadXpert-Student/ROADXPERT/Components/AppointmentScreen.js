import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './BottomNavigation/NavBar';
// import DatePicker from 'react-native-modern-datepicker';

const AppointmentScreen = () => {
    // const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Schedule Appointment</Text>
            </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    header: {
        paddingTop: 100,
        paddingLeft: 24,
    },
    headerText: {
        fontSize: 25,
    },
});

export default AppointmentScreen;
