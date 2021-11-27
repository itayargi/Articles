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
  const [modalVisible, setModalVisible] = useState(false);
  const {userData, updateUserLogStatus} = useContext(AppContext);

  const [isUserLogIn, setIsUserLogIn] = useState(userData.isLogged);

  const iconUrl = {uri: 'https://img.icons8.com/material/24/000000/skip.png'};

  const params = {
    headerParams: {
      onPressLeft: () => {},
    },
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
              label = screenNames.HomeScreen;
              iconSource = iconUrl;
              break;
            case screenNames.Categories:
              label = screenNames.Categories;
              iconSource = iconUrl;
              break;
            case screenNames.FavoriteList:
              label = screenNames.FavoriteList;
              iconSource = iconUrl;
              break;
            default:
              return null;
          }
          return (
            <View label={label} focused={focused}>
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? Colors.colordarkCoral : '#ACBAC3',
                }}
              />
            </View>
          );
        },
      }),
    },
  };

  const isUserSignedIn =  () => {
      setIsUserLogIn(userData.isLogged)
  };
  const checkInternetConnection = () => {
    // check internet for devices
    NetInfo.fetch().then(state => {
      var isConnectionOnDevice = state.isConnected;
      if (!isConnectionOnDevice) {
        setModalVisible(true);
        console.log(
          'You are not connected to the internet, connection is required',
        );
      } else {
        modalVisible && setModalVisible(false);
      }
    });
  };

  const onInit = async() => {
    setIsLoading(true);

    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '34248800950-v3ihfjv6j6hpsr9uoferaka12jissfhh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId:
      //   '34248800950-21ilp5atpmo3nvstlvkunphtlg37pbt6.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('isSignedIn', isSignedIn);
    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('currentUser', currentUser.user);
      updateUserLogStatus(currentUser.user);
      setIsUserLogIn(isSignedIn);
      setIsLoading(false);
    } else {
      setIsUserLogIn(isSignedIn);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isUserSignedIn();
  }, [userData.isLogged]);

  useEffect(() => {
    onInit();
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
          component={isUserLogIn ? FavoriteList : LoggingScreen}
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
    // zIndex:1
    // width: sizes.PageWidth,
    // height: sizes.PageHieght,
  },
});
export default TabsNavigation;
// import React, { useEffect, useContext, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import NetInfo from "@react-native-community/netinfo";
// import Categories from "../src/screens/Categories";
// import Loader from "../src/components/Loader/Loader";
// import FavoriteList from "../src/screens/FavoriteList";
// import HomeScreen from "../src/screens/HomeScreen";
// import screenNames from "../src/utils/screenNames";
// import Colors from "../src/utils/Colors";
// import sizes from "../src/utils/sizes";
// const Tab = createMaterialTopTabNavigator();

// const TabsNavigation = ({ navigation }) => {
//   return (
//     <Tab.Navigator
//       initialRouteName={screenNames.HomeScreen}
//       screenOptions={{
//         tabBarActiveTintColor: '#e91e63',
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarStyle: { backgroundColor: 'powderblue' },
//       }}
//     >
//       <Tab.Screen
//         name={screenNames.HomeScreen}
//         component={HomeScreen}
//         options={{ tabBarLabel: 'Home' }}
//       />
//       <Tab.Screen
//         name={screenNames.Categories}
//         component={Categories}
//         options={{ tabBarLabel: 'Categories' }}
//       />
//       <Tab.Screen
//         name={screenNames.FavoriteList}
//         component={FavoriteList}
//         options={{ tabBarLabel: 'FavoriteList' }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default TabsNavigation;
