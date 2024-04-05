import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
export default function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ state, descriptors, navigation, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    renderIcon={({ route }) => {
                        const { options } = descriptors[route.key];
                        const iconName = options.tabBarIconName || route.name;
                        return <Icon name={iconName} size={24} />;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        return label;
                    }}
                    onTabPress = {({ route }) => {
                        switch (route.name) {
                            case "Home":
                                navigation.navigate('Dashboard')
                            break;
                            case "Calendar":
                                navigation.navigate('AppointmentScreen')
                            break;
                            case "Route":
                                navigation.navigate('RouteInformation')
                            break;
                        }
                        
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIconName: 'home',
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalenderScreen}
                options={{
                    tabBarIconName: 'calendar',
                }}
            />
            <Tab.Screen
                name="Route"
                component={RouteScreen}
                options={{
                    tabBarIconName: 'map-marker-path',
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
