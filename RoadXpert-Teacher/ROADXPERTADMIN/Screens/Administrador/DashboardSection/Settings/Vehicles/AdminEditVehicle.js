import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView, TextInput } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import { APIService } from "../../../../../ApiService";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked";

const AdminEditVehicle = ({ route }) => {
    const { car } = route.params;

    // Manejar valores nulos o indefinidos
    const initialMatricula = car?.Matricula || '';
    const initialMarca = car?.Marca || '';
    const initialModel = car?.Model || '';
    const initialAnyFabricacio = car?.AnyFabricacio !== null && car?.AnyFabricacio !== undefined ? car.AnyFabricacio.toString() : '';
    const initialTipus = car?.Tipus || '';
    const initialColor = car?.Color !== null && car?.Color !== undefined ? car.Color.toString() : '';

    const [matricula, setMatricula] = useState(initialMatricula);
    const [marca, setMarca] = useState(initialMarca);
    const [model, setModel] = useState(initialModel);
    const [anyFabricacio, setAnyFabricacio] = useState(initialAnyFabricacio);
    const [tipus, setTipus] = useState(initialTipus);
    const [color, setColor] = useState(initialColor);

    useEffect(()=> {
        console.log(car)
    }, [])

    const handleSave = async () => {
        const updatedCar = {
            Matricula: matricula,
            Marca: marca,
            Model: model,
            AnyFabricacio: anyFabricacio,
            Tipus: tipus,
            Color: color,
        };
        console.log("Datos del coche actualizados:", updatedCar);

        try {
            APIService.putCar(updatedCar)
            Alert.alert("Éxito", "La información del coche se ha actualizado con éxito.");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar la información del coche. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <BackNavigation />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Vehicle</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Matrícula:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={matricula}
                        onChangeText={setMatricula}
                        placeholder={initialMatricula}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Marca:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={marca}
                        onChangeText={setMarca}
                        placeholder={initialMarca}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Modelo:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={model}
                        onChangeText={setModel}
                        placeholder={initialModel}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Año de Fabricación:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={anyFabricacio}
                        onChangeText={setAnyFabricacio}
                        placeholder={initialAnyFabricacio}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={tipus}
                        onChangeText={setTipus}
                        placeholder={initialTipus}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Color:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={color}
                        onChangeText={setColor}
                        placeholder={initialColor}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Guardar" onPress={handleSave} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default AdminEditVehicle;
