import React from 'react';
import { View, Text, FlatList } from 'react-native';

const AllStudents = () => {
    // Dummy data for students
    const students = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mike Johnson' },
        // Add more students here
    ];

    // Render item for each student
    const renderItem = ({ item }) => (
        <View>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View>
            <Text>List of Students</Text>
            <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default AllStudents;