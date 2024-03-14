import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import BottomNavBar from './NavBar.js';
import { useFonts } from 'expo-font';

const DashboardPage = () => {
    const [fontLoaded] = useFonts({
        'Poppins_SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins_Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins_Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins_Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    return(
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/Dashboard/FotoProba.jpg')} 
                style={styles.backgroundImage}>
                {/* Overlay negro con opacidad */}
                <View style={styles.overlay} />
                {/* Título y subtítulo */}
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>Welcome Back,</Text>
                    <Text style={styles.title}>Josep Maria Boix</Text>
                </View>
                {/* Círculos en la parte superior derecha */}
                <View style={styles.circleContainer}>
                    <View style={styles.circle}>
                        <Image
                            source={require('../assets/images/Dashboard/bell.png')}
                            style={styles.circleImage}
                        />
                    </View>
                    <View style={styles.circle}>
                        <Image
                            source={require('../assets/images/Dashboard/settings.png')}
                            style={styles.circleImage}
                        />
                    </View>
                </View>
            </ImageBackground>
            <BottomNavBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        height: 232,
        borderBottomRightRadius: 100,
        overflow: 'hidden',
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    textContainer: {
        position: 'absolute',
        bottom: 8,
        left: 15,
        padding: 10,
    },
    subtitle: {
        fontSize: 8,
        color: 'white',
        fontFamily: 'Poppins_Light'
    },
    title: {
        fontSize: 15,
        fontFamily: 'Poppins_Bold',
        color: 'white',
    },
    circleContainer: {
        position: 'absolute',
        top: 50,
        right: 10,
        flexDirection: 'row',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
});

export default DashboardPage;
