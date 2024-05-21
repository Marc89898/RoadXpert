import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked";
import { APIService } from "../../../../../ApiService";

const AdminViewWorker = ({ route, navigation }) => {
    const { professor } = route.params;

    const [nom, setNom] = useState(professor.Nom || '');
    const [cognom, setCognom] = useState(professor.Cognom || '');
    const [segonCognom, setSegonCognom] = useState(professor.SegonCognom || '');
    const [dni, setDNI] = useState(professor.DNI || '');
    const [adreca, setAdreca] = useState(professor.Adreca || '');
    const [sexe, setSexe] = useState(professor.Sexe || '');
    const [horariID, setHorariID] = useState(professor.HorariID || '');
    const [password, setPassword] = useState(professor.Password || '');

    useEffect(() => {
        if (professor) {
            setNom(professor.Nom);
            setCognom(professor.Cognom);
            setSegonCognom(professor.SegonCognom);
            setDNI(professor.DNI);
            setAdreca(professor.Adreca);
            setSexe(professor.Sexe);
            setHorariID(professor.HorariID);
            setPassword(professor.Password);
        }
    }, [professor]);

    const handleSave = async () => {
        const updatedProfessor = {
            ID: professor.ID,
            Nom: nom,
            Cognom: cognom,
            SegonCognom: segonCognom,
            DNI: dni,
            Adreca: adreca,
            CarnerConduirFrontal: "",
            CarnerConduirDerrera: "",
            Sexe: sexe,
            HorariID: horariID,
            Password: password.trim(),
        };

        const response = await APIService.putProfessor(updatedProfessor);
        
        Alert.alert("Éxito", "El profesor se ha actualizado con éxito.");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <BackNavigation />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Worker</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={nom}
                        onChangeText={setNom}
                        placeholder={professor.Nom}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellido:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={cognom}
                        onChangeText={setCognom}
                        placeholder={professor.Cognom}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Segundo Apellido:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={segonCognom}
                        onChangeText={setSegonCognom}
                        placeholder={professor.SegonCognom}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>DNI:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={dni}
                        onChangeText={setDNI}
                        placeholder={professor.DNI}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Dirección:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={adreca}
                        onChangeText={setAdreca}
                        placeholder={professor.Adreca}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sexo:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={sexe}
                        onChangeText={setSexe}
                        placeholder={professor.Sexe}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Horario ID:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={horariID}
                        onChangeText={setHorariID}
                        placeholder={professor.HorariID}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={professor.Password}
                        secureTextEntry
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

export default AdminViewWorker;