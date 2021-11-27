import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import AppContext from '../../store/AppContext';
import BG from '../components/bg/BG';
import AppModal from '../components/modal/AppModal';
import TextComp from '../components/textComp/TextComp';
import WebViewBox from '../components/webview/WebViewBox';
import screenNames from '../utils/screenNames';
import strings from '../utils/strings';
import Colors from '../utils/Colors'
const ArticleData = ({ route }) => {
    
 const {addActicleToFavorites, isArticleInFavoriteList, favoriteList,removeArticleFromList, isLogged} = useContext(AppContext)
 const [isArticleOnList, setIsArticleOnList]= useState(false)
 const [modalVisible, setModalVisible] = useState(false)
    const {article} = route.params
    const {url} = article
const navigation = useNavigation()
    const closeModal = ()=>{
        setModalVisible(false)
    }

    const goToLogginScreen=()=>{
        closeModal()
        navigation.navigate(screenNames.TabsNavigation,{
            screen:screenNames.FavoriteList
        })
        
    }

    const params ={
        bg:{
            style:styles.container,
        },
        webView:{
            onPress:()=>onBtnPress(),
            url:url,
            style:styles.webview,
            isArticleOnList:isArticleOnList
        },
        modal:{
            modalVisible,
            close:closeModal,
            leftBtn:{
                text:strings.cancel,
                onPress:closeModal
            },
            rightBtn:{
                text:strings.modal_addToFavorite_btn,
                onPress:()=>goToLogginScreen()
            }

        }
    }

    const onBtnPress=()=>{
        if(isLogged){
            if(isArticleOnList){
                removeArticleFromList(article?.title)
            }
            else {
                addActicleToFavorites(article)
            }
        }
        else{
            setModalVisible(true)
        }
       
    }
 useEffect(() => {
    let flag =  isArticleInFavoriteList(article?.title)
    setIsArticleOnList(flag)
 }, [favoriteList])
 
    return (
        <BG {...params.bg}>
            <AppModal {...params.modal}>
                <TextComp style={styles.modalHeader}>{strings.modal_addToFavorite_access}</TextComp>
                </AppModal>
            <WebViewBox {...params.webView} />
        </BG>
    )
}

export default ArticleData

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        color:"black"
    },
    webview:{
        height:400
    },
    modalHeader:{
        color:Colors.fontColor,
        fontSize:22,
        textAlign:"center"
    },
})
