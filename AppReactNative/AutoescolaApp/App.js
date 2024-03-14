  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { StyleSheet, View } from 'react-native';
  import EntrancePage from './Components/EntrancePage';
  import LoginPage from './Components/LoginPage';
  import DashboardPage from './Components/DashboardPage';
  import AppointmentRequest from './Components/AppointmentRequest';

  const Stack = createStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DashboardPage"
          screenOptions={{
            headerShown: false,
            // headerStyle: {
            //   backgroundColor: '#1F41BB',
            // },
            // headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="EntrancePage" component={EntrancePage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="DashboardPage" component={DashboardPage} />
          <Stack.Screen name="AppointmentRequest" component={AppointmentRequest} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
