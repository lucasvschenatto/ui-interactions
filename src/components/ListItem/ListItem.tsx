import React, { PureComponent, Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet, GestureResponderEvent, NativeTouchEvent, ViewStyle } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';

import Header from './Header';
import { getPlatformElevation } from '../../utils';
import Attendance from '../../types/Attendance';

interface Props{
  item:Attendance,
  style?:ViewStyle,
  isHidden?:boolean,
  animateOnDidMount?:boolean,
  onPress?:(item:Attendance,event:NativeTouchEvent)=>void,
  onLongPress?:(item:Attendance,event:NativeTouchEvent)=>void,
}

class ListItem extends PureComponent <Props>{
  onPressed = (event:GestureResponderEvent) => {
    const { onPress, item } = this.props
    onPress!(item, event.nativeEvent)
  }

  onLongPressed = (event:GestureResponderEvent) => {
    const { onLongPress, item } = this.props
    onLongPress!(item, event.nativeEvent)
  }
  render() {
    const { item, style, isHidden, animateOnDidMount } = this.props
    const { name, ...rest } = item

    return (
      <ScaleAndOpacity
        isHidden={isHidden}
        animateOnDidMount={animateOnDidMount}
      >
        <TouchableWithoutFeedback
          onPress={this.onPressed}
          onLongPress={this.onLongPressed}>
          <View style={[styles.container, style]} pointerEvents="box-only">
            <Header name={name} />
            {/* <Content {...rest} /> */}
          </View>
        </TouchableWithoutFeedback>
      </ScaleAndOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    ...getPlatformElevation(2),
  },
});

export default ListItem;
