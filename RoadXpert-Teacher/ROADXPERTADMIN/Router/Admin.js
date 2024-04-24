import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from '../ScreensAdmin/SplashScreen.js';
import LoginScreen from '../ScreensAdmin/LoginScreen.js';


import WelcomePage from '../ScreensAdmin/WelcomePage.js'

// Create Screens of school register
import CreateSchool from '../ScreensAdmin/CreateSchool.js';
import CreateRoles from '../ScreensAdmin/CreateRoles.js';
import RegisterVehicle from '../ScreensAdmin/RegisterVehicle.js';
import RegisterPerson from '../ScreensAdmin/RegisterPerson.js';

const Stack = createNativeStackNavigator();


export default function Admin() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateSchool"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="CreateSchool" component={CreateSchool} />
        <Stack.Screen name="CreateRoles" component={CreateRoles} />
        <Stack.Screen name="RegisterVehicle" component={RegisterVehicle} />
        <Stack.Screen name="RegisterPerson" component={RegisterPerson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
