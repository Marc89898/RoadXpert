import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked";
import { APIService } from "../../../../../ApiService";

const AdminEditStudent = ({ route, navigation }) => {
    const { alumn } = route.params;
    
    if (!alumn) {
        Alert.alert("Error", "No se proporcionaron datos del alumno.");
        navigation.goBack();
        return null;
    }

    const [nom, setNom] = useState(alumn.Nom || '');
    const [dni, setDNI] = useState(alumn.DNI || '');
    const [adreca, setAdreca] = useState(alumn.Adreca || '');
    const [telefon, setTelefon] = useState(alumn.Telefon || '');
    const [contrasenya, setContrasenya] = useState(alumn.Contrasenya || '');
    const [professorID, setProfessorID] = useState(alumn.ProfessorID || '');

    useEffect(() => {
        if (alumn) {
            setNom(alumn.Nom);
            setDNI(alumn.DNI);
            setAdreca(alumn.Adreca);
            setTelefon(alumn.Telefon);
            setContrasenya(alumn.Contrasenya);
            setProfessorID(alumn.ProfessorID);
        }
    }, [alumn]);

    const handleSave = async () => {
        const updatedAlumn = {
            ID: alumn.ID,
            Nom: nom,
            DNI: dni,
            Adreca: adreca,
            Telefon: telefon,
            Contrasenya: contrasenya.trim(),
            ProfessorID: professorID,
        };

        try {
            const response = await APIService.putAlumn(updatedAlumn);
            Alert.alert("Éxito", "El alumno se ha actualizado con éxito.");
            console.log("Respuesta de la api: ", response)
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar el alumno. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <BackNavigation />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Alumno</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={nom}
                        onChangeText={setNom}
                        placeholder={alumn.Nom}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>DNI:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={dni}
                        onChangeText={setDNI}
                        placeholder={alumn.DNI}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Dirección:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={adreca}
                        onChangeText={setAdreca}
                        placeholder={alumn.Adreca}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={telefon}
                        onChangeText={setTelefon}
                        placeholder={alumn.Telefon}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={contrasenya}
                        onChangeText={setContrasenya}
                        placeholder="Contrasenya"
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Profesor ID:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={professorID}
                        onChangeText={setProfessorID}
                        placeholder={alumn.ProfessorID}
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

export default AdminEditStudent;
