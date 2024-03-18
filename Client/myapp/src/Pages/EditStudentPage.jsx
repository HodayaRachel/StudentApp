import React, { useEffect, useState } from 'react'
import { getStudentById, updateStudent} from '../Utils/studentsUtils'
import FormComp from '../Components/FormComp'
import { faFilePen } from '@fortawesome/free-solid-svg-icons';


export default function EditStudentPage() {

  const [editStudent, setEditStudent] = useState({})
  const [idStudent, setIdStudent] = useState(sessionStorage.getItem('studentId'))

  const fetchData = async () => {    
    if (idStudent) {
      sessionStorage.removeItem('studentId')
      try {
        const {student} = await getStudentById(idStudent)
        setEditStudent(student)
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>Edit Student</h1>
      <br/>
      <br/>
      <FormComp student={editStudent} buttonIcon={faFilePen} buttonColor={'#1976d2'} funcToButton={updateStudent}/>
    </>
  )
}
