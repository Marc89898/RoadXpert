import React from "react";
import { View, StyleSheet } from "react-native";
import MapScreen from "./MapScreen";
import PracticeScreen from "./PracticeScreen";

const App = () => {
    // Ejemplo de práctica
    const practicaData = {
        AlumneID: 'Alumne_1',
        Ruta: '662bd8397e7bcfd40f6e35d8',
        Km: 0,
        HoraInici: '10:00:00',
        HoraFi: '11:00:00',
        ProfessorID: 'Treballador_1',
        VehicleID: '1234ABC',
        EstatHoraID: 'EstatHora_1',
        Data: '2024-04-23',
    };

    return (
        <View style={styles.container}>
            {/* <MapScreen practiceData={practicaData} /> */}
            <PracticeScreen practiceData={practicaData}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default App;
