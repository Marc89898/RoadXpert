import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import NavBar from './BottomNavigation/NavBar';
import { useNavigation } from '@react-navigation/native'; // Importa esto si estás utilizando React Navigation

const RouteInformation = () => {
    const navigation = useNavigation();

    const handleViewRoutesMap = () => {
        navigation.navigate('ViewRoutesMap');
    };

    const handleViewCategories = () => {
        navigation.navigate('Categories');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Que informacion desea ver</Text>
            </View>
            <TouchableOpacity onPress={handleViewRoutesMap}>
                <Card style={[styles.card, { backgroundColor: '#00041A' }]}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>View Routes</Text>
                            <Text style={styles.subText}>Ver todas las calles recorridas</Text>
                            <Text style={[styles.infoText, { alignSelf: 'flex-start' }]}>130 km en total</Text>
                        </View>
                        <Image
                            source={require('../assets/images/RouteInformation/Map.png')} // Reemplaza './path/to/your/image.png' con la ruta de tu imagen
                            style={styles.image}
                        />
                    </Card.Content>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleViewCategories}> 
                <Card style={[styles.card, { backgroundColor: '#081A00' }]}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Categorías</Text>
                            <Text style={styles.subText}>Consulta dónde es que más te equivocas</Text>
                            <Text style={[styles.infoText, { alignSelf: 'flex-start' }]}>Revisar Señales</Text>
                        </View>
                        <Image
                            source={require('../assets/images/RouteInformation/Sign.png')}
                            style={[styles.image, styles.centeredImage]}
                        />
                    </Card.Content>
                </Card>
            </TouchableOpacity>

            <Card style={[styles.card, { backgroundColor: '#1A0000' }]}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Statics</Text>
                        <Text style={styles.subText}>Revisa tus estadisticas</Text>
                        <Text style={[styles.infoText, { alignSelf: 'flex-start' }]}>Estadisticas</Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/images/RouteInformation/Statics.png')} // Reemplaza './path/to/your/image.png' con la ruta de tu imagen
                            style={[styles.image, styles.centeredImage]}
                        />
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            <Card style={[styles.card, { backgroundColor: '#00171A' }]}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Practice</Text>
                        <Text style={styles.subText}>Consulta tus practicas</Text>
                        <Text style={[styles.infoText, { alignSelf: 'flex-start' }]}>3 Practicas</Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/images/RouteInformation/Car.png')} // Reemplaza './path/to/your/image.png' con la ruta de tu imagen
                            style={[styles.image, styles.centeredImage]}
                        />
                    </TouchableOpacity>
                </Card.Content>
            </Card>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '70%',
        paddingTop: 100,
        paddingLeft: 24,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 25,
    },
    card: {
        width: '90%',
        height: 106,
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 20,
    },
    centeredImage: {
        alignSelf: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    subText: {
        color: 'white',
        fontSize: 10,
    },
    infoText: {
        marginTop: 6,
        color: 'white',
        fontSize: 10,
        backgroundColor: '#7246EC',
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
});

export default RouteInformation;
