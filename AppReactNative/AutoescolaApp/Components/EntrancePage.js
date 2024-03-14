import React from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EntrancePage = () => {
    const [fontLoaded] = useFonts({
        'Poppins_Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    const navigation = useNavigation();
    const handleEmpezarPress = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../assets/images/Entrance/EngineStart.mp3'));
            await soundObject.playAsync();
        } catch (error) {
            console.log('Error al reproducir el sonido:', error);
        }

        setTimeout(async () => {
            try {
                await soundObject.stopAsync();
            } catch (error) {
                console.log('Error al detener el sonido:', error);
            }
            navigation.navigate('LoginPage');
        }, 2300);
    };

    return (
        <ImageBackground source={require('../assets/images/Entrance/RoadWallpaper.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/Entrance/RoadLogo.png')} style={styles.logoImage} />
                    <Text style={styles.title}>ROAD XPERT</Text>
                </View>
                <TouchableOpacity onPress={handleEmpezarPress}>
                    <View style={styles.bottomImageContainer}>
                        <Image source={require('../assets/images/Entrance/StarEngine.png')} style={styles.bottomImage} />
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        color: 'black',
        fontFamily: 'Poppins_Bold',
        fontSize: 30,
    },
    bottomImageContainer: {
        position: 'relative',
        paddingBottom: 20,
    },
    bottomImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default EntrancePage;
