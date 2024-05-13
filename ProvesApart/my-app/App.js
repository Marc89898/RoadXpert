import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfessorCalendar from './calendar';

export default function App() {
    const renderProfessorCalendar = () => {
        return <ProfessorCalendar />;
    };

    return (
        <NavigationContainer>
            {renderProfessorCalendar()}
        </NavigationContainer>
    );
}

AppRegistry.registerComponent('main', () => App);
