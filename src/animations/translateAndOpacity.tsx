import React, { PureComponent, Component } from 'react';
import { Animated, InteractionManager } from 'react-native';

interface Props{
  isHidden:boolean,
  delay:number,
  onHideAnimationEnd: (props:Props)=>void
}

interface State{
  opacityValue: Animated.Value,
  translateY: Animated.Value
}

const translateAndOpacity = (Wrapped:PureComponent<Props>|Component<Props>) => {
  return class TranslateAndOpacity extends PureComponent <Props, State>{
    constructor(props: Props) {
      super(props);

      this.state = {
        opacityValue: new Animated.Value(0),
        translateY: new Animated.Value(-4),
      };
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions().then(() => {
        this.showAnimation();
      });
    }
    componentWillReceiveProps(nextProps: Props) {
      if (!this.props.isHidden && nextProps.isHidden) {
        this.hideAnimation(nextProps);
      }
      if (this.props.isHidden && !nextProps.isHidden) {
        this.showAnimation();
      }
    }
    showAnimation() {
      const { delay } = this.props;

      Animated.parallel([
        Animated.timing(this.state.opacityValue, {
          toValue: 1,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(this.state.translateY, {
          toValue: 0,
          useNativeDriver: true,
          delay,
        }),
      ]).start();
    }
    hideAnimation(props: Props) {
      const { delay, onHideAnimationEnd } = props;

      Animated.parallel([
        Animated.timing(this.state.opacityValue, {
          toValue: 0,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(this.state.translateY, {
          toValue: -4,
          useNativeDriver: true,
          delay,
        }),
      ]).start(() => {
        if (onHideAnimationEnd) {
          onHideAnimationEnd(props);
        }
      });
    }
    render() {
      const { opacityValue, translateY } = this.state;

      return (
        <Animated.View
          style={[
            {
              opacity: opacityValue,
              transform: [{ translateY }],
            },
          ]}
        >
          <Wrapped {...this.props} />
        </Animated.View>
      );
    }
  };
};

export default translateAndOpacity;
