import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Row from '../Row';

interface Props{
  name:String
}

class Header extends PureComponent<Props,any>{
  render() {
    return (
      <Row style={styles.container}>
        <View style={styles.nameContainer}>
          <Text>{this.props.name}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text>Date</Text>
        </View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  dateContainer: {
    flex: 1,
    alignItems:'flex-end',
  },
  rightContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
