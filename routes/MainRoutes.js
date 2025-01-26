import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/main/Home';

const Stack = createStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false}} />
    </Stack.Navigator>
  );
};

export default MainRoutes;
