import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const handleStartPress = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/SplashScreen/RoadLogo.png')} style={styles.image} />
            </View>
            <View style={styles.overlay}>
                <Button style={styles.button} mode="contained" onPress={handleStartPress}>Empezar</Button>
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    button: {
        marginTop: 250,
        width: 200,
        height: 50,
    }

});

export default SplashScreen;