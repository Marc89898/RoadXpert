import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from '../ScreensAdmin/SplashScreen.js';
import LoginScreen from '../ScreensAdmin/LoginScreen.js';


import WelcomePage from '../ScreensAdmin/WelcomePage.js'


const Stack = createNativeStackNavigator();


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
