import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackNavigation from './BottomNavigation/BackNavigation';

const PracticsScreen = () => {
    const navigation = useNavigation();

    const handleSelected = (title) => {
        navigation.navigate('SelectedPractics', { title });
    };

    const PracticeCard = ({ title, subtitle, subsubtitle, errorCount }) => {
        return (
            <TouchableOpacity onPress={() => handleSelected(title)}>
                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.leftContent}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{subtitle}</Text>
                            <Text style={styles.subsubtitle}>{subsubtitle}</Text>
                        </View>
                        <View style={styles.rightContent}>
                            <View style={styles.redTextContainer}>
                                <Text style={styles.redText}>{errorCount} Errores</Text>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Empezar</Text>
                                <MaterialCommunityIcons name="play" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <BackNavigation />
            <View style={styles.header}>
                <Text style={styles.headerText}>Prácticas Elaboradas</Text>
            </View>

            <PracticeCard
                title="Primera Práctica"
                subtitle="Primeros pasos"
                subsubtitle="14/01/24"
                errorCount={4}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingLeft: 24,
    },
    headerText: {
        fontSize: 25,
    },
    card: {
        height: 106,
        margin: 16,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContent: {
        flex: 1,
    },
    rightContent: {
        marginLeft: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    subtitle: {
        fontSize: 10,
        color: '#949494',
    },
    subsubtitle: {
        fontSize: 10,
    },
    redTextContainer: {
        backgroundColor: '#FF0000',
        borderRadius: 50,
        paddingHorizontal: 7,
        paddingVertical: 4,
        alignSelf: 'flex-end',
    },
    redText: {
        textAlign: 'center',
        color: 'white',
    },
    button: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#1F41BB',
        borderRadius: 50,
        width: 103,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText: {
        fontSize: 12,
        color: 'black',
    },
});

export default PracticsScreen;
