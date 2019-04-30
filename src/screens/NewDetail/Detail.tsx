import React, { Component } from 'react';
import { SectionList, StyleSheet, View, Share, Text} from 'react-native';
import { ListItem } from '../../newComponents';
import Attendance from '../../types/Attendance';
import BottomBar from './BottomBar';
import CheckItem from './CheckItem';
import Toolbar from './Toolbar';
import { NavigationScreenProp } from 'react-navigation';
import Student from '../../types/Student';
import Store from '../../store/Store';
import ReportAttendance from '../../utils/ReportAttendance';



interface Props{
  navigation: NavigationScreenProp<any,NavigationProps>,
}

interface NavigationProps{
  selectedItem: Attendance
}

interface State{
  attendance:Attendance,
  selectedStudents:Array<Student>
}

class Detail extends Component <Props, State>{
  store:Store
  report:ReportAttendance
  constructor (props:Props){
    super(props)
    this.store = new Store()
    this.report = new ReportAttendance()
    this.state = {attendance:this.props.navigation.getParam("selectedItem"), selectedStudents:[]}
    this.props.navigation.addListener('willFocus', () => this.updateState()) 
  }
  togglePresence = async (student: Student) => {
    student.attended = !student.attended
    const {attendance} = this.state
    await this.store.setStudent(student,attendance)
    let students = await this.store.getStudents(attendance)
    this.setState({attendance:{...attendance,students}, selectedStudents:[]})
  }
  onPress = async (student: Student) => {
    if(this.state.selectedStudents.length){
      this.addToSelection(student)
    }else{
      this.togglePresence(student)
    }
  }
  addToSelection = (student:Student) =>{
    let {selectedStudents} = this.state
    if (selectedStudents.some(current => current === student)) {
      selectedStudents.splice(selectedStudents.indexOf(student), 1)
    }
    else {
      selectedStudents.push(student)
    }
    this.setState({ selectedStudents })
  }
  onLongPress = (student:Student) =>{
    this.addToSelection(student)
  }

  updateState = async ()=>{
    const {attendance} = this.state
    let students = await this.store.getStudents(attendance)
    this.setState({attendance:{...attendance,students}, selectedStudents:[]})
  }
  addStudent = ()=>{
    const {attendance} = this.state
    this.props.navigation.navigate('EditStudent',{context:attendance, student:{}})
  }

  share = ()=>{
    const shareable = this.report.toShare(this.state.attendance)
    Share.share(shareable)
  }

  goBack = () =>{
    this.props.navigation.goBack()
  }

  cancelSelection = () => {
    this.setState({ selectedStudents:[] })
  }

  deleteSelectedStudents = async () => {
    const {attendance, selectedStudents} = this.state
    const remaining = await this.store.deleteStudents(selectedStudents, attendance)
    this.setState({attendance:{...this.state.attendance,students:remaining},selectedStudents:[]})
  }

  editStudent = () => {
    const {attendance} = this.state
    this.props.navigation.navigate('EditStudent',{context:attendance, student:this.state.selectedStudents[0]})
  }

  renderAbsentStudent = ({ item }:{item:Student}) => {
    const isSelected = this.isSelected(item)
    const selectedStyle = isSelected? styles.selectedCheck:undefined
    return (
        <CheckItem
          student={item}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          style={selectedStyle}
        />
    )
  }
  
  renderPresentStudent = ({ item }:{item:Student}) => {
    const isSelected = this.isSelected(item)
    const selectedStyle = isSelected? styles.selectedCheck:undefined
    return (
        <CheckItem
          student={item}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          style = {[styles.presenceCheck,selectedStyle]}
        />
        )
      }
  
  isSelected = (student:Student):boolean => {
    const {selectedStudents} = this.state
    return selectedStudents.some(current=>current === student)
  }
  render = () => {
    const {attendance, selectedStudents} = this.state
    const selectedCount = selectedStudents.length
    const { students } = attendance
    const present = students.filter((student)=>student.attended).sort((a,b)=>a.name<b.name?-1:1)
    const absent = students.filter((student)=>!student.attended).sort((a,b)=>a.name<b.name?-1:1)
    return (
      <View
        style={styles.container}>
        
        <Toolbar
          onBackPress={this.goBack}
          onSharePress={this.share}
          selectedCount={selectedCount}
          onCancelSelection={this.cancelSelection}
          onDelete={this.deleteSelectedStudents}
          onEditItem={this.editStudent}
        />

        <View
          style={StyleSheet.absoluteFill}
          >
          <ListItem
            style={styles.itemContainer}
            item={attendance}
            onPress={() => {}}
          />
          <SectionList
            sections={[
              { title:'Ausentes', data:absent, renderItem:this.renderAbsentStudent },
              { title:'Presentes', data:present, renderItem:this.renderPresentStudent }
            ]}
            keyExtractor={(item, index) => item.name+index}
            renderSectionHeader={(info)=><View><Text>{info.section.title}</Text></View>}
          />
          <BottomBar isHidden={false} onPressButton={this.addStudent}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginTop: 75,
  },
  rowContainer: {
    alignItems: 'center',
  },
  titleText: {},
  presenceCheck:{
    backgroundColor: '#ebf6ff',
  },
  selectedCheck:{
    backgroundColor: '#c4e4ff',
  }
})

export default Detail
