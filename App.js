import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import BagScreen from './src/screens/BagScreen';
import AddDiscScreen from './src/screens/AddDiscScreen';


const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="My Bag" component={BagScreen} />
          <Tab.Screen name="Add Disc" component={AddDiscScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
