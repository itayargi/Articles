// import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import screenNames from '../src/utils/screenNames';
import HomeScreen from '../src/screens/HomeScreen';
import Categories from '../src/screens/Categories';
import ArticleData from '../src/screens/ArticleData';
import ArticlesList from '../src/screens/ArticlesList';

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
    Categories: {
      name: screenNames.Categories,
      component: Categories,
      // options: { headerShown: false },
    },
    ArticleData: {
      name: screenNames.ArticleData,
      component: ArticleData,
      options: { headerShown: true, title:"Article data" },
    },
    ArticlesList: {
      name: screenNames.ArticlesList,
      component: ArticlesList,
      options: { headerShown: true, title:"Article list" },
    },
  };

const Navigator = (props) => {
    return (
      <NavigationContainer>
        <Stack.Navigator {...screenParams.navigator}>
          <Stack.Screen {...screenParams.HomeScreen} />
          <Stack.Screen {...screenParams.Categories} />
          <Stack.Screen {...screenParams.ArticlesList} />
          <Stack.Screen {...screenParams.ArticleData} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default Navigator;