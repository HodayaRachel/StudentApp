const studentsModel = require("../models/studentsModel");

// get all students
async function getAllStudents() {
  const students = await studentsModel.find({});
  return students;
}

// get student by id
async function getStudentById(id) {
  const student = await studentsModel.findById(id);
  return student;
}

// add new student
async function addStudent(student) {
  const finalStudent = new studentsModel(student);
  await finalStudent.save();
  return "Created";
}

// update student by id
async function updateStudent(id, student) {
  await studentsModel.findByIdAndUpdate(id, student);
  return "Updated";
}

// delete student
async function deleteStudent(id) {
  await studentsModel.findByIdAndDelete(id);
  return "Deleted";
}

// delete student's grade by id
async function deleteGrade(studentId, gradeId) {
  const student = await getStudentById(studentId)
  const grades = student.Grades
  const newGrades = grades.filter(grade => grade._doc._id.toString() !== gradeId)
  const status = await updateStudent(studentId, {Grades: newGrades})
  return "Deleted Grade";
}

// update student's grade by id
async function updateGrade(studentId, gradeId, newGrade) {
    const student = await getStudentById(studentId)
    const grades = student.Grades
    const index = grades.findIndex(grade => grade._doc._id.toString() === gradeId)
    grades[index] = newGrade;
    const status = await updateStudent(studentId, {Grades: grades})
    console.log(status)
    return "Update Grade";
  }

module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, updateGrade, deleteStudent, deleteGrade };
