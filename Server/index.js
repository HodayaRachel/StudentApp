const express = require('express')
const cors = require('cors')

const app = express()
const port = 8000

// connection DB
require('./config/database')

app.use(express.json())
app.use(cors())


// Routers
const studentsRouter = require('./Routers/studentsRouter')

app.use('/students', studentsRouter)


app.listen(port, () => {
    console.log(`server is listening port ${port}`);
})
