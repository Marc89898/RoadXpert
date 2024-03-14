import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './BottomNavigation/NavBar.js';

const Dashboard = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>¡I'm, Dashboard Page!</Text>
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
});

export default Dashboard;
