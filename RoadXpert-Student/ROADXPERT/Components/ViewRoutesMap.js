import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackNavigation from './BottomNavigation/BackNavigation';
import { Button } from 'react-native-paper';

const ViewRoutesMap = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <BackNavigation style={styles.backNavigation} />
            <MapView style={[styles.map, { zIndex: -1 }]} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Maps</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="filter" size={25} style={styles.icon} />
                </TouchableOpacity>
            </View>
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
                        <Text style={styles.title}>Practicas</Text>
                        <View style={styles.viewModel}></View>
                        <Button
                            style={styles.continueButton}
                            mode="contained"
                            onPress={() => setModalVisible(false)}>
                            Continuar
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    backNavigation: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, 
    },
    header: {
        position: 'absolute',
        top: 100,
        left: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        width: '90%',
    },
    headerText: {
        fontSize: 25,
        color: 'black',
    },
    icon: {
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
    },
    viewModel: {
        borderRadius: 15,
        height: 200,
        backgroundColor: 'grey',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        fontSize: 25,
        color: 'black',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ViewRoutesMap;
