import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, StatusBar, GestureResponderEvent, ViewStyle } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

import { Row } from '../../components'

interface Props{
  onBackPress:(event: GestureResponderEvent) => void,
  onDelete:(event: GestureResponderEvent) => void,
  onSharePress:(event: GestureResponderEvent) => void,
  onEditItem:(event: GestureResponderEvent) => void,
  onCancelSelection:(event: GestureResponderEvent) => void,
  selectedCount:number,
}

class Toolbar extends PureComponent <Props,any>{
  render() {
    const {selectedCount: isItemSelected} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar barStyle='light-content'/>
        </View>
        <View>
          {isItemSelected?
            this.renderSelectedItemOptions() :
            this.renderHeader()
          }
        </View>
      </View>
    )
  }
  
  renderHeader = () => {
    const { onBackPress, onSharePress } = this.props
    return <View>
      <Row style={styles.toolbarContainer}>
        <View style={styles.backContainer}>
          <TouchableWithoutFeedback onPress={onBackPress}>
            <View style={styles.backButton}>
              <Ionicons name="ios-arrow-back" size={24} color="white" />
              <Text style={styles.titleBackText}>Voltar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={onSharePress}>
          <View style={styles.menuIconContainer}>
            <Feather name="share" size={24} color="white" />
          </View>
        </TouchableWithoutFeedback>
      </Row>
    </View>
  }
  renderSelectedItemOptions = () => {
    const { onCancelSelection,onEditItem, onDelete, selectedCount} = this.props

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <View onTouchEnd={onCancelSelection}>
                  <MaterialIcons name="close" size={24} color="white" />
                  <Text style={styles.titleBackText}></Text>
                </View>
              </Row>
              <View
                style={styles.menuIconContainer}
                onTouchEnd={onEditItem}>
                {selectedCount === 1?
                <MaterialIcons name="edit" size={24} color="white" />:
                undefined
                }
              </View>
              <View
                style={styles.menuIconContainer}
                onTouchEnd={onDelete}>
                <Feather name="trash-2" size={24} color="white" />
              </View>
            </Row>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'black'
  } as ViewStyle,
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#008dff',
  } as ViewStyle,
  statusBar: {
    height: 24,
    backgroundColor: '#008dff',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
  },
  backContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  backButton:{
    height:30,
    flexDirection:'row',
    alignItems:'flex-start',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Toolbar
