import React from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "../DashboardSection/Dashboard";
import MyStudents from "../StudentsSection/MyStudents";
import Calendar from "../../Calendar/Calendar"
import Cars from "../Cars/Cars";

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title; 
            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? "home" : "home-outline";
            return <Icon name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calendar-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Students"
        component={MyStudents}
        options={{
          tabBarLabel: "Students",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused
              ? "account-group"
              : "account-group-outline";
            return <Icon name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cars"
        component={Cars}
        options={{
          tabBarLabel: "Cars",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? "car" : "car-outline";
            return <Icon name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
