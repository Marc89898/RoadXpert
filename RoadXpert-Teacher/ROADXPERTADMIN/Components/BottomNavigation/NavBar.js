import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function NavBar() {
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
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            if (route.name === 'Calender') {
                                navigation.navigate('AppointmentScreen');
                            } else if (route.name === 'Route') {
                                navigation.navigate('RouteInformation');
                            } else if (route.name === 'Home') {
                                navigation.navigate('Dashboard');
                            } else if (route.name === 'Cars') { // Afegit per a la pestanya Cars
                                navigation.navigate('CarsScreen');
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
                        <Icon name="calendar" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Route"
                component={RouteScreen}
                options={{
                    tabBarLabel: 'Route',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map-marker-path" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cars" 
                component={CarsScreen}
                options={{
                    tabBarLabel: 'Cars',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="car" size={size} color={color} /> 
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

function RouteScreen() {
    return null;
}

function CarsScreen() {
    return null; // Pàgina de cotxes
}
