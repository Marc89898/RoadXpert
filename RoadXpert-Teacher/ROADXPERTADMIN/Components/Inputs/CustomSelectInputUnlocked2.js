import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomSelectInputUnlocked2 = ({ label, options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    onSelect(itemValue); // Llamar a la función de devolución de llamada con el nuevo valor seleccionado
  };

  return (
    <View style={styles.greatContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          itemStyle={styles.itemStyle}
          onValueChange={handleValueChange} // Manejar el cambio de valor
        >
          {options &&
            Array.isArray(options) &&
            options.length > 0 &&
            options.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greatContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  picker: {
    flex: 1,
  },
  itemStyle: {
    textAlign: "right",
  },
});

export default CustomSelectInputUnlocked2;
