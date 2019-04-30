import React from 'react'
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  ViewStyle
} from 'react-native'
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons'

import { Row } from '../../components'

interface Props{
  onBackPress:()=>void,
  onDelete?:()=>void,
  isItemSelected:boolean,
  style?:ViewStyle,
}

class Toolbar extends React.Component <Props>{
  renderSelectedItemOptions() {
    const { onBackPress, onDelete} = this.props

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <Animated.View>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <View onTouchEnd={onBackPress}>
                  <Ionicons name="ios-arrow-back" size={24} color="black" />
                  <Text style={styles.titleBackText}>Back</Text>
                </View>
              </Row>
              <View
                style={styles.menuIconContainer}
                onTouchEnd={onDelete}>
                <Feather name="trash-2" size={24} color="black" />
              </View>
            </Row>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  private renderHeader() {
    return (
      <View>
        <Row style={styles.toolbarContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Minhas Chamadas</Text>
          </View>
          {/* <View style={styles.menuIconContainer}>
            <Ionicons name="md-menu" size={24} color="#008dff" />
          </View> */}
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
          </View>
        </Row>
      </View>)
  }

  render() {
    const {isItemSelected, style} = this.props

    return (
      <View style={[styles.container, style]}>
        <View style={styles.statusBar}>
          <StatusBar barStyle='dark-content'/>
        </View>
        {isItemSelected?
          this.renderSelectedItemOptions() :
          this.renderHeader()}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#008dff',
  },
  statusBar: {
    height: 24,
    backgroundColor: 'white',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Toolbar
