import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminNoPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>T'has vist?, Tens cara de ADMIN?, Fracasat, fora d'aqui</Text>
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
        textAlign: 'center',
        width: 300,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AdminNoPage;