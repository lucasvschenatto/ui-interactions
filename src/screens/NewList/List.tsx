import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import Toolbar from './Toolbar'
import { ListItem } from '../../newComponents'
import Attendance from "../../types/Attendance"
import AddButton from '../../newComponents/newAddButton/AddButton'
import Store from '../../store/Store'
import { NavigationScreenProp } from 'react-navigation'

interface Props{
  navigation: NavigationScreenProp<null,null>
}
interface State{
  attendances:Array<Attendance>,
  selectedAttendances:Array<Attendance>
}

class List extends Component <Props,State>{
  store:Store

  constructor(props:Props) {
    super(props)
    this.state = {selectedAttendances:[], attendances:[] }
    this.store = new Store()
    this.props.navigation.addListener('willFocus', ()=>this.updateState()) 
  }

  async updateState(){
    let attendances = await this.store.getAttendances()
    this.setState({attendances})
  }

  isItemSelected = ()=>{
    const { selectedAttendances } = this.state
    return selectedAttendances.length !== 0
  }


  private addToSelection(item: Attendance) {
    let selectedAttendances = this.state.selectedAttendances
    if (selectedAttendances.some(current => current === item)) {
      selectedAttendances.splice(selectedAttendances.indexOf(item), 1)
    }
    else {
      selectedAttendances.push(item)
    }
    this.setState({ selectedAttendances })
  }

  cancelSelection = () => {
    this.setState({selectedAttendances:[]})
  }

  addAttendance = (attendance:Attendance) => {
    const attendances = [...this.state.attendances]
    attendances.push(attendance)

    this.setState( {attendances}, () => this.store.setAttendances(this.state.attendances) )
  }

  onListItemPressed = (item:Attendance) => {
    if(this.state.selectedAttendances.length){
      this.addToSelection(item)
    }else{
      this.navigateToDetails(item)
    }
  }

  onListItemLongPressed = (item:Attendance) => {
    this.addToSelection(item)
  }

  renderItem = ({item}:{item:Attendance}) => {
    const isSelected = this.state.selectedAttendances.some(current => current === item)
    const id = item.name

    return (
        <View
          style={{
            backgroundColor: 'transparent',
          }}>
          <ListItem
            item={item}
            onPress={this.onListItemPressed}
            onLongPress={this.onListItemLongPressed}
            style={isSelected? styles.selectedItem : undefined}
          />
        </View>
    )
  }

  navigateToDetails = (item: Attendance) => {
    this.props.navigation.navigate('Attendance', {
      "selectedItem": item
    })
  }

  deleteItems = async () =>{
    const remaining = await this.store.deleteAttendances(this.state.selectedAttendances)
    this.setState({attendances:remaining,selectedAttendances:[]})
  }

  render = () => {
    const { selectedAttendances, attendances } = this.state
    const isItemSelected = this.isItemSelected()
    const isButtonHidden= this.isItemSelected()

    return (
      <View style={styles.container}>
        
        <Toolbar
            isItemSelected={isItemSelected}
            onDelete={this.deleteItems}
            onBackPress={this.cancelSelection}
          />
        <FlatList
          data={attendances}
          extraData={ [selectedAttendances]}
          keyExtractor={(item,index) => item.name+index}
          renderItem={this.renderItem}
          ListFooterComponent={<View style={styles.footerItem}/>}
        />
        <AddButton
          isHidden={isButtonHidden}
          onPress={this.navigateToAddAttendance}
          />
      </View>
    )
  }

  navigateToAddAttendance = () => {
    this.props.navigation.navigate('AddAttendance')
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  selectedItem:{
    backgroundColor:"rgb(0, 191, 255)",
  },
  footerItem:{
    height:150,
  }
})

export default List
