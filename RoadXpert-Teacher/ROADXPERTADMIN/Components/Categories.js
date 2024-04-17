import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import BackNavigation from './BottomNavigation/BackNavigation';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
    const navigation = useNavigation();

    const handleSelected = (text, subText, subTextInfo, imageSource) => {
        navigation.navigate('SelectedCategory', { categoryText: text, subText: subText, subTextInfo: subTextInfo, imageSource: imageSource });
    };    

    const renderCard = (text, subText, subTextInfo, imageSource) => {
        return (
            <TouchableOpacity onPress={() => handleSelected(text, subText, subTextInfo, imageSource)}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Image
                            source={imageSource}
                            style={styles.image}
                        />
                        <Text style={styles.text}>
                            Señales de<Text style={styles.boldRed}> {text} </Text>
                        </Text>
                        <Text style={styles.subText}>{subText}</Text>
                        <View style={styles.subTextInfoContainer}>
                            <Text style={styles.subTextInfo}>{subTextInfo}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };    

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
                            {renderCard("STOP", "Presta especial atención con las señales de STOP", "5 señales", require('../assets/images/Categories/StopSign.png'))}
                            {renderCard("STOP", "Presta especial atención con las señales de STOP", "2 señales", require('../assets/images/Categories/StopSign.png'))}
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.headerText}>Categories</Text>
                    <Text style={styles.subHeaderText}>VELOCIDADES</Text>
                    <View style={styles.line}></View>
                    <View style={styles.cardsContainer}>
                        <View style={styles.row}>
                            {renderCard("VELOCIDAD", "Tienes que fijar-te mas en el velocimetro", "7 señales", require('../assets/images/Categories/30Speed.png'))}
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
        height: '57%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -25,
    },
    text: {
        fontWeight: 'bold',
        top: 5,
        fontSize: 10,
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