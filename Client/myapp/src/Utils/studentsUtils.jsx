import axios from "axios";
const url = "http://localhost:8000/students";

const getAllStudents = async () => {
  const { data } = await axios.get(url);
  return data;
};

const getStudentById = async (id) => {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
};

const addStudent = async (Data) => {
  console.log(Data.student);
  const { data } = await axios.post(url, Data.student);
  return data;
};

const updateStudent = async (Data) => {
  console.log(Data.student);
  const { data } = await axios.put(`${url}/${Data.id}`, Data.student);
  return data;
};

const updateGrade = async (Data) => {
  if(Data.studentId) {
    const {data} = await axios.put(`${url}/grade/${Data.studentId}/${Data.gradeId}`, Data.newGrade)
    return data
  }
}

const deleteStudent = async (id) => {
  const { data } = await axios.delete(`${url}/${id}`);
  return data;
};

const deleteGrade = async (Data) => {
  const {data} = await axios.delete(`${url}/grade/${Data.studentId}/${Data.gradeId}`)
  return data
}

export { getAllStudents, getStudentById, addStudent, updateStudent, updateGrade, deleteStudent, deleteGrade };
