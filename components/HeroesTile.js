import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

export default GridTile = props => {
  return (
    <View style={styles.columnWrapper}>
      <TouchableOpacity
        style={[styles.itemContainer, props.style, props.styleContainer]}
        onPress={() => props.onClick(props.id)}
      >
        <Image
          style={styles.iconStyle}
          source={props.source}
        >
        </Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 10
  },
  columnWrapper: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});
