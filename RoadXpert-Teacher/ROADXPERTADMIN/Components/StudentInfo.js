import React from "react";
import { View, Text, Image } from "react-native";

const StudentInfo = ({ route }) => {
  const { name, image } = route.params;

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Image source={image} style={{ width: 200, height: 200 }} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default StudentInfo;
