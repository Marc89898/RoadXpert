import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import ApiHelper from "./ApiHelper";

const PracticeScreen = ({ practiceData }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [recording, setRecording] = useState(false);
    const [pointLocations, setPointLocations] = useState([]);

    useEffect(() => {
        let intervalId;

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            if (recording) {
                intervalId = setInterval(async () => {
                    const newLocation = await Location.getCurrentPositionAsync({});
                    setCurrentLocation(newLocation.coords);
                    setCoordinates((prev) => [
                        ...prev,
                        {
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                        },
                    ]);
                }, 3000);
            } else {
                clearInterval(intervalId);
            }
        })();

        return () => {
            clearInterval(intervalId);
        };
    }, [recording]);

    const handleStartStopRecording = async () => {
        if (recording) {
            setRecording(false);
            // Crear routeGeoJSON cuando se detiene la grabación
            const routeGeoJSON = {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: coordinates.map((coord) => [
                        coord.longitude,
                        coord.latitude,
                    ]),
                },
                features: pointLocations.map((location, index) => ({
                    type: "Feature",
                    properties: {
                        title: location.title,
                        description: location.description,
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [location.longitude, location.latitude],
                    },
                })),
            };

            // Guardar la ruta
            await saveRouteFile(routeGeoJSON);
        } else {
            setRecording(true);
        }
    };

    const handleAddPoint = () => {
        if (currentLocation) {
            setPointLocations((prevLocations) => [
                ...prevLocations,
                {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    title: "Punto de Interés",
                    description: "Descripción del punto de interés",
                },
            ]);
        }
    };

    const saveRouteFile = async (routeData) => {
        try {
            const fileUri = FileSystem.documentDirectory + 'ruta.json';
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(routeData));
            console.log('Ruta guardada en:', fileUri);
            console.log('Ruta: ' + JSON.stringify(routeData))
            await handleFileUpload(fileUri);
            handleDeleteFile(fileUri);

        } catch (error) {
            console.error('Error al guardar la ruta:', error);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            const objectID = await ApiHelper.uploadFileToMongo(file);
            console.log('ObjectID from MongoDB:', objectID);
            practiceData.Ruta = objectID;
            handleCreatePractica(practiceData);
        } catch (error) {
            console.error('Error handling file upload:', error);
        }
    };

    const handleCreatePractica = async (practicaData) => {
        try {
            const response = await ApiHelper.createPracticaInSQL(practicaData);
            console.log('Response from SQL:', response);
        } catch (error) {
            console.error('Error handling create practica:', error);
        }
    };

    const handleDeleteFile = async (fileUri) => {
        try {
            await FileSystem.deleteAsync(fileUri);
            console.log('Archivo eliminado:', fileUri);
        } catch (error) {
            console.error('Error al eliminar el archivo:', error);
        }
    };

    return (
        <View style={styles.container}>
            {coordinates.length > 0 && (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: currentLocation
                            ? currentLocation.latitude
                            : coordinates[0]?.latitude || 0,
                        longitude: currentLocation
                            ? currentLocation.longitude
                            : coordinates[0]?.longitude || 0,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}
                >
                    {pointLocations.map((favoriteLocation, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: favoriteLocation.latitude,
                                longitude: favoriteLocation.longitude,
                            }}
                            title={favoriteLocation.title}
                            description={favoriteLocation.description}
                            pinColor="blue"
                        />
                    ))}

                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Mi Ubicación"
                            description="Estoy aquí"
                        />
                    )}

                    <Polyline
                        coordinates={coordinates}
                        strokeWidth={5}
                        strokeColor="grey"
                    />
                </MapView>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    title={recording ? "Detener Ruta" : "Empezar Ruta"}
                    onPress={handleStartStopRecording}
                />
                <Button
                    title="ADD POINT"
                    onPress={handleAddPoint}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
});

export default PracticeScreen;
