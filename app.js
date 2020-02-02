require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { NODE_ENV, API_TOKEN } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'combined';

app
  .use(morgan(morganOption))
  .use(helmet())
  .use(cors())
  .use(express.json())

app.use(function validateBearerToken(req, res, next) {
  const apiToken = API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next() // move to the next middleware
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
    } else {
      response = { message: error.message, error }
  }
  res.status(500).json(response)
})

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app