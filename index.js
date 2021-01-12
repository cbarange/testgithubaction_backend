require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const axios = require('axios');
const FormData = require('form-data');


const app = express()
app.enable('trust proxy')
app.use(morgan('common'))
app.use(express.json())

app.get('/:number', async (req, res) => {
  console.log(req.params.number)

  var data = new FormData();
  data.append('tool', 'nombres-cisterciens');
  data.append('number', req.params.number);

  var config = {
    method: 'post',
    url: 'https://www.dcode.fr/api/',
    headers: { 
      'Cookie': 'PHPSESSID=e5b3d1fbee076ebaba4a3cc1c558baa1', 
      ...data.getHeaders()
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(res.json(response.data));
  })
  .catch(function (error) {
    res.json(error)
  })

  
})

const port = process.env.PORT || 5225
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))