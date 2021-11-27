import React ,{useContext, useEffect} from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import imageIndex from '../assets/images/imageIndex'
import Loader from '../components/Loader/Loader'
import { wait } from '../utils/functionUtils'
import screenNames from '../utils/screenNames'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../store/AppContext'

const Splash = ({navigation}) => {
  const {updateUserState} = useContext(AppContext)
    const params ={
         background:{
             source:imageIndex.splashBackground(),
             style:styles.background
         },
    }
const navigateToHomeScreen=()=>{
    navigation.navigate(screenNames.TabsNavigation)
}

const updateUserStateAndNavigate = async(userFromStorage)=>{
  updateUserState(userFromStorage)
  navigateToHomeScreen()
}
    const getDataFromStorage = async () => {
        await AsyncStorage.getItem('USER')
          .then((res) => {
            if (res) {
              return JSON.parse(res);
            } else {
              console.log('wow no user in storage');
              wait(2000).then(() => navigateToHomeScreen())
            }
          })
          .then((resJson) => {
                wait(2000).then(() => updateUserStateAndNavigate(resJson))
          }).catch(error=>console.log('error',error));
      };
  
    useEffect(() => {
        getDataFromStorage() 
       
    }, [])
    return (
        <ImageBackground {...params.background} >
            <Loader />
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    background:{
        flex:1
    }
})
