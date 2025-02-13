import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../pages/questions/Main'

const Stack = createStackNavigator();

const QuestionsRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false, gestureEnabled: false, animationEnabled: false}} />
    </Stack.Navigator>
  );
};

export default QuestionsRoutes;
