import { createStackNavigator, NavigationRouteConfigMap } from 'react-navigation'
import List from './screens/NewList/List';
import Detail from './screens/NewDetail/Detail';
import EditStudent from './screens/newEditStudent/EditStudent'
import AddAttendance from './screens/NewList/AddAttendance'
const mainRoutes:NavigationRouteConfigMap = {
    Attendances : {
        name: 'Attendances',
        screen: List,

    },
    Attendance: {
        name: 'Attendance',
        screen: Detail
    },
    AddAttendance:{
        name: 'AddAttendance',
        screen: AddAttendance
    },
    EditStudent: {
        name: 'EditStudent',
        screen: EditStudent
    }
}

const mainNavigator = createStackNavigator( mainRoutes, {
    initialRouteName: 'Attendances',
    headerMode:"none"
})

export default mainNavigator