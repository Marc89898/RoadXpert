import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import CircleImage1 from '../assets/images/Dashboard/notification.png';
import CircleImage2 from '../assets/images/Dashboard/settings.png';
import TuImagen from '../assets/images/Dashboard/ProvaFoto.jpeg';

const Dashboard = () => {
    const navigation = useNavigation(); 
    const handleCalender = () => {
        navigation.navigate('Calendar');
    };
    const handleRoutes = () => {
        navigation.navigate('RouteInformation');
    };
    const handleNotifications = () => {
        navigation.navigate('notificationsScreen');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
                <ImageBackground source={TuImagen} style={styles.imageBackground}>
                    <View style={styles.overlay}>
                        <Text style={styles.welcomeText}>Welcome Back,</Text>
                        <Text style={styles.nameText}>Josep Maria Boix</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.circleContainer}>
                <TouchableOpacity onPress={handleNotifications}>
                    <View style={styles.circle}>
                        <Image source={CircleImage1} style={styles.circleImage} />
                    </View>
                </TouchableOpacity>
                <View style={styles.circle}>
                    <Image source={CircleImage2} style={styles.circleImage} />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>¡I'm, Dashboard Page!</Text>
                <Button style={styles.button} onPress={handleCalender} mode="contained">Calendario</Button>
                <Button style={styles.button} onPress={handleRoutes} mode="contained">Rutas</Button>
            </View>
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
    },
    imageContainer: {
        borderBottomRightRadius: 100,
        overflow: 'hidden',
    },
    imageBackground: {
        height: 232,
        width: '100%',
        resizeMode: 'cover',
    },
    circleContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    circleImage: {
        width: 23,
        resizeMode: 'contain',
        borderRadius: 30,
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    welcomeText: {
        fontSize: 8,
        color: 'white',
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Dashboard;
