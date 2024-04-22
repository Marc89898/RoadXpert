import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomSelectInput = ({label, value, value2}) => {
  const [selectedValue, setSelectedValue] = useState("Seleccionar opción");

  return (
    <View style={styles.greatContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          itemStyle={styles.itemStyle}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Seleccionar opción" value="Seleccionar opción" />
          <Picker.Item label="{value}" value="{value}" />
          <Picker.Item label="{value2}" value="{value2}" />
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

export default CustomSelectInput;
