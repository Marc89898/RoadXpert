import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackNavigation from "../Screens/Navigation/BackNavigation";
import WorkersCard from "../Components/Cards/WorkersCard";

const AllWorkers = () => {
  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Workers</Text>
      </View>
      <View style={styles.cardContainer}>
        <WorkersCard name="Pedro Sanchez" desc="15 años"/>
        <WorkersCard name="Pablo Escobar" desc="25 años"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 25,
  },
  cardContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
});

export default AllWorkers;
