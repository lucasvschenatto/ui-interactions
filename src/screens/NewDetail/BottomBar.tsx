import React, { PureComponent } from 'react'
import { View, StyleSheet, GestureResponderEvent } from 'react-native'

import Button from './Button'
import { Row } from '../../components'

interface Props {
  isHidden:boolean,
  onPressButton?:(event: GestureResponderEvent) => void
}

class BottomButtons extends PureComponent <Props>{
  render() {
    const { isHidden, onPressButton } = this.props

    return (
      <Row style={styles.container}>
        <View style={styles.flexContainer}>
          <Button
            isHidden={isHidden}
            name="person-add"
            backgroundColor="#008dff"
            onPress={onPressButton!}
          />
        </View>
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 112,
    marginHorizontal: 16,
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BottomButtons
