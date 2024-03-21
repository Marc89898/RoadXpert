import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackNavigation from './BottomNavigation/BackNavigation';

const Cars = () => {
    const navigation = useNavigation();

    const handleSelected = (title) => {
        navigation.navigate('SelectedPractics', { title });
    };

    return (
        <View style={styles.container}>
            <BackNavigation />
            <View style={styles.header}>
                <Text style={styles.headerText}>Prácticas Elaboradas</Text>
            </View>
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
    }
});

export default Cars;
