import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BackNavigation from "../../../Components/Navigation/BackNavigation";
import SignatureCanvas from "react-native-signature-canvas";
import MainButton from "../../../Components/Buttons/mainButton.js";
import CustomTextInput from "../../../Components/Inputs/CustomTextInput.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PostPractice = ({ route }) => {
  const { practiceData } = route.params;

  const signatureRef = useRef();
  const navigation = useNavigation();

  const handleFinishButtonPress = () => {
    navigation.navigate("NavBar");
  };

  const handleClearSignature = () => {
    signatureRef.current.clearSignature();
  };

  function calcularDiferenciaHora(horaInicio, horaFin) {
    // Agregar ":00" si las cadenas de hora no tienen segundos
    const horaInicioFormat = horaInicio.includes(':') ? horaInicio : `${horaInicio}:00`;
    const horaFinFormat = horaFin.includes(':') ? horaFin : `${horaFin}:00`;

    // Convertir las cadenas de hora a objetos Date
    const horaInicioDate = new Date(`1970-01-01T${horaInicioFormat}`);
    const horaFinDate = new Date(`1970-01-01T${horaFinFormat}`);
  
    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = horaFinDate.getTime() - horaInicioDate.getTime();
  
    // Calcular horas, minutos y segundos
    const horas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaMilisegundos % (1000 * 60)) / 1000);
  
    // Formatear la diferencia en el formato deseado
    const diferenciaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  
    return diferenciaFormateada;
}

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Resultados de la práctica</Text>
          <CustomTextInput label="Anotaciones:" placeholder={practiceData.TotalAnotacions.toString()} />
          <CustomTextInput label="Duración total:" placeholder={calcularDiferenciaHora(practiceData.HoraInici, practiceData.HoraFi)} />
          <Text style={styles.alumnoDataText}>Datos del alumno</Text>
          <CustomTextInput label="Nombre del alumno:" placeholder={practiceData.NombreAlumno} />
          <CustomTextInput label="Num. Práctica" placeholder={practiceData.NumPracticas.toString()} />
          {/* <CustomTextInput
            label="Nombre de la práctica:"
            placeholder={practiceData.NombrePractica}
          /> */}
          {/* <CustomTextInput label="Distancia recorrida:" placeholder="7km" />
          <CustomTextInput label="Máxima Velocidad:" placeholder="43km/h" /> */}

          {/* <View style={styles.signatureContainer}>
            <Text>Firma del alumno:</Text>
            <SignatureCanvas
              ref={signatureRef}
              backgroundColor="#fff"
              penColor="#000"
              style={styles.signatureCanvas}
            />
            <TouchableOpacity
              style={styles.clearButtonContainer}
              onPress={handleClearSignature}
            >
              <Icon name="trash" size={30} color="red" />
            </TouchableOpacity>
          </View> */}

          <View>
            <MainButton
              onPress={handleFinishButtonPress}
              title="Finalizar Práctica"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerText: {
    width: "75%",
    fontSize: 25,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  signatureContainer: {
    position: "relative",
    marginTop: 30,
  },
  alumnoDataText: {
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 30,
  },
  signatureCanvas: {
    height: 200,
    borderWidth: 1,
    borderColor: "#000",
  },
  clearButtonContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo transparente para que sea visible
    padding: 5,
    borderRadius: 5,
  },
});

export default PostPractice;
