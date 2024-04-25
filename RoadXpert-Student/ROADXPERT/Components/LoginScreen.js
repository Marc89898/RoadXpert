import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { APIService } from "./ApiService";
import { isValidDNI, isValidPassword, sha256 } from "../utils/utils.js";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!isValidDNI(username)) {
        console.error("El usuario no tiene el formato correcto");
        return;
      }
      var passwordHashed = await sha256(password);
      setPassword(passwordHashed);
      if (!isValidPassword(passwordHashed)) {
        console.error("La contraseña no es válida");
        return;
      }
      const alumns = await APIService.fetchAllAlumns();
      const foundAlumn = alumns.find(
        (alumn) =>
          alumn.DNI === username && alumn.Contrasenya === passwordHashed
      );
      if (foundAlumn) {
        console.log("Inicio de sesión exitoso");
        navigation.navigate("NavBar");
      } else {
        console.error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/SplashScreen/LogoRoadXpert.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>Hello.</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
            <Ionicons
              name="person"
              size={18}
              style={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={(val) => setPassword(val)}
            />
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        </View>
        <Button style={styles.button} mode="contained" onPress={handleLogin}>
          Iniciar Sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    marginTop: 30,
    alignSelf: "flex-end",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    marginTop: 150,
    alignItems: "center",
    alignSelf: "stretch",
  },
  textContainer: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  inputsContainer: {
    gap: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 15,
    color: "grey",
    right: 15,
  },
  input: {
    width: "100%",
    height: 48,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
  },
  button: {
    backgroundColor: "#1F41BB",
    width: "90%",
    justifyContent: "center",
  },
});

export default LoginScreen;
