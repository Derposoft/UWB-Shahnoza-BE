// hello

const express = require('express')
const app = express()

app.route(express.static('views'))

