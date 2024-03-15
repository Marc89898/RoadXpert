import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './BottomNavigation/NavBar';

const RouteInformation = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Que informacion desea ver</Text>
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

export default RouteInformation;
