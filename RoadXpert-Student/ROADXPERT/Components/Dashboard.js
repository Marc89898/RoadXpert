import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './BottomNavigation/NavBar.js';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation(); 
    const handleCalender = () => {
        navigation.navigate('AppointmentScreen');
    };
    const handleRoutes = () => {
        navigation.navigate('RouteInformation');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>¡I'm, Dashboard Page!</Text>
                <Button style={styles.button} onPress={handleCalender} mode="contained">Calendario</Button>
                <Button style={styles.button} onPress={handleRoutes} mode="contained">Rutas</Button>
            </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        margin: 5,
    }
});

export default Dashboard;
