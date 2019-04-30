import React from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  InteractionManager,
  GestureResponderEvent,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface State {
  translateY:Animated.Value,
}



export interface Props {
  name:string,
  delay?:number,
  isHidden:boolean,
  backgroundColor:string,
  onPress:(event: GestureResponderEvent) => void,
}

class Button extends React.PureComponent<Props,State> {
  constructor(props:Props) {
    super(props)

    this.state = {
      translateY: new Animated.Value(112),
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions().then(() => {
      this.showAnimation(this.props)
    })
  }
  componentWillReceiveProps(nextProps:Props) {
    if (!this.props.isHidden && nextProps.isHidden) {
      this.hideAnimation(nextProps)
    }
  }
  showAnimation(props:Props) {
    Animated.timing(this.state.translateY, {
      easing: Easing.out(Easing.back(0)),
      toValue: 0,
      delay: props.delay,
    }).start()
  }
  hideAnimation(props:Props) {
    Animated.timing(this.state.translateY, {
      easing: Easing.in(Easing.back(0)),
      toValue: 112,
      delay: props.delay,
    }).start()
  }
  render() {
    const { backgroundColor, name, onPress } = this.props
    const { translateY } = this.state

    const animationStyle = {
      transform: [{ translateY }],
    }

    return (
      <Animated.View
        style={[styles.iconContainer, { backgroundColor }, animationStyle]}
      >
        <MaterialIcons name={name} size={24} color="white" onPress={onPress} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Button

