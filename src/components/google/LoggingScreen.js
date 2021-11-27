import React ,{useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import AppContext from '../../../store/AppContext'
import Colors from '../../utils/Colors'
import strings from '../../utils/strings'
import TextComp from '../textComp/TextComp'
import GoogleSignIn from './GoogleSignIn'

const LoggingScreen = () => {
    const {updateUserLogStatus} = useContext(AppContext);

    const afterUserIsLogged=(user)=>{
        updateUserLogStatus(user)
      }

    return (
        <View>
            <TextComp style={styles.modalHeader}>
          {strings.modal_header}
        </TextComp>
        <GoogleSignIn afterUserIsLogged={afterUserIsLogged} />
        </View>
    )
}

export default LoggingScreen

const styles = StyleSheet.create({
    modalHeader:{
        color:Colors.fontColor, 
        textAlign: 'center',
        fontSize:19,
        marginTop:20,
        paddingHorizontal:15
      },
})
