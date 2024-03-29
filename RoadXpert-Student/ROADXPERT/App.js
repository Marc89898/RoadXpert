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
import Categories from './Components/Categories.js';
import SelectedCategory from './Components/SelectedCategory.js';
import PracticsScreen from './Components/PracticsScreen.js';
import SelectedPractics from './Components/SelectedPractics.js';
import notificationsScreen from './Components/notificationsScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
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
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="RouteInformation" component={RouteInformation} />
        <Stack.Screen name="ViewRoutesMap" component={ViewRoutesMap} />
        <Stack.Screen name="BackNavigation" component={BackNavigation} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="SelectedCategory" component={SelectedCategory} />
        <Stack.Screen name="PracticsScreen" component={PracticsScreen} />
        <Stack.Screen name="SelectedPractics" component={SelectedPractics} />
        <Stack.Screen name="notificationsScreen" component={notificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
