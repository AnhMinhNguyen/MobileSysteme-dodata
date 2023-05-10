import React from "react";
import { StyleSheet, View, Image } from "react-native";
import EntryText from "./EntryText";

export default ListTile = props => {
  return (
    <View style={styles.columnWrapper}>
      <View style={[styles.itemContainer, props.style]} >
        <Image
          style={{flex: 3, height: "75%", borderRadius: 4 }}
          source={{uri: props.text1 }}
        />
        <EntryText style={[props.style, { flex: 7, paddingRight: 15, paddingLeft: 10 }]}>{props.text2}</EntryText>
        <EntryText style={[props.style, { flex: 3, textAlign: 'right', marginRight:  32 }]}>{props.text3}%</EntryText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10
  },
  columnWrapper: {
    flex: 1
  }
});
