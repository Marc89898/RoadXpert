import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackNavigation from './BottomNavigation/BackNavigation';

const Categories = () => {
    return (
        <View style={{ flex: 1 }}>
            <BackNavigation />
            <View style={styles.header}>
                <Text style={styles.headerText}>Que informacion desea ver</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '70%',
        paddingLeft: 24,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 25,
    },
});

export default Categories;