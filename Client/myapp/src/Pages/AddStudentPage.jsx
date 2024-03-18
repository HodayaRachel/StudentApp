import React from "react";
import { Fragment } from "react";
import {addStudent} from '../Utils/studentsUtils'
import FormComp from '../Components/FormComp'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


export default function AddStudentPage() {
  return (
    <Fragment>
      <h1>Add Student</h1>
      <br/>
      <br/>
      <FormComp student={{}} buttonIcon={faCirclePlus} buttonColor={'#7d0879'} funcToButton={addStudent}/>
    </Fragment>
  );
}
