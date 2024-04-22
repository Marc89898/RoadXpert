import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const WelcomePage = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CreateSchool");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <View style={styles.circle}>
          <Icon name="plus" size={50} color="#1F41BB" />
        </View>
      </View>
      <Text style={[styles.text, { color: "#1F41BB" }]}>
        Crea tu autoescuela
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "#1F41BB",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "60%",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WelcomePage;
