import React, { PureComponent } from 'react'
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native'

interface Props{
  children: React.ReactNode,
  style: ViewStyle | TextStyle
}

class Row extends PureComponent <Props,any>{
  render() {
    const { style, children } = this.props

    return <View style={[styles.container, style]}>{children}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})

export default Row
