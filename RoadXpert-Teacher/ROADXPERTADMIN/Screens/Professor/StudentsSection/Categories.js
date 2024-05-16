import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import BackNavigation from '../../../Components/Navigation/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import ApiHelper from '../../../data/ApiHelper';

const Categories = ({ route }) => {
    const { student } = route.params;
    const navigation = useNavigation();
    const [annotations, setAnnotations] = useState([]);
    const [groupedAnnotations, setGroupedAnnotations] = useState([]);

    useEffect(() => {
        // Función para obtener las anotaciones del alumno
        const fetchAnnotations = async () => {
            try {
                const annotationsData = await ApiHelper.fetchAnotacionesPorAlumno(student.ID);
                const groupedData = groupAnnotationsByCategory(annotationsData);
                setGroupedAnnotations(groupedData);
                setAnnotations(annotationsData);
            } catch (error) {
                console.error('Error fetching annotations:', error);
                // Manejar el error de manera apropiada (por ejemplo, mostrar un mensaje al usuario)
            }
        };
        fetchAnnotations();
    }, [student]);

    // Función para obtener la categoría general según el número de error
    const getCategoryGeneral = (categoryNumeric) => {
        if (categoryNumeric >= 1 && categoryNumeric < 2) {
            return "Comprobaciones previas";
        } else if (categoryNumeric >= 2 && categoryNumeric < 3) {
            return "Instalación en el vehículo";
        } else if (categoryNumeric >= 3 && categoryNumeric < 4) {
            return "Incorporación a la circulación";
        } else if (categoryNumeric >= 4 && categoryNumeric < 5) {
            return "Progresión normal";
        } else if (categoryNumeric >= 5 && categoryNumeric < 6) {
            return "Desplazamiento lateral";
        } else if (categoryNumeric >= 6 && categoryNumeric < 7) {
            return "Adelantamiento";
        } else if (categoryNumeric >= 7 && categoryNumeric < 8) {
            return "Intersecciones";
        } else if (categoryNumeric >= 8 && categoryNumeric < 9) {
            return "Cambio de sentido";
        } else if (categoryNumeric >= 9 && categoryNumeric < 10) {
            return "Paradas y estacionamientos";
        } else if (categoryNumeric >= 11 && categoryNumeric < 12) {
            return "Obediencia a las señales";
        } else if (categoryNumeric >= 12 && categoryNumeric < 13) {
            return "Utilización de las luces";
        } else if (categoryNumeric >= 13 && categoryNumeric < 14) {
            return "Manejo de mandos";
        } else if (categoryNumeric >= 14 && categoryNumeric < 15) {
            return "Otros mandos y accesorios";
        } else if (categoryNumeric >= 15 && categoryNumeric < 16) {
            return "Durante el desarrollo de la prueba";
        } else {
            return "Categoría no definida";
        }
    };

    // Agrupar las anotaciones por categoría general
    const groupAnnotationsByCategory = (annotations) => {
        const groupedCategories = {};
        const displayedAnnotations = new Set();

        // Iterar sobre cada anotación
        annotations.forEach((annotation) => {
            if (!displayedAnnotations.has(annotation.ID)) {
                const { CategoriaNumerica, CategoriaEscrita } = annotation;

                // Obtener la categoría general y subcategoría
                const categoryGeneral = Math.floor(CategoriaNumerica);
                const subCategory = CategoriaNumerica % 1 !== 0 ? CategoriaNumerica.toFixed(1) : null;

                // Verificar si la categoría general ya existe en el objeto groupedCategories
                if (!(categoryGeneral in groupedCategories)) {
                    // Si no existe, crear un nuevo objeto para esa categoría general
                    groupedCategories[categoryGeneral] = {
                        titul: getCategoryGeneral(categoryGeneral), // Obtener el título de la categoría general
                        Numero: categoryGeneral, // Número de la categoría general
                        subCategoria: [], // Array para almacenar las subcategorías
                    };
                }

                // Verificar si la subcategoría existe y agregar la anotación correspondiente
                if (subCategory) {
                    // Buscar si ya existe la subcategoría en la categoría general
                    const existingSubCategoryIndex = groupedCategories[categoryGeneral].subCategoria.findIndex(
                        (subCat) => subCat.CategoriaNumerica === subCategory
                    );

                    if (existingSubCategoryIndex !== -1) {
                        // Si la subcategoría ya existe, agregar la anotación a esa subcategoría
                        groupedCategories[categoryGeneral].subCategoria[existingSubCategoryIndex].Anotacions.push(annotation);
                    } else {
                        // Si la subcategoría no existe, crear una nueva subcategoría
                        groupedCategories[categoryGeneral].subCategoria.push({
                            CategoriaEscrita,
                            CategoriaNumerica: subCategory,
                            Anotacions: [annotation],
                        });
                    }
                } else {
                    // Si no hay subcategoría, agregar la anotación a la categoría general directamente
                    groupedCategories[categoryGeneral].subCategoria.push({
                        CategoriaEscrita,
                        CategoriaNumerica,
                        Anotacions: [annotation],
                    });
                }

                // Marcar la anotación como mostrada
                displayedAnnotations.add(annotation.ID);
            }
        });

        // Convertir el objeto en un array de objetos para facilitar el mapeo
        return Object.values(groupedCategories);
    };

    // Función para manejar la selección de una categoría
    const handleSelected = (category, annotations) => {
        navigation.navigate('SelectedCategory', { category, annotations });
    };

    // Renderizar una tarjeta de categoría
    const renderCard = (category, annotations, imageSource) => {
        return (
            <TouchableOpacity onPress={() => handleSelected(category, annotations)}>
                <Card style={styles.card}>
                    <Card.Content style={{ padding: 0 }}>
                        <Image
                            source={imageSource}
                            style={styles.image}
                        />
                        <Text style={styles.text}>
                            <Text>{annotations[0].CategoriaEscrita}</Text>
                        </Text>
                        <Text style={styles.subText}>Número de errores: <Text style={styles.boldRed}>{annotations.length}</Text></Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };
    

    return (
        <ScrollView contentContainerStyle={{ padding: 0 }}>
            <BackNavigation />
            <View style={{ flex: 1, padding: 0 }}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Categorías</Text>
                    {groupedAnnotations.length > 0 ? (
                        groupedAnnotations.map((category, index) => (
                            <View key={index} style={styles.cardsContainer}>
                                <Text style={styles.categoryTitle}>{category.titul}</Text>
                                <View style={styles.line}></View>
                                <View style={styles.row}>
                                    {category.subCategoria.map((subCat, subIndex) => (
                                        <View key={subIndex}>
                                            {renderCard(category.titul, subCat.Anotacions, require('../../../assets/images/Categories/StopSign.png'))}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>No hay anotaciones disponibles</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        marginBottom: 50,
    },
    headerText: {
        paddingLeft: 0,
        fontSize: 25,
    },
    categoryTitle: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 5,
        fontWeight: '300',
    },
    line: {
        borderBottomColor: 'black',
        opacity: 0.3,
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
    cardsContainer: {
        top: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-around',
        alignContent: 'center',
        marginBottom: 25,
    },
    card: {
        backgroundColor: '#D9D9D9',
        width: '100',
        height: '100',
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 10,
    },
    image: {
        resizeMode: 'contain',
        width: '50',
        height: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -25,
    },
    text: {
        fontWeight: '500',
        top: 5,
        fontSize: 15,
        textAlign: 'center',
    },
    boldRed: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 15,
    },
    subText: {
        fontSize: 10,
        marginTop: 10,
        textAlign: 'center',
    }
});

export default Categories;