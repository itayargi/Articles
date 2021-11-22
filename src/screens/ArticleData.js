import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BG from '../components/bg/BG';

const ArticleData = ({ route, navigation }) => {

    const params ={
        bg:{
            style:styles.container,
        },
    }

 
    return (
        <BG {...params.bg}>
            <Text></Text>
        </BG>
    )
}

export default ArticleData

const styles = StyleSheet.create({
    container:{
        flex:1
    },
})
