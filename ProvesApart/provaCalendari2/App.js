import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfessorCalendar from './calendar';

function App() {
    return (
        <NavigationContainer>
            <ProfessorCalendar />
        </NavigationContainer>
    );
}

AppRegistry.registerComponent('main', () => App);
