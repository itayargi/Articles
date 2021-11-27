import React from "react";
import { Modal, StyleSheet, View, Animated, TouchableOpacity, Text } from "react-native";
import Colors from "../../utils/Colors";

const AppModal = (props) => {
  const { modalVisible, leftBtn, rightBtn, close, style } = props;
  const params = {
    modal: {
      visible: modalVisible,
      style: styles.container,
      transparent: true,
    },
  };

  return (
    <Modal Animated animationType={"slide"} {...params.modal}>
      <View style={styles.fullScreen}>
        <Animated.View style={[styles.innerContainer,style]}>
          {props.children}
          {leftBtn && rightBtn && <View style={styles.btnRow}>
            <TouchableOpacity onPress={leftBtn.onPress}><Text style={[styles.btnText,{color:Colors.colordarkCoral}]}>{leftBtn.text}</Text></TouchableOpacity>
            <TouchableOpacity onPress={rightBtn.onPress}><Text style={styles.btnText}>{rightBtn.text}</Text></TouchableOpacity>
          </View> }
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 15,
    borderRadius: 15,
  },
  btnRow:{
    flexDirection:'row',  
    justifyContent:"space-around",
    marginTop:20
  },
  btnText:{
color:"blue",
fontWeight:"bold",
fontSize:18
  }
});

export default AppModal;
