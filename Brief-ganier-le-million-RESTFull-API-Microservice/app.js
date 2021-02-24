const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const logger = require('./logger')


const app = express();
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// all routers
const authRouter = require('./routers/authRouter')
const participantRouter = require('./routers/participantRouter')
const questionRouter = require('./routers/questionRouter')
const groupMemberRouter = require('./routers/group_memeberRouter')
const questionTokenRouter = require('./routers/question_tokenRouter')
const codeRouter = require('./routers/codeRouter')
const roundRouter = require('./routers/roundRouter')
const participantRoundRouter = require('./routers/participant_roundRouter')
const giftRouter = require('./routers/giftRouter')


mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => logger.error('db is connect'))
  .catch(err => logger.error('not connect to the database'))

// all use URI
app.use('/api/', authRouter)
app.use('/api/participant', participantRouter)
app.use('/api/question', questionRouter)
app.use('/api/groupMember', groupMemberRouter)
app.use('/api/questionToken', questionTokenRouter)
app.use('/api/code', codeRouter)
app.use('/api/round', roundRouter)
app.use('/api/participantRound', participantRoundRouter)
app.use('/api/gift', giftRouter)


// run server
const port = process.env.PORT || 3000;
app.listen(port, ()  => {
    logger.error(`server is running in port: ${port}`)
})


module.exports = app