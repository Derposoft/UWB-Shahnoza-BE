// imports
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000 //devel port

app.route(express.static('views'))

app.post('/upload', (req, res) => {
    // save request image
    var body = ''
    req.on('data', data => {body += data})
    filePath = __dirname + '/temp/tempimg'
    req.on('end', () => fs.appendFile(filePath, body, () => res.end()))
    // get image inference
    var imageInformation = imgParser.getImageInfo(filepath)
    // get pricelist
    //var imagePrices = getImagePrices(imageInformation)
    // build response
    // (dummy response)
    res.send(JSON.stringify(imageInformation))
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})
