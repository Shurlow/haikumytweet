const express = require('express')
const bodyParser = require('body-parser')
const morgan = require("morgan");
require('dotenv').config()

const port = process.env.PORT || 3001
const app = express()

app.use(bodyParser.json());
app.use(morgan('dev'))

app.use('/search', require('./routes.js'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
