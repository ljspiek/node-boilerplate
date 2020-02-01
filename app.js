require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app
  .use(morgan(morganOption))
  .use(helmet())
  .use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app