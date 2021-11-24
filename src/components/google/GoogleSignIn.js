  import React,{useEffect, useState} from 'react'
  import { Button, StyleSheet, Text, View } from 'react-native'
  import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


  const GoogleSignIn = () => {
      const [isSigninInProgress,setIsSigninInProgress] =useState(false)
const [ userInfo,setUserInfo] = useState()
  const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUserInfo({ userInfo });
          console.log('userInfo',userInfo);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('error',error);
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('error',error);

            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('error',error);

            // play services not available or outdated
          } else {
            console.log('error',error);

            // some other error happened
          }
        }
      };

    const onInit=()=>{
        GoogleSignin.configure();
    }

   const revokeAccess = async () => {
        try {
          await GoogleSignin.revokeAccess();
          // Google Account disconnected from your app.
          // Perform clean-up actions, such as deleting data associated with the disconnected account.
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(()=>{
        onInit()
    },[])
      return (
          <View>
<GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isSigninInProgress}
      />
              <Button title="diconnect" onPress={revokeAccess} />
          </View>
        
      )
  }
  
  export default GoogleSignIn
  
  const styles = StyleSheet.create({})
  