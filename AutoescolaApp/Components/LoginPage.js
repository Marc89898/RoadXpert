import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const LoginPage = () => {
    const [fontLoaded] = useFonts({
        'Poppins_Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins_SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [focusedInput, setFocusedInput] = React.useState(null);

    const handleEntrarPress = () => {
        if (username === '' && password === '') {
            navigation.navigate('DashboardPage');
        } else {
            console.log('Credenciales incorrectas');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/LoginCar.png')} style={styles.image} />
            <Text style={styles.headerText}>ROAD XPERT</Text>
            <Text style={styles.subHeaderText}>¡Bienvenido de vuelta!</Text>
            <TextInput
                style={[styles.input, focusedInput === 'username' && styles.inputFocused]}
                placeholder="Usuario"
                placeholderTextColor="#626262"
                value={username}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
                placeholder="Contraseña"
                placeholderTextColor="#626262"
                secureTextEntry={true}
                value={password}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                onChangeText={setPassword}
            />
            <Text style={styles.forgotPasswordText}>Haz olvidado la contraseña?</Text>
            <TouchableOpacity style={styles.button} onPress={handleEntrarPress}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
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
    image: {
        width: 300,
        height: 163,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 25,
        fontFamily: 'Poppins_Bold',
        color: '#1F41BB',
        marginBottom: 2,
    },
    subHeaderText: {
        fontSize: 15,
        fontFamily: 'Poppins_SemiBold',
        color: 'black',
        marginBottom: 20,
    },
    input: {
        padding: 20,
        width: 357,
        height: 64,
        backgroundColor: '#F1F4FF',
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    inputFocused: {
        borderColor: '#1F41BB',
        borderWidth: 2,
    },
    forgotPasswordText: {
        fontFamily: 'Poppins_SemiBold',
        fontSize: 14,
        marginLeft: 110,
        color: '#1F41BB',
        marginBottom: 30,
    },
    button: {
        width: 357,
        height: 64,
        backgroundColor: '#1F41BB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Poppins_SemiBold',
        color: '#FFF',
    },
});

export default LoginPage;
