import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackNavigation from './BottomNavigation/BackNavigation';
import { SegmentedButtons } from 'react-native-paper';

const NotificationsScreen = () => {
    const [value, setValue] = React.useState('');

    return (
        <View style={styles.container}>
            <BackNavigation />
            <View style={styles.header}>
                <Text style={styles.headerText}>Notificaciones</Text>
            </View>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'all',
                        label: 'All',
                    },
                    {
                        value: 'unread',
                        label: 'Unread',
                    },
                    { value: 'read', label: 'Read' },
                ]}
                style={styles.segmentedButtons}
                labelStyle={styles.segmentedLabel}
                buttonStyle={styles.segmentedButton}
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
    segmentedButtons: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 1
    },
    segmentedButton: {
        backgroundColor: 'transparent', // Eliminamos el fondo
        borderWidth: 0, // Eliminamos el borde
    },
    segmentedLabel: {
        borderWidth: 0, // Eliminamos el borde
    },
});

export default NotificationsScreen;
