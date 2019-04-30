import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import AddAttendance from './AddAttendance'
import {Props as AddAttendanceProps} from './AddAttendance'
import Attendance from "../../types/Attendance";

interface Props{
    isButtonHidden:boolean,
    onSave: (attendance:Attendance)=> void
}

interface State{
    showAddAttendance:boolean
}

class AddAttendanceButton extends Component<Props,State> {
    hideAddAttendance = () => {
        this.setState({showAddAttendance:false})
    }
    constructor(props:Props) {
        super(props)
    
        this.state = { showAddAttendance:false }
    }

    doShowAddAttendance = () => {
        this.setState({ showAddAttendance: true })
    }
    
    render() {
        const { isButtonHidden: isHidden } = this.props

        return (
        <View style={styles.container}>
                {isHidden?
                    null:
                    <ActionButton
                    buttonColor="rgba(0, 141, 255, 1)"
                    onPress={this.doShowAddAttendance}
                    position='center'
                />}
                <AddAttendance
                    isModalVisible={this.state.showAddAttendance}
                    onSave={(attendance) => {this.props.onSave(attendance); this.hideAddAttendance()}}
                    onCancel={() => this.setState({ showAddAttendance: false })}
                />
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