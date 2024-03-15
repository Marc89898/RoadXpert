import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Components/SplashScreen.js';
import LoginScreen from './Components/LoginScreen.js';
import Dashboard from './Components/Dashboard.js';
import NavBar from './Components/BottomNavigation/NavBar.js';
import AppointmentScreen from './Components/AppointmentScreen.js';
import RouteInformation from './Components/RouteInformartion.js';
import ViewRoutesMap from './Components/ViewRoutesMap.js';
import BackNavigation from './Components/BottomNavigation/BackNavigation.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="RouteInformation" component={RouteInformation} />
        <Stack.Screen name="ViewRoutesMap" component={ViewRoutesMap} />
        <Stack.Screen name="BackNavigation" component={BackNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
