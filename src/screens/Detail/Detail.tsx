import React, { PureComponent } from 'react';
import { Easing, FlatList, StyleSheet, View } from 'react-native';
import { SharedElement, TranslateYAndOpacity } from 'react-native-motion';
import { ListItem } from '../../components';
import Attendance from '../../types/Attendance';
import BottomBar from './BottomBar';
import CheckItem from './CheckItem';
import Toolbar from './Toolbar';



interface Props{
  phase: string,
  selectedItem: Attendance,
  onSharedElementMovedToDestination: ()=>{},
  onBackPress: ()=>{},
  onSharedElementMovedToSource: ()=>{},
}

interface State{
  opacityOfDestinationItem:number
}

class Detail extends PureComponent <Props, State>{
  sharedElementRef:SharedElement|null = null

  constructor(props: Props) {
    super(props)

    this.state = {
      opacityOfDestinationItem: 0,
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.phase === 'phase-2' && nextProps.phase === 'phase-3') {
      this.sharedElementRef.moveToSource()
    }
  }
  onMoveToDestinationDidFinish = () => {
    this.setState({ opacityOfDestinationItem: 1 })
    this.props.onSharedElementMovedToDestination()
  }
  onMoveToSourceWillStart = () => {
    this.setState({ opacityOfDestinationItem: 0 })
  }
  renderItem = ({ item, index }:{item:Attendance,index:number}) => {
    const { phase, selectedItem } = this.props

    let delay = index
    // we need it to go from the end
    if (phase === 'phase-3') {
      delay = selectedItem.items.length - index
    }

    return (
      <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56 * delay}>
        <CheckItem name={item.name}/>
      </TranslateYAndOpacity>
    )
  }
  render() {
    const {
      selectedItem,
      phase,
      onBackPress,
      onSharedElementMovedToSource,
    } = this.props
    const { opacityOfDestinationItem } = this.state

    const { items = [] } = selectedItem || {}

    if (!selectedItem) {
      return null
    }

    return (
      <View
        style={styles.container}>
        
        <Toolbar isHidden={phase === 'phase-3'} onBackPress={onBackPress} />

        <SharedElement
          ref={(node:Attendance) => (this.sharedElementRef = node)}
          sourceId={selectedItem.name}
          easing={Easing.in(Easing.back())}
          onMoveToDestinationDidFinish={this.onMoveToDestinationDidFinish}
          onMoveToSourceWillStart={this.onMoveToSourceWillStart}
          onMoveToSourceDidFinish={onSharedElementMovedToSource}
          >
          <View
            style={{
              opacity: opacityOfDestinationItem,
              backgroundColor: 'transparent',
            }}>
            <ListItem
              item={selectedItem}
              onPress={() => {}}
              animateOnDidMount={false}
              isHidden={false}
            />
          </View>
        </SharedElement>
        <FlatList
          data={items}
          extraData={phase}
          keyExtractor={(item, index) => item.name+index}
          renderItem={this.renderItem}
        />
        <BottomBar isHidden={phase === 'phase-3'}  />
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
    marginVertical: 8,
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

export default Detail
