require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors')

const app = express()
app.enable('trust proxy')
app.use(morgan('common'))
app.use(express.json())
app.use(cors('*'))


app.get('/', async (req, res) => {
  res.json("Welcome")
})

app.get('/:number', async (req, res) => {
  var data = new FormData()
  data.append('tool', 'nombres-cisterciens')
  data.append('number', req.params.number)

  var config = {
    method: 'post',
    url: 'https://www.dcode.fr/api/',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(res.json(response.data))
  })
  .catch(function (error) {
    res.json(error)
  })
})

const port = process.env.PORT || 5225
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))