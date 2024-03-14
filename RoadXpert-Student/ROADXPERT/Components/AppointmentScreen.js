import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>¡Hola! Este es un texto centrado en la pantalla.</Text>
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
        textAlign: 'center',
    },
});

export default AppointmentScreen;