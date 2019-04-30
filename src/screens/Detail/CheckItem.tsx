import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Row from '../../components/Row'

interface State {
    checked:boolean
}

interface Props{
    name:String
}

class CheckItem extends React.Component<Props,State>{
    constructor(props : Props){
        super(props)
        this.state = { checked:false}
    }

    onCheck = () => {
        this.setState({checked:!this.state.checked})
    }
    render(){
        return (
            <View style={styles.itemContainer}>
                <Row style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{this.props.name}</Text>
                    </View>
                    <CheckBox
                        checked={this.state.checked}
                        onPress ={this.onCheck}
                        />
                </Row>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#DDD',
        borderWidth: 0.5,
        borderColor: '#222',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
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



export default CheckItem