import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NetInfo from '@react-native-community/netinfo';
import Categories from '../src/screens/Categories';
import Loader from '../src/components/Loader/Loader';
import FavoriteList from '../src/screens/FavoriteList';
import HomeScreen from '../src/screens/HomeScreen';
import screenNames from '../src/utils/screenNames';
import Colors from '../src/utils/Colors';
import sizes from '../src/utils/sizes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticlesList from '../src/screens/ArticlesList';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AppContext from '../store/AppContext';
import LoggingScreen from '../src/components/google/LoggingScreen';
import strings from '../src/utils/strings';
import TextComp from '../src/components/textComp/TextComp';
import imageIndex from '../src/assets/images/imageIndex';

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

function CategoryStack() {
  const screenParams = {
    nav: {
      initialRouteName: screenNames.Categories,
    },
    Categories: {
      name: screenNames.Categories,
      component: Categories,
      options: {headerShown: false},
    },
    ArticlesList: {
      name: screenNames.ArticlesList,
      component: ArticlesList,
      options: {headerShown: false},
    },
  };
  return (
    <Stack.Navigator {...screenParams.nav}>
      <Stack.Screen {...screenParams.Categories} />
      <Stack.Screen {...screenParams.ArticlesList} />
    </Stack.Navigator>
  );
}

const TabsNavigation = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {userData, updateUserLogStatus, isLogged} = useContext(AppContext);
  let isMounted = true

  const params = {
    tabContainer: {
      tabBarPosition: 'top',
      initialRouteName: screenNames.HomeScreen,
      screenOptions: ({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let label, iconName;
          let iconSource;
          let iconColor;
          switch (route.name) {
            case screenNames.HomeScreen:
              label = strings.tab_homeScreen;
              iconSource = imageIndex.homeIcon();
              break;
            case screenNames.CategoryStack:
              label = strings.tab_categories;
              iconSource = imageIndex.categoriesIcon();
              break;
            case screenNames.FavoriteList:
              label = strings.tab_favoriteScreen;
              iconSource = imageIndex.favoriteIcon();
              break;
            default:
              return null;
          }
          return (
            <View label={label} focused={focused} style={{}}>
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? Colors.colorBlueLight : '#ACBAC3',
                }}
              />
            </View>
          );
        },
        tabBarLabel: ({focused}) => {
          let label;
          switch (route.name) {
            case screenNames.HomeScreen:
              label = strings.tab_homeScreen;
              break
            case screenNames.CategoryStack:
              label = strings.tab_categories;
              break
            case screenNames.FavoriteList:
              label = strings.tab_favoriteScreen;
              break
            default:
              return null;
          }
          return (
            <TextComp
              style={{color: focused ? Colors.colorBlueLight : '#ACBAC3'}}>
              {label}
            </TextComp>
          );
        },
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: Colors.white, height: 70},
      }),
    },
  };

  const checkInternetConnection = () => {
    // check internet for devices
    NetInfo.fetch().then(state => {
      var isConnectionOnDevice = state.isConnected;
      if (!isConnectionOnDevice) {
        Alert.alert('You are not connected to the internet, connection is required!')
      } 
    });
  };

  const onInit = async () => {
    isMounted && setIsLoading(true);
    GoogleSignin.configure({
      webClientId:
        '34248800950-v3ihfjv6j6hpsr9uoferaka12jissfhh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn && isMounted) {
      const currentUser = await GoogleSignin.getCurrentUser();
      updateUserLogStatus(currentUser.user);
       setIsLoading(false);
    } else {
      isMounted && setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted){
      onInit();
      checkInternetConnection()
    }
    return () => { isMounted = false }
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator {...params.tabContainer}>
        <Tab.Screen
          name={screenNames.CategoryStack}
          component={isLoading ? Loader : CategoryStack}
        />
        <Tab.Screen
          name={screenNames.FavoriteList}
          component={isLogged ? FavoriteList : LoggingScreen}
        />
        <Tab.Screen
          name={screenNames.HomeScreen}
          component={isLoading ? Loader : HomeScreen}
        />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TabsNavigation;
