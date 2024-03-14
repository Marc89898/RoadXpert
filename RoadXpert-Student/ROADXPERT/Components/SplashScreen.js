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
            <Image source={require('../assets/images/SplashScreen/RoadLogo.png')} style={styles.image} />
            <Text style={styles.text}>¡RoadXpert!</Text>
            <Button style={styles.Button} mode="contained" onPress={handleStartPress}>Empezar</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    Button:{
        marginTop: 20,
        width: 200,
        height: 50,
    }
});

export default SplashScreen;