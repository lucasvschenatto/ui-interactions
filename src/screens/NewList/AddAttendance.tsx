import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native'
import Attendance from '../../types/Attendance'
import { NavigationScreenProp } from 'react-navigation'
import Store from '../../store/Store'

export interface Props{
    navigation: NavigationScreenProp<any,any>
}

export default class AddClass extends React.Component<Props,Attendance>{
    store:Store

    constructor(props:Props) {
        super(props)
        this.state = {students:[], name:''}
        this.store = new Store()
    }

    save = async () => {
        if (!this.state.name.trim()) {
            Alert.alert('Tente novamente', 'Informe um nome para a chamada')
            return
        }

        const newAttendance = { ...this.state }
        await this.store.addAttendance(newAttendance)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text>Nova Chamada</Text>
                    </View>
                    <TextInput placeholder="Nome" style={styles.input}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    button: {
        margin: 20,
        marginRight: 30,
    },
    header: {
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
        color:'black'
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