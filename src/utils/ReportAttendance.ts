import Attendance from "../types/Attendance"

interface ShareableReport{
    title:string,
    message:string
}

class ReportAttendance {
    toShare(attendance:Attendance):ShareableReport{
        const {students, name} = attendance
        const title = "App do Lucas - " + "Classe: " + name
        const introduction = "Classe " + name + ":"
        const absents = students.filter((student)=>!student.attended)
        const absentsTitle = "\nHouveram " + absents.length + " ausentes:"
        let absentsBody = ""
        absents.forEach((student)=>{
            absentsBody += "\n" + " - " + student.name
        })

        const presents = students.filter((student)=>student.attended)
        const presentsTitle = "\nHouveram " + presents.length + " presentes:"
        let presentsBody = ""
        presents.forEach((student)=>{
            presentsBody += "\n" + " - " + student.name
        })

        const message = introduction+absentsTitle+absentsBody+"\n---------------"+presentsTitle+presentsBody

        return {title,message}
    }
}
export default ReportAttendance