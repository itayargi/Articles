import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "../../utils/Colors";

const Loader = (props) => {
  const {style} = props
  return (
    <View style={[styles.container,style]}>
      <ActivityIndicator size="large" color={Colors.colorSeafoamBlue} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Loader;
