// hello

const express = require('express')
const app = express()
const port = 3000 //devel port

app.route(express.static('views'))

app.listen(port, () => {
    console.log('listening on port ' + port)
})
