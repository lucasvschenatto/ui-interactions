import React from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
} from 'react-native'
import Attendance from '../../types/Attendance';

export interface Props{
    isModalVisible:boolean,
    onSave: (attendance:Attendance) => void,
    onCancel: () => void
}

export default class AddClass extends React.Component<Props,Attendance>{

    constructor(props:Props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = ():Attendance => {
        return {
            name:''
        }
    }

    save = () => {
        if (!this.state.name.trim()) {
            Alert.alert('Tente novamente', 'Informe um nome para a chamada')
            return
        }

        const newAttendance = { ...this.state }
        this.props.onSave(newAttendance)
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isModalVisible}
                animationType='slide'
                transparent={true}
                onShow={() => this.setState({ ...this.getInitialState() })}>
                
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Chamada</Text>
                    <TextInput placeholder="Nome" style={styles.input}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
    },
    header: {
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    date: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center',
    }
})