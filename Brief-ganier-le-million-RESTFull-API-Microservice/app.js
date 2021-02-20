const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require("cors")


const app = express();
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// all routers
const authRouter = require('./routers/authRouter')
const participantRouter = require('./routers/participantRouter')


mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is connect'))
  .catch(err => console.log('not connect to the database'))

// all use URI
app.use('/api/', authRouter)
app.use('/api/participant', participantRouter)


// run server
const port = process.env.PORT || 3000;
app.listen(port, ()  => {
    console.log(`server is running in port: ${port}`)
})


module.exports = app