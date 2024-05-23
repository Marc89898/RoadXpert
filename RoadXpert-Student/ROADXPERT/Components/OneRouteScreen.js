import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import ApiHelper from "../data/ApiHelper";
import BackNavigation from "./BottomNavigation/BackNavigation";
import { useRoute } from "@react-navigation/native";

const OneRouteScreen = () => {
    const route = useRoute();
    const practicaRuta = route.params?.practicaRuta || "";
    const [coordinates, setCoordinates] = useState([]);
    const [pointLocations, setPointLocations] = useState([]);
    // practicaRuta = "663cfa883665d85a610d69ac"

    useEffect(() => {
        console.log('practicaRuta OneRouteScreen:', practicaRuta);
        const fetchRoute = async () => {
            if (practicaRuta) {
                try {
                    const fileUri = await ApiHelper.downloadFileFromMongo(practicaRuta);
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
    }, [practicaRuta]);

    return (
        <View style={styles.container}>
            <BackNavigation />
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

export default OneRouteScreen;
