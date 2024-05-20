import React, { useRef } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

const BackNavigation = () => {
    const navigation = useNavigation();
    const spinValue = useRef(new Animated.Value(0)).current;

    const startSpin = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
            navigation.goBack(); // Navigate back after animation completes
            spinValue.setValue(0); // Reset spin value after animation completes
        });
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Appbar.BackAction onPress={() => {
                    startSpin();
                }} />
            </Animated.View>
        </Appbar.Header>
    );
};

export default BackNavigation;
