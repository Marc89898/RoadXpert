import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BackNavigation = () => {
    const navigation = useNavigation();

    return (
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
    );
};

export default BackNavigation;
