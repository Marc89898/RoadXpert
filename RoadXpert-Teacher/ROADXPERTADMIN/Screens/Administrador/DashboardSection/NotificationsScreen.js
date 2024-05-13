import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackNavigation from '../../../Components/Navigation/BackNavigation';
import { SegmentedButtons } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationItem = () => {
    return (
        <View style={styles.notification}>
            <Text style={styles.notificationText}>Monica, Autoescola</Text>
            <Text style={[styles.notificationText, styles.notificationDetail]}>Su cita para el dia 25/05/2024 a las 13:00h ha sido confirmada</Text>
            <Text style={[styles.notificationText, styles.notificationDetail, styles.notificationTime]}>Hoy, 22:50</Text>
            <MaterialIcons name="close" size={24} color="black" style={styles.closeIcon} />
            <View style={styles.divider} />
        </View>
    );
};

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
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
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
        backgroundColor: 'transparent', 
        borderWidth: 0, 
    },
    segmentedLabel: {
        borderWidth: 0, 
    },
    notification: {
        position: 'relative', // To position the close icon relative to this view
        paddingHorizontal: 20,
        marginTop: 10,
        paddingBottom: 10, // Add padding bottom to create space for the divider
    },
    notificationText: {
        color: 'grey',
        fontSize: 12,
        width: '90%',
    },
    notificationDetail: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#629CD1',
    },
    notificationTime: {
        top: 2,
        fontSize: 10,
        color: 'grey',
        fontWeight: 'normal',
    },
    divider: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginTop: 10, 
    },
    closeIcon: {
        color: 'grey',
        position: 'absolute',
        right: 15,
    },
});

export default NotificationsScreen;
