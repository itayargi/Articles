import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../utils/Colors';
import sizes from '../../utils/sizes';
import TextComp from '../textComp/TextComp';

const DashboardBox = (props) => {
    const {boxData, style} = props;
    const {title , data} = boxData

    return (
        <View style={[styles.box,style]}>
            <TextComp style={styles.text}>{title}</TextComp>
            <TextComp style={styles.text}>{data}</TextComp>
        </View>
    )
}

export default DashboardBox

const styles = StyleSheet.create({
    box:{
        width: sizes.PageWidth * 0.8,
        paddingVertical:20,
        backgroundColor: '#ffffff',
        alignSelf:"center",
        margin: 10,
        alignItems: 'center',
        elevation:10,
        borderRadius:10
    },
    text:{
        color:Colors.headerColor, 
        textAlign: 'center',
        fontSize:19,
        // marginTop:20,
        // paddingHorizontal:15
    },
})
