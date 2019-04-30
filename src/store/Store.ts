import { AsyncStorage } from 'react-native'
import Attendance from "../types/Attendance"
import Storage from 'react-native-storage'
import Student from "../types/Student"
import AttendanceDate from "../types/AttendanceDate"
import Presence from "../types/Presence"
import uuid from 'uuid-js'

const attendancesKey = "attendances"
const studentsKey = "students"
const attendanceDatesKey = "attendanceDates"
const presencesKey = "presences"

class Store{
    getStudents = async (attendance: Attendance):Promise<Array<Student>> => {
      const attendances = await this.getAttendances()
      const updated = attendances.find((value)=>value.name === attendance.name)
      return updated? updated.students: []
    }

    deleteStudents = async (studentsToDelete:Array<Student>, context: Attendance) => {
        const previous = await this.getStudents(context)
        const remaining = previous.filter(
            (current)=> !studentsToDelete.some((value)=>value.id === current.id)
        )

        const updatedAttendance = {...context,students:remaining}

        await this.updateAttendance(updatedAttendance)
        return remaining
    }

    setStudent = async (newStudent: Student, context: Attendance) => {
        const toUpdate = context
        if(!newStudent.id){
            newStudent.id = uuid.create().toString()
            toUpdate.students.push(newStudent)
        } else{
            const existingStudent = toUpdate.students.find((current)=>current.id === newStudent.id)
            existingStudent!.name = newStudent.name
            existingStudent!.attended = newStudent.attended
        }
        await this.updateAttendance(toUpdate)
    }
    updateAttendance = async (toUpdate: Attendance) => {
        const attendances = await this.getAttendances()
        const index = attendances.findIndex((value)=> value.name === toUpdate.name )
        attendances.splice(index,1,toUpdate)
        this.setAttendances(attendances)
        return attendances
    }
    addAttendance = async (attendance:Attendance) => {
        const attendances = await this.getAttendances()
        attendances.push(attendance)
        await this.setAttendances(attendances)
    }

    deleteAttendances = async (attendancesToDelete:Array<Attendance>) => {
        const previous = await this.getAttendances()
        const remaining = previous.filter(
            (current)=> !attendancesToDelete.some((value)=>value.name === current.name)
        )
        let stringAttendances = JSON.stringify(remaining)

        await AsyncStorage.setItem(attendancesKey, stringAttendances)
        return remaining
    }

    setAttendances = async (value:Array<Attendance>) => {
        let stringAttendances = JSON.stringify(value)
        await AsyncStorage.setItem(attendancesKey, stringAttendances)
    }

    getAttendances = async ():Promise<Array<Attendance>> => {
        let attendances:Array<Attendance> = []
        const promisedItems = await AsyncStorage.getItem(attendancesKey)
        attendances = JSON.parse(promisedItems!)
        return attendances
    }

        
}
export default Store