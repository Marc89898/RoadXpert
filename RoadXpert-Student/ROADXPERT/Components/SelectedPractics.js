import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackNavigation from './BottomNavigation/BackNavigation';
import MapView from 'react-native-maps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SelectedPractics = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const route = useRoute();
    const { title } = route.params;

    return (
        <View style={styles.container}>
            <BackNavigation />
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>Muy Bien!! 🎉</Text>
                            <Text style={styles.subTitle}>Lorem Ipsum is simply dummy text of the printing</Text>
                            <View style={styles.square}></View>
                        </View>
                    </View>
                </Modal>
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
        marginBottom: 10,
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        borderTopRightRadius: 30,
        width: '100%',
        height: 240,
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 10,
        marginBottom: 15,
    },
    square: {
        width: 340,
        height: 130,
        backgroundColor: 'grey',
        borderRadius: 10,
    },
});

export default SelectedPractics;