import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('NavBar');
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/SplashScreen/LogoRoadXpert.png')} style={styles.image} />
            </View>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
});

export default SplashScreen;