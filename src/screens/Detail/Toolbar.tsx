import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, StatusBar, GestureResponderEvent } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

import { Row } from '../../components';
import translateAndOpacity from '../../animations/translateAndOpacity';

interface Props{
  onBackPress:(event: GestureResponderEvent) => void,
}

class Toolbar extends PureComponent <Props,any>{
  render() {
    const { onBackPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar barStyle='light-content'/>
        </View>
        <View>
          <Row style={styles.toolbarContainer}>
            <Row style={styles.backContainer} >
              <TouchableWithoutFeedback onPress={onBackPress}>
                <View style={styles.backButton}>
                  <Ionicons name="ios-arrow-back" size={24} color="white" />
                  <Text style={styles.titleBackText}>Back</Text>
                </View>
              </TouchableWithoutFeedback>
            </Row>
            <View style={styles.menuIconContainer}>
              <Feather name="share" size={24} color="white" />
            </View>
          </Row>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
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
    alignItems: 'center',
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
});

export default translateAndOpacity(Toolbar);
