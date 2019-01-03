import express from 'express'
import bodyParser from 'body-parser'

const app = express()

const csvRouter = require('./routes/readCSV')

app.use(bodyParser.json())
app.use('/', csvRouter)
app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(3000 || process.env.PORT, () => console.log("app is running"))

module.exports = app
