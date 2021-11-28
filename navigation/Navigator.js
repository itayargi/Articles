import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '../src/utils/screenNames';
import ArticleData from '../src/screens/ArticleData';
import FavoriteList from '../src/screens/FavoriteList';
import TabsNavigation from './TabNavigation';
import Splash from '../src/screens/Splash';

const Stack = createNativeStackNavigator();

const screenParams = {
  navigator: {
    initialRouteName: screenNames.Splash,
  },

  HomeScreen: {
    name: screenNames.TabsNavigation,
    component: TabsNavigation,
    options: {headerShown: false},
  },
  ArticleData: {
    name: screenNames.ArticleData,
    component: ArticleData,
    options: {headerShown: false},
  },
  
  Splash: {
    name: screenNames.Splash,
    component: Splash,
    options: {headerShown: false},
  },
};

const Navigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator {...screenParams.navigator}>
        <Stack.Screen {...screenParams.HomeScreen} />
        <Stack.Screen {...screenParams.ArticleData} /> 
        <Stack.Screen {...screenParams.Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
