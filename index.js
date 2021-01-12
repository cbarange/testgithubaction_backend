require('dotenv').config()

const express = require('express')
const morgan = require('morgan')



const app = express()
app.enable('trust proxy')
app.use(morgan('common'))
app.use(express.json())

app.get('/', async (req, res) => {
  res.json("HELP")
})

const port = process.env.PORT || 5225
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))