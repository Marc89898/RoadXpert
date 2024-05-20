import React from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "../Dashboard";
import Categories from "../Categories";
import ViewRoutesMap from "../ViewRoutesMap";
import Calendar from "../Calendar/Calendar";

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
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home-outline" size={size} color={color} />;
          },
        }}
      />
      {
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
      }
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: "Categorías",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon name="format-list-bulleted" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={ViewRoutesMap}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="map-marker-path" size={size} color={color} />;
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
