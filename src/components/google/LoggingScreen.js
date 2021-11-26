import React ,{useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import AppContext from '../../../store/AppContext'
import strings from '../../utils/strings'
import GoogleSignIn from './GoogleSignIn'

const LoggingScreen = () => {
    const {updateUserLogStatus} = useContext(AppContext);

    const afterUserIsLogged=(user)=>{
        updateUserLogStatus(user)
      }

    return (
        <View>
            <Text style={styles.modalHeader}>
          {strings.modal_header}
        </Text>
        <GoogleSignIn afterUserIsLogged={afterUserIsLogged} />
        </View>
    )
}

export default LoggingScreen

const styles = StyleSheet.create({
    modalHeader:{
        color: 'black', 
        textAlign: 'center',
        fontSize:19,
        marginTop:20
      },
})
