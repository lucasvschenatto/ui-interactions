import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text, TextInput,Alert } from 'react-native'
import Attendance from '../../types/Attendance'
import { NavigationScreenProp } from 'react-navigation'
import Student from '../../types/Student'
import Store from '../../store/Store'

interface Props{
  navigation: NavigationScreenProp<any,NavigationProps>,
}
interface NavigationProps {
  context: Attendance,
  student: Student,
}

class EditStudent extends React.Component<Props,Student>{
  store:Store
  attendance:Attendance

  constructor(props:Props){
    super(props)
    this.attendance = props.navigation.getParam("context")
    this.state = props.navigation.getParam("student")
    this.store = new Store()
  }
  save = async () => {
    if (!this.state.name.trim()) {
        Alert.alert('Tente novamente', 'Informe um nome para o estudante')
        return
    }

    const newStudent = { ...this.state }
    await this.store.setStudent(newStudent, this.attendance)
    this.props.navigation.goBack()
  }
    render = () => {
        return (
          <View style={styles.container}>
                
          <View style={styles.container}>
            <View style={styles.header}>
                <Text>Novo aluno</Text>
            </View>
            <TextInput
                placeholder="Nome" 
                style={styles.input}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                autoFocus={true}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <TouchableWithoutFeedback onPress={()=> this.props.navigation.goBack()}>
                    <Text style={styles.button}>Cancelar</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.save}>
                    <Text style={styles.button}>Salvar</Text>
                </TouchableWithoutFeedback>
            </View>
          </View>
      </View>
        )
    }
}

const styles = StyleSheet.create({
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


export default EditStudent