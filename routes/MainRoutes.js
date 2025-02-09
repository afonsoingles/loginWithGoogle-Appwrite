import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/main/Home';
import PracticeScreen from '../pages/main/Practice'

const Stack = createStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false, animationEnabled: false}} />
      <Stack.Screen name="Practice" component={PracticeScreen} options={{ headerShown: false, gestureEnabled: false, animationEnabled: false}} />
    </Stack.Navigator>
  );
};

export default MainRoutes;
