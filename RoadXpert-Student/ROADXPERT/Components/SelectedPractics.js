import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SelectedPractics = () => {
    const route = useRoute();
    const { title } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{title}</Text>
        </View>
    );
};

export default SelectedPractics;
