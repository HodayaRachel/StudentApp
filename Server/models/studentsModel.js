const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Faculty: {type: String, required: true},
    Grades: [{
        Profession: { type: String, required: true },
        Score: { type: Number, required: true, min: 0, max: 100 }
    }]
}, {versionKey: false})

module.exports = mongoose.model('student', studentSchema)