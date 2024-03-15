import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import BackNavigation from './BottomNavigation/BackNavigation';

const SelectedCategory = () => {
    const route = useRoute();
    const { categoryText, subText } = route.params || {};

    return (
        <View style={{ flex: 1 }}>
            <BackNavigation />
            <View style={styles.container}>
                <Text style={styles.headerText}>{categoryText}</Text>
            </View>
            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <View>
                        <Title style={styles.title}>{categoryText}</Title>
                        <Paragraph style={styles.paragraph}>{subText}</Paragraph>
                    </View>
                    {/* <Card.Cover source={require('../assets/images/imagen.jpg')} style={styles.image} /> */}
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        paddingLeft: 24,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 25,
    },
    card: {
        alignSelf: 'center',
        width: 345,
        height: 146,
        borderRadius: 10,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: 10,
        color: 'gray',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
});

export default SelectedCategory;
