import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import {RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{title: 'JSON Feed'}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{title: 'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
