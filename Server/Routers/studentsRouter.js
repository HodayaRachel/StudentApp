const express = require('express')
const router = express.Router()
const studentsBLL = require('../BLL/studentsBLL')

router.get('/', async(req, res) => {
    const students = await studentsBLL.getAllStudents()
    return res.status(200).json({students: students})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const student = await studentsBLL.getStudentById(id)
    return res.status(200).json({student: student})
})

router.post('/', async(req, res) => {
    try {
        const student = req.body
        const status = await studentsBLL.addStudent(student)
        return res.status(201).json({msg: status})
    } catch (err) {
        return res.status(400).json({msg: 'Error', error: err})
    }

})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const student = req.body
    const status = await studentsBLL.updateStudent(id, student)
    return res.status(200).json({msg: status})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const status = await studentsBLL.deleteStudent(id)
    return res.status(200).json({msg: status})
})

router.put('/grade/:studenId/:gradeId', async(req, res) => {
    const studenId = req.params.studenId
    const gradeId = req.params.gradeId
    const grade = req.body
    const status = await studentsBLL.updateGrade(studenId, gradeId, grade)
    return res.status(200).json({msg: status})
})

router.delete('/grade/:studenId/:gradeId', async(req, res) => {
    const studenId = req.params.studenId
    const gradeId = req.params.gradeId
    const status = await studentsBLL.deleteGrade(studenId, gradeId)
    return res.status(200).json({msg: status})
})

module.exports = router