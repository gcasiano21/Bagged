import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 


import HomeScreen from './src/screens/HomeScreen';
import BagScreen from './src/screens/BagScreen';
import AddDiscScreen from './src/screens/AddDiscScreen';
import ThrowTrackerScreen from './src/screens/ThrowTrackerScreen';
import { DiscProvider } from './src/context/DiscContext';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DiscProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="My Bag" component={BagScreen} />
            <Tab.Screen name="Add Disc" component={AddDiscScreen} />
            <Tab.Screen name="Throw Tracker" component={ThrowTrackerScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </DiscProvider>
    </GestureHandlerRootView>
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
