import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); 
    const handleLogin = () => {
        if (username === 'Sa' && password === '1234') {
            navigation.navigate('Dashboard');
        } else {
            console.log('Incorrect credentials. Please try again.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/LoginPage/LoginPageImg.jpg')}
                style={styles.image}
            />
            <TextInput
                mode="outlined"
                label="User"
                value={username}
                placeholder='Type here'
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label="Password"
                value={password}
                placeholder='Type here'
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={handleLogin}>
                Iniciar Sesión
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'contain',
    },
    input: {
        width: '100%',
        marginBottom: 12,
        backgroundColor: '#F1F4FF'
    },
    button: {
        width: '100%',
        marginTop: 16,
        minHeight: 50,
        justifyContent: 'center',
    },
});

export default LoginScreen;