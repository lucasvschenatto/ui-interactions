import React, { PureComponent, Component } from 'react';
import {
  Easing,
  Animated,
  View,
  StyleSheet,
} from 'react-native';

import { ListItem } from '../components';
import Attendance from '../types/Attendance';

interface Props{
  phase: string,
  onMoveDetailAnimationEnd: Animated.EndCallback,
  onMoveBackAnimationEnd: Animated.EndCallback,
  selectedItem: Attendance
  startPosition: {
    pageY: number,
    width: number
  },
}

interface State{
  topValue: Animated.Value,
  selectedItem: Component | null
}

class Detail extends PureComponent <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      topValue: new Animated.Value(props.startPosition.pageY),
      selectedItem: null,
    };
  }
  componentDidMount() {
    this.moveItemToTop();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.phase !== 'phase-3' && nextProps.phase === 'phase-3') {
      this.moveItemBack();
    }
  }
  moveItemToTop = () => {
    const { onMoveDetailAnimationEnd } = this.props;

    Animated.timing(this.state.topValue, {
      easing: Easing.in(Easing.back()),
      toValue: 80,
      duration: 500,
    }).start(onMoveDetailAnimationEnd);
  };
  moveItemBack = () => {
    const { onMoveBackAnimationEnd, startPosition } = this.props;

    Animated.timing(this.state.topValue, {
      easing: Easing.in(Easing.back()),
      toValue: startPosition.pageY,
      duration: 500,
    }).start(onMoveBackAnimationEnd);
  };
  onBackPressed = () => {
    this.setState({ selectedItem : null });
  };
  render() {
    const { topValue } = this.state;
    const { selectedItem, startPosition } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.positionContainer,
            {
              top: topValue,
              width: startPosition.width,
            },
          ]}
        >
          <ListItem item={selectedItem} onPress={() => {}} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  positionContainer: {
    position: 'absolute',
  },
});

export default Detail;
