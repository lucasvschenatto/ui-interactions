import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Easing, AsyncStorage } from 'react-native'

import { SharedElement } from 'react-native-motion'

import Toolbar from './Toolbar'
import { ListItem } from '../../components'
import data from '../../data/data'
import Attendance from "../../types/Attendance"
import AddAttendanceButton from './AddAttendanceButton'
import Store from '../../store/Store';

interface Props{
  onItemPress:any,
  phase:string,
  selectedItem:Attendance,
}
interface State{
  opacityOfSelectedItem: number,
  attendances:Array<Attendance>,
  selectedAttendances:Array<Attendance>,
  selectedItem?: Attendance,
}

class List extends Component <Props,State>{
  store:Store

  sharedElementRefs:any

  constructor(props:any) {
    super(props)

    this.state = { opacityOfSelectedItem: 1, attendances:data, selectedAttendances:[] }
    this.sharedElementRefs = {}
    this.store = new Store()
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
      this.openItemDetails(item)
    }
  }

  onListItemLongPressed = (item:Attendance) => {
    this.addToSelection(item)
  }

  onMoveToDestinationWillStart = () => {
    this.setState({ opacityOfSelectedItem: 0 })
  }
  onMoveToSourceDidFinish = () => {
    this.setState({ opacityOfSelectedItem: 1 })
  }
  getSharedNode = (props:any ) => {
    const { item } = props

    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <ListItem item={item} animateOnDidMount={false} isHidden={false} />
      </View>
    )
  }
  renderItem = ({item}:{item:Attendance}) => {
    const { opacityOfSelectedItem } = this.state
    const { selectedItem } = this.props

    const isHidden = selectedItem && selectedItem.name !== item.name
    const isSelected = this.state.selectedAttendances.some(current => current === item)
    const id = item.name

    return (
      <SharedElement
        easing={Easing.in(Easing.back(0))}
        ref={(node:Component) => { this.sharedElementRefs[id] = node}}
        id={id}
        onMoveToDestinationWillStart={this.onMoveToDestinationWillStart}
        onMoveToSourceDidFinish={this.onMoveToSourceDidFinish}
        getNode={this.getSharedNode}
        item={item}
      >
        <View
          style={{
            opacity: opacityOfSelectedItem,
            backgroundColor: 'transparent',
          }}
        >
          <ListItem
            item={item}
            onPress={this.onListItemPressed}
            onLongPress={this.onListItemLongPressed}
            isHidden={isHidden}
            style={isSelected? styles.selectedItem : undefined}
          />
        </View>
      </SharedElement>
    )
  }

  openItemDetails = (item: Attendance) => {
    const { onItemPress } = this.props
    this.setState({ selectedItem: item })
    onItemPress(item)
    this.sharedElementRefs[item.name].moveToDestination()
  }

  deleteItems = () =>{
    const original = this.state.attendances
    const selected = this.state.selectedAttendances
    const remaining = original.filter(
        (current)=>{
          return selected.indexOf(current) < 0
        })
    this.setState(
      {attendances:remaining, selectedAttendances:[]},
      ()=>AsyncStorage.setItem('attendances', JSON.stringify(this.state.attendances))
    )
  }

  render() {
    const { opacityOfSelectedItem, selectedAttendances } = this.state
    const { phase } = this.props
    const isItemSelected = selectedAttendances.length !== 0
    const isButtonHidden= (phase !== 'phase-0' || isItemSelected)

    return (
      <View style={styles.container}>
        <Toolbar
          isHidden={phase !== 'phase-0'}
          itemSelected={isItemSelected}
          onDelete={this.deleteItems}
          onBackPress={this.cancelSelection}
        />
        <FlatList
          data={this.state.attendances}
          extraData={ [phase, opacityOfSelectedItem, selectedAttendances]}
          keyExtractor={(item,index) => item.name}
          renderItem={this.renderItem}
          ListFooterComponent={<View style={styles.footerItem}/>}
        />
        <AddAttendanceButton
          isButtonHidden={isButtonHidden}
          onSave={this.addAttendance}
          />
      </View>
    )
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
