import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';
const WebViewBox = (props) => {
const navigation = useNavigation()
    const demoUrl = "https://seekingalpha.com/news/3723980-blackrock-muniyield-new-jersey-fund-declares-missing-dividend?utm_source=feed_news_all&utm_medium=referral"
    const {url, style} =props
    const handleBack=()=>{
        navigation.goBack()
    }
    const handleFavorite=()=>{

    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Button title={"back"} onPress={handleBack} />
                <Button title={"Add to favorite"} onPress={handleFavorite} />
            </View>
            <WebView style={style} source={{ uri: url }} />
        </View>
    )
}

export default WebViewBox

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    row:{
        height:100, 
        justifyContent:"space-between", 
        paddingHorizontal:20,
        alignItems:"center",
        flexDirection:"row"
    },
})
