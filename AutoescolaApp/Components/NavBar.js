import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const BottomNavBar = () => {
    const [fontLoaded] = useFonts({
        'Poppins_Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    const [selectedOption, setSelectedOption] = useState('home');
    const handleOptionPress = (option) => setSelectedOption(option);

    return (
        <View style={styles.container}>
            <View style={styles.navContainer}>
                {navItems.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        style={[styles.navItem, selectedOption === item.key && styles.selectedNavItem]}
                        onPress={() => handleOptionPress(item.key)}>
                        <Image source={selectedOption === item.key ? item.selectedIcon : item.icon} style={styles.icon} />
                        <Text style={[styles.navItemText, selectedOption === item.key && styles.selectedNavItemText]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const navItems = [
    { key: 'home', label: 'Casa', icon: require('../assets/images/Navigation/home.png'), selectedIcon: require('../assets/images/Navigation/home_selected.png') },
    { key: 'calendar', label: 'Calendario', icon: require('../assets/images/Navigation/calender.png'), selectedIcon: require('../assets/images/Navigation/calender_selected.png') },
    { key: 'route', label: 'Ruta', icon: require('../assets/images/Navigation/route.png'), selectedIcon: require('../assets/images/Navigation/route_selected.png') }
];

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center', 
    },
    navContainer: {
        width: '100%',
        height: 75,
        borderColor: 'blue',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },
    navItem: {
        alignItems: 'center',
        width: '33%',
    },
    selectedNavItem: {
        backgroundColor: 'blue',
        height: 110,
        width: 90,
        borderRadius: 24,
        marginBottom: 45,
        justifyContent: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
    navItemText: {
        fontFamily: 'Poppins_Regular',
        fontSize: 10,
        color: '#333',
    },
    selectedNavItemText: {
        color: 'blue',
    },
});

export default BottomNavBar;
