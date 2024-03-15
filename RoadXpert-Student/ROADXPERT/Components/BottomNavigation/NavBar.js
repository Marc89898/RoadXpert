import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function NavBar() {
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
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            if (route.name === 'Calender') {
                                navigation.navigate('AppointmentScreen');
                            } else if (route.name === 'Home') {
                                navigation.navigate('Dashboard');
                            } else {
                                navigation.navigate(route.name);
                            }
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
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calender"
                component={CalenderScreen}
                options={{
                    tabBarLabel: 'Calender',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar-month" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function HomeScreen() {
    return null;
}

function CalenderScreen() {
    return null;
}




// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const Tab = createBottomTabNavigator();

// export default function NavBar() {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//             tabBar={({ navigation, state, descriptors, insets }) => (
//                 <BottomNavigation.Bar
//                     navigationState={state}
//                     safeAreaInsets={insets}
//                     onTabPress={({ route, preventDefault }) => {
//                         const event = navigation.emit({
//                             type: 'tabPress',
//                             target: route.key,
//                             canPreventDefault: true,
//                         });

//                         if (event.defaultPrevented) {
//                             preventDefault();
//                         } else {
//                             navigation.navigate(route.name);
//                         }
//                     }}
//                     renderIcon={({ route, focused, color }) => {
//                         const { options } = descriptors[route.key];
//                         if (options.tabBarIcon) {
//                             return options.tabBarIcon({ focused, color, size: 24 });
//                         }

//                         return null;
//                     }}
//                     getLabelText={({ route }) => {
//                         const { options } = descriptors[route.key];
//                         const label =
//                             options.tabBarLabel !== undefined
//                                 ? options.tabBarLabel
//                                 : options.title !== undefined
//                                     ? options.title
//                                     : route.title;

//                         return label;
//                     }}
//                 />
//             )}
//         >
//             <Tab.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     tabBarLabel: 'Home',
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon name="home" size={size} color={color} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="Settings"
//                 component={SettingsScreen}
//                 options={{
//                     tabBarLabel: 'Settings',
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon name="cog" size={size} color={color} />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="Route"
//                 component={RouteScreen}
//                 options={{
//                     tabBarLabel: 'Route',
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon name="map-marker-path" size={size} color={color} />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// }

// function HomeScreen() {
//     return null; // Puedes dejar esto como null o reemplazarlo con tu pantalla HomeScreen
// }

// function SettingsScreen() {
//     return null; // Puedes dejar esto como null o reemplazarlo con tu pantalla SettingsScreen
// }

// function RouteScreen() {
//     return null; // Puedes dejar esto como null o reemplazarlo con tu pantalla RouteScreen
// }
