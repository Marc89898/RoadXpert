import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CircleImage1 from '../assets/images/Dashboard/notification.png';
import CircleImage2 from '../assets/images/Dashboard/settings.png';
import TuImagen from '../assets/images/Dashboard/ProvaFoto.jpeg';
import { APIService } from './ApiService';
import Config from '../configuracions';

const Dashboard = () => {
    const navigation = useNavigation();
    const [nextEvent, setNextEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleNotifications = () => {
        navigation.navigate('notificationsScreen');
    };

    useEffect(() => {
        const loadNextEvent = async () => {
            try {
                const events = await APIService.fetchEventsCalendar(Config.IDALUMNE);
                const currentDate = new Date();
                events.sort((a, b) => new Date(a.Data) - new Date(b.Data));
                const nextEvent1 = events.find(event => new Date(event.Data) > currentDate);
                if (nextEvent1) {
                    console.log("Next Event: ", nextEvent1);
                    setNextEvent(nextEvent1);
                } else {
                    console.log("No upcoming events found.");
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
    
        loadNextEvent();
    }, []);
    
    
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
            </View>
            {nextEvent && (
                <View style={styles.nextEventContainer}>
                    <Text style={styles.nextEventTitle}>Siguiente Practica:</Text>
                    <Text>{`Fecha: ${nextEvent.Data}`}</Text>
                    <Text>{`Hora Inicio: ${nextEvent.HoraInici}`}</Text>
                    <Text>{`Hora Fin: ${nextEvent.HoraFi}`}</Text>
                    <Text>{`Ruta: ${nextEvent.Ruta}`}</Text>
                </View>
            )}
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
        marginBottom: 20,
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
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    nextEventContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    nextEventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextEventDetails: {
        marginTop: 10,
    },
});

export default Dashboard;
