import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import ApiHelper from "./ApiHelper";

const MapScreen = ({ practiceData }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [pointLocations, setPointLocations] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (practiceData && practiceData.Ruta) {
                try {
                    const fileUri = await ApiHelper.downloadFileFromMongo(practiceData.Ruta);
                    const routeData = await FileSystem.readAsStringAsync(fileUri);
                    const routeGeoJSON = JSON.parse(routeData);

                    const newCoordinates = routeGeoJSON.geometry.coordinates.map((coord) => ({
                        latitude: coord[1],
                        longitude: coord[0],
                    }));

                    const newPointLocations = routeGeoJSON.features.map((feature) => ({
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                        title: feature.properties.title,
                        description: feature.properties.description,
                    }));

                    setCoordinates(newCoordinates);
                    setPointLocations(newPointLocations);
                } catch (error) {
                    console.error('Error al cargar la ruta:', error);
                }
            }
        };

        fetchRoute();
    }, [practiceData]);

    return (
        <View style={styles.container}>
            {coordinates.length > 0 && (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: coordinates[0]?.latitude || 0,
                        longitude: coordinates[0]?.longitude || 0,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}
                >
                    {/* Marcadores de los puntos favoritos */}
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

                    {/* Polilínea */}
                    <Polyline
                        coordinates={coordinates}
                        strokeWidth={5}
                        strokeColor="grey"
                    />
                </MapView>
            )}
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
});

export default MapScreen;