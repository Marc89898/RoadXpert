import React from 'react';
import { Appbar } from 'react-native-paper';

const BackNavigation = () => (
    <Appbar.Header style={{backgroundColor:'transparent'}}>
      <Appbar.BackAction onPress={() => {}} />
    </Appbar.Header>
    
);

export default BackNavigation;
