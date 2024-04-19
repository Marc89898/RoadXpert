// Purpose: Main file for the Admin, contains the navigation stack for the Admin.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Principal Screens
import SplashScreen from '../ScreensAdmin/SplashScreen.js';
import LoginScreen from '../ScreensAdmin/LoginScreen.js';

// Welcome Page
import WelcomePage from '../ScreensAdmin/WelcomePage.js'

// Navigation Stack
const Stack = createNativeStackNavigator();

// Main Admin Component
export default function Admin() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
