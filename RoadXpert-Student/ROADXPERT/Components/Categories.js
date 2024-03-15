import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView  } from 'react-native';
import BackNavigation from './BottomNavigation/BackNavigation';
import { Card } from 'react-native-paper';

const Categories = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={{ flex: 1 }}>
                <BackNavigation />
                <View style={styles.container}>
                    <Text style={styles.headerText}>Categories</Text>
                    <Text style={styles.subHeaderText}>SEÑALES</Text>
                    <View style={styles.line}></View>
                    <View style={styles.cardsContainer}>
                        <View style={styles.row}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Image
                                        source={require('../assets/images/Categories/StopSign.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>
                                        Señales de
                                        <Text style={styles.boldRed}> STOP</Text>
                                    </Text>
                                    <Text style={styles.subText}>Presta especial atención con las señales de STOP</Text>
                                    <View style={styles.subTextInfoContainer}>
                                        <Text style={styles.subTextInfo}>7 Señales</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Image
                                        source={require('../assets/images/Categories/StopSign.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>
                                        Señales de
                                        <Text style={styles.boldRed}> STOP</Text>
                                    </Text>
                                    <Text style={styles.subText}>Presta especial atención con las señales de STOP</Text>
                                    <View style={styles.subTextInfoContainer}>
                                        <Text style={styles.subTextInfo}>7 Señales</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                        <View style={styles.row}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Image
                                        source={require('../assets/images/Categories/StopSign.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>
                                        Señales de
                                        <Text style={styles.boldRed}> STOP</Text>
                                    </Text>
                                    <Text style={styles.subText}>Presta especial atención con las señales de STOP</Text>
                                    <View style={styles.subTextInfoContainer}>
                                        <Text style={styles.subTextInfo}>7 Señales</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.headerText}>Categories</Text>
                    <Text style={styles.subHeaderText}>VELOCIDADES</Text>
                    <View style={styles.line}></View>
                    <View style={styles.cardsContainer}>
                        <View style={styles.row}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Image
                                        source={require('../assets/images/Categories/30Speed.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>
                                        Señales de
                                        <Text style={styles.boldRed}> VELOCIDAD</Text>
                                    </Text>
                                    <Text style={styles.subText}>Tienes que fijar-te mas en el velocimetro</Text>
                                    <View style={styles.subTextInfoContainer}>
                                        <Text style={styles.subTextInfo}>7 Señales</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Image
                                        source={require('../assets/images/Categories/30Speed.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>
                                        Señales de
                                        <Text style={styles.boldRed}> VELOCIDAD</Text>
                                    </Text>
                                    <Text style={styles.subText}>Tienes que fijar-te mas en el velocimetro</Text>
                                    <View style={styles.subTextInfoContainer}>
                                        <Text style={styles.subTextInfo}>7 Señales</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        paddingLeft: 24,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 25,
    },
    subHeaderText: {
        fontSize: 20,
        marginTop: 25,
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 104,
        marginBottom: 10,
    },
    cardsContainer: {
        top: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    card: {
        backgroundColor: '#D9D9D9',
        width: 165,
        height: 171,
        borderRadius: 20,
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -25,
    },
    text: {
        top: 5,
        fontSize: 12,
        textAlign: 'center',
    },
    boldRed: {
        fontWeight: 'bold',
        color: 'red',
    },
    subText: {
        fontSize: 10,
        marginTop: 10,
        textAlign: 'center',
    },
    subTextInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTextInfo: {
        marginTop: 5,
        backgroundColor: '#5D5D5D',
        paddingHorizontal: 10,
        color: 'white',
        paddingVertical: 3,
        borderRadius: 50,
        textAlign: 'center',
    }
});

export default Categories;
