import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-rapi-ui";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === "" && password === "") {
      navigation.navigate("NavBar");
      
    } else {
      console.log("Incorrect credentials. Please try again.");
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
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={(val) => setUsername(val)}
            rightContent={
              <Ionicons
                name="person"
                size={20}
                color="#ccc"
                style={styles.eyeIcon}
              />
            }
          />
          <TextInput
            placeholder="Enter your password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(val) => setPassword(val)}
            rightContent={
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#ccc"
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
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
    gap: 20,
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
  input: {
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#F1F4FF",
  },
  button: {
    backgroundColor: "#1F41BB",
    width: "90%",
    justifyContent: "center",
  },
});

export default LoginScreen;
