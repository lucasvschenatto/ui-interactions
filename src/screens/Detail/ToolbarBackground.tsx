import React, { Component } from 'react';
import { Animated, View, StyleSheet, InteractionManager } from 'react-native';

interface Props{
  isHidden:boolean,
}

interface State{
  translateY: Animated.Value
}

class ToolbarBackground extends Component <Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(props.isHidden ? -150 : 0),
    };
  }
  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isHidden && nextProps.isHidden) {
      this.hideAnimation();
    }
    if (this.props.isHidden && !nextProps.isHidden) {
      this.showAnimation();
    }
  }
  hideAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: -150,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }
  showAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }
  render() {
    const { translateY } = this.state;

    const animationStyle = {
      transform: [{ translateY }],
    };

    return <Animated.View style={[styles.toolbarBackground, animationStyle]} />;
  }
}

const styles = StyleSheet.create({
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#008dff',
  },
});

export default ToolbarBackground;
