// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { BottomNavigation } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";

// const Tab = createBottomTabNavigator();

// export default function NavBar() {
//   const navigation = useNavigation();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={({ navigation, state, descriptors, insets }) => (
//         <BottomNavigation.Bar
//           navigationState={state}
//           safeAreaInsets={insets}
//           onTabPress={({ route, preventDefault }) => {
//             const event = navigation.emit({
//               type: "tabPress",
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (event.defaultPrevented) {
//               preventDefault();
//             } else {
//               if (route.name === "Calender") {
//                 navigation.navigate("AppointmentScreen");
//               } else if (route.name === "Students") {
//                 navigation.navigate("MyStudents");
//               } else if (route.name === "Home") {
//                 navigation.navigate("Dashboard");
//               } else if (route.name === "MyCars") {
//                 navigation.navigate("MyCars");
//               } else {
//                 navigation.navigate(route.name);
//               }
//             }
//           }}
//           renderIcon={({ route, focused, color }) => {
//             const { options } = descriptors[route.key];
//             let iconName;

//             switch (route.name) {
//               case "Home":
//                 iconName = focused ? "home" : "home-outline";
//                 break;
//               case "Calendar":
//                 iconName = focused ? "calendar" : "calendar-outline";
//                 break;
//               case "Students":
//                 iconName = focused ? "account" : "account-outline";
//                 break;
//               case "MyCars":
//                 iconName = focused ? "car" : "car-outline";
//                 break;
//               default:
//                 iconName = focused ? "home" : "home-outline";
//             }

//             return (
//               <Icon
//                 name={iconName}
//                 size={24}
//                 color={focused ? "blue" : color}
//               />
//             );
//           }}
//           getLabelText={({ route }) => {
//             const { options } = descriptors[route.key];
//             const label =
//               options.tabBarLabel !== undefined
//                 ? options.tabBarLabel
//                 : options.title !== undefined
//                 ? options.title
//                 : route.title;
//             return label;
//           }}
//         />
//       )}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: "Home",
//         }}
//       />
//       <Tab.Screen
//         name="Calendar"
//         component={CalendarScreen}
//         options={{
//           tabBarLabel: "Calendar",
//         }}
//       />
//       <Tab.Screen
//         name="Students"
//         component={StudentsScreen}
//         options={{
//           tabBarLabel: "Students",
//         }}
//       />
//       <Tab.Screen
//         name="MyCars"
//         component={CarsScreen}
//         options={{
//           tabBarLabel: "Cars",
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function HomeScreen() {
//   return null;
// }

// function CalendarScreen() {
//   return null;
// }

// function StudentsScreen() {
//   return null;
// }

// function CarsScreen() {
//   return null;
// }

import React from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "../Dashboard";
import MyStudents from "../MyStudents";
import Cars from "../Cars";

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
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: "Dashboard",
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
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cars"
        component={Cars}
        options={{
          tabBarLabel: "Cars",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="car-outline" size={size} color={color} />;
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
