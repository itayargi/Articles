// import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import screenNames from '../src/utils/screenNames';
import HomeScreen from '../src/screens/HomeScreen';

const Stack = createNativeStackNavigator ();

const screenParams = {
    navigator: {
      initialRouteName: screenNames.HomeScreen,
      screenOptions: {},
    },
    
    HomeScreen: {
      name: screenNames.HomeScreen,
      component: HomeScreen,
      options: { headerShown: false },
    },
  };

const Navigator = (props) => {
    return (
      <NavigationContainer>
        <Stack.Navigator {...screenParams.navigator}>
          <Stack.Screen {...screenParams.HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default Navigator;