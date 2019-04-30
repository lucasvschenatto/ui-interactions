import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ViewStyle} from 'react-native'
import { CheckBox } from 'react-native-elements'
import Row from '../../components/Row'
import Student from '../../types/Student'

interface Props{
    student:Student,
    onPress?:(student:Student)=>void,
    onLongPress?:(student:Student)=>void,
    style?:ViewStyle|Array<ViewStyle|undefined>,
}

class CheckItem extends React.Component<Props>{

    constructor(props : Props){
        super(props)
    }
    onPressed = () => {
        const { onPress, student } = this.props
        onPress!(student)
    }
  
    onLongPressed = () => {
      const { onLongPress, student } = this.props
      onLongPress!(student)
    }

    render(){
        const {name} = this.props.student
        const {style, student} = this.props
        return (
            <TouchableWithoutFeedback
                onPress={this.onPressed}
                onLongPress={this.onLongPressed}
            >
                <View style={[styles.itemContainer, style]}>
                        <Row style={styles.rowContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>{name}</Text>
                            </View>
                            <CheckBox
                                checked={student.attended}
                                onPress={this.onPressed}
                                onLongPress={this.onLongPressed}
                                />
                        </Row>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemContainer: {
    },
    rowContainer: {
        alignItems: 'center',
    },
    titleText: {},
    presenceCheck: {
        fontSize: 18,
        fontWeight: '900',
    },
    vatText: {
        fontSize: 10,
        color: 'gray',
    },
})



export default CheckItem