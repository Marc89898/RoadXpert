import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashboardPage"
        screenOptions={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#1F41BB',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="EntrancePage" component={EntrancePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
