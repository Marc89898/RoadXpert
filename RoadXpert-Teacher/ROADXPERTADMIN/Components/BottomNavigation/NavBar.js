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
                            } else if (route.name === 'Students') {
                                navigation.navigate('MyStudents');
                            } else if (route.name === 'Home') {
                                navigation.navigate('Dashboard');
                            } else if (route.name === 'Cars') { 
                                navigation.navigate('Cars');
                            } else {
                                navigation.navigate(route.name);
                            }
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'home';
                                break;
                            case 'Calendar':
                                iconName = 'calendar';
                                break;
                            case 'Students':
                                iconName = 'account';
                                break;
                            case 'Cars':
                                iconName = 'car';
                                break;
                            default:
                                iconName = 'home';
                        }

                        return (
                            <Icon
                                name={iconName}
                                size={24}
                                color={focused ? 'blue' : color}
                            />
                        );
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
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'Calendar',
                }}
            />
            <Tab.Screen
                name="Students"
                component={StudentsScreen}
                options={{
                    tabBarLabel: 'Students',
                }}
            />
            <Tab.Screen
                name="Cars" 
                component={CarsScreen}
                options={{
                    tabBarLabel: 'Cars',
                }}
            />
        </Tab.Navigator>
    );
}

function HomeScreen() {
    return null;
}

function CalendarScreen() {
    return null;
}

function StudentsScreen() {
    return null;
}

function CarsScreen() {
    return null;
}
