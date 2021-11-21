import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {
    return (
        <View style={styles.contianer}>
            <Text>Home screen 2222</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    contianer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
})
