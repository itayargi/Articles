import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import BG from '../components/bg/BG';
import WebViewBox from '../components/webview/WebViewBox';

const ArticleData = ({ route, navigation }) => {

    const {url} = route.params

    const params ={
        bg:{
            style:styles.container,
        },
    }

 
    return (
        <BG {...params.bg}>
            <WebViewBox url={url} style={styles.webview} />
        </BG>
    )
}

export default ArticleData

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:"center", 
        // alignItems:"center"
    },
    text:{
        color:"black"
    },
    webview:{
        height:400
    },
})
