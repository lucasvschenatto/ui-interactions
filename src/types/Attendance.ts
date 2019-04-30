import Student from "./Student"

interface Attendance {
    name: string
    id?: string
    students: Array<Student>
}
export default Attendance