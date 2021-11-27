import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AppProvider} from '../../../store/AppProvider';
import auth from '@react-native-firebase/auth';

const GoogleSignIn = props => {
  const {afterUserIsLogged} = props;
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        const {accessToken,idToken} = userInfo
        const credential = auth.GoogleAuthProvider.credential(
          idToken,
          accessToken,
        );
        await auth().signInWithCredential(credential);
          // console.log('user credential:', credential);
          afterUserIsLogged(userInfo?.user);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error', error);

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error', error);

        // play services not available or outdated
      } else {
        console.log('error', error);
        Alert.alert(error.message.toString());
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.google}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isSigninInProgress}
      />
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  google: {
    width: 192,
    height: 58,
    marginVertical: 20,
  },
});
