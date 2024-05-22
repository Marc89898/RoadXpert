import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import BackNavigation from "../../../../../Components/Navigation/BackNavigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { APIService } from "../../../../../ApiService";
import CustomTextInputUnlocked from "../../../../../Components/Inputs/CustomTextInputUnlocked";

const AdminEditRoles = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { roleId } = route.params;
    const [role, setRole] = useState(null);
    const [nom, setNom] = useState('');
    const [descripcio, setDescripcio] = useState('');

    useEffect(() => {
        fetchRoleDetails();
    }, []);

    const fetchRoleDetails = async () => {
        try {
            const roleDetails = await APIService.fetchRoleById(roleId);
            setRole(roleDetails);
            setNom(roleDetails.Nom || '');
            setDescripcio(roleDetails.Descripcio || '');
        } catch (error) {
            console.error("Error fetching role details:", error);
        }
    };

    const handleSave = async () => {
        const updatedRole = {
            ID: roleId,
            Nom: nom,
            Descripcio: descripcio
        };

        const response = await APIService.updateRole(updatedRole);
        if(response) {
            Alert.alert("Éxito", "El rol se ha actualizado con éxito.");
            navigation.goBack();
        } else {
            Alert.alert("Error", "No se ha podido actualizar el rol")
        }
    };

    if (!role) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackNavigation />
            <View style={styles.content}>
                <Text style={styles.heading}>Edit Role</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={nom}
                        onChangeText={setNom}
                        placeholder={role.Nom}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descripción:</Text>
                    <CustomTextInputUnlocked
                        style={styles.input}
                        value={descripcio}
                        onChangeText={setDescripcio}
                        placeholder={role.Descripcio}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Guardar" onPress={handleSave} />
                </View>
            </View>
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

export default AdminEditRoles;
