import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import Attendance from "../../types/Attendance";

interface Props{
    isHidden:boolean,
    onSave?: (attendance:Attendance)=> void,
    onPress: ()=> void
}


class AddAttendanceButton extends Component<Props> {
    
    render() {
        const { isHidden, onPress } = this.props

        return (
        <View style={styles.container}>
                {isHidden?
                    null:
                    <ActionButton
                    buttonColor="rgba(0, 141, 255, 1)"
                    onPress={onPress}
                    position='center'
                />}
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    ...(StyleSheet.absoluteFill as ViewStyle),
  }
});
export default AddAttendanceButton;