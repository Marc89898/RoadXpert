import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Components/SplashScreen.js';
import LoginScreen from './Components/LoginScreen.js';
import Dashboard from './Components/Dashboard.js';
import NavBar from './Components/BottomNavigation/NavBar.js';
import BackNavigation from './Components/BottomNavigation/BackNavigation.js';
import MyCars from './Components/Cars.js';
import NotificationsScreen from './Components/NotificationsScreen.js';
import MyStudents from './Components/MyStudents.js';
import StudentInfo from './Components/StudentInfo.js';
import StudentProfile from './Components/StudentProfile.js';
import CarInfo from './Components/CarInfo.js';
import MapScreen from './Components/MapScreen.js';
import prePractice from './Components/pre-practice.js';

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
        <Stack.Screen name="BackNavigation" component={BackNavigation} />
        <Stack.Screen name="MyCars" component={MyCars} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="MyStudents" component={MyStudents} />
        <Stack.Screen name="StudentInfo" component={StudentInfo} />
        <Stack.Screen name="StudentProfile" component={StudentProfile} />
        <Stack.Screen name="CarInfo" component={CarInfo} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="prePractice" component={prePractice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
