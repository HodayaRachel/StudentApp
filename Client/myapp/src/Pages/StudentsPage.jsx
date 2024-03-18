import React from "react";
import { useState, useEffect } from "react";
import { getAllStudents } from "../Utils/studentsUtils";
import BasicTable from "../Components/BasicTable";

export default function StudentsPage() {
  const [allStudents, setAllStudents] = useState([]);

  const fetchData = async () => {
    const {students} = await getAllStudents();
    setAllStudents(students);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>All Students</h1>
      <br />
      <BasicTable allStudents={allStudents} />
    </div>
  );
}
