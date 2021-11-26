import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import AppContext from '../../store/AppContext';
import BG from '../components/bg/BG';
import WebViewBox from '../components/webview/WebViewBox';

const ArticleData = ({ route, navigation }) => {
 const {addActicleToFavorites, isArticleInFavoriteList, favoriteList,removeArticleFromList} = useContext(AppContext)
 const [isArticleOnList, setIsArticleOnList]= useState(false)
    const {article} = route.params
    const {url} = article

    const params ={
        bg:{
            style:styles.container,
        },
        webView:{
            onPress:()=>onBtnPress(),
            url:url,
            style:styles.webview,
            isArticleOnList:isArticleOnList
        }
    }

    const onBtnPress=()=>{
        if(isArticleOnList){
            removeArticleFromList(article?.title)
        }
        else {
            addActicleToFavorites(article)
        }
    }
 useEffect(() => {
    let flag =  isArticleInFavoriteList(article?.title)
    console.log('flag', flag);
    setIsArticleOnList(flag)
 }, [favoriteList])
 
    return (
        <BG {...params.bg}>
            <WebViewBox {...params.webView} />
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
