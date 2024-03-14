import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('home');

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        const selectedNavItem = navItems.find(item => item.key === option);
        if (selectedNavItem) {
            navigation.navigate(selectedNavItem.destination);
        }
    };

    const navItems = [
        { key: 'home', label: 'Casa', icon: require('../assets/images/Navigation/home.png'), destination: 'DashboardPage' },
        { key: 'calendar', label: 'Calendario', icon: require('../assets/images/Navigation/calender.png'), destination: 'AppointmentRequest' },
        { key: 'route', label: 'Ruta', icon: require('../assets/images/Navigation/route.png'), destination: 'DashboardPage' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navContainer}>
                {navItems.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        style={[styles.navItem, selectedOption === item.key && styles.selectedNavItem]}
                        onPress={() => handleOptionPress(item.key)}>
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={[styles.navItemText, selectedOption === item.key && styles.selectedNavItemText]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    navItem: {
        alignItems: 'center',
    },
    selectedNavItem: {
        borderBottomWidth: 3,
        borderColor: 'red',
    },
    icon: {
        width: 30,
        height: 30,
    },
    navItemText: {
        fontSize: 12,
    },
    selectedNavItemText: {
        color: 'red',
    },
});

export default BottomNavBar;
