import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import TextComp from '../textComp/TextComp'

const TopHeader = (props) => {
    const {title, navigation}= props
    return (
        <View style={styles.container}>
            <TextComp style={styles.text}>{title}</TextComp>
            <Button  title="favorite"/>
        </View>
    )
}

export default TopHeader

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"space-around",
        flex:1,
        flexDirection:"row"
    },
    text:{
        textAlign:"center"
    },
})
