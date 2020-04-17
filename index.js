// imports
import('./src/imgParsing.js')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000 //devel port

app.route(express.static('views'))

app.get('/upload', (req, res) => {
    var body = ''
    filePath = __dirname + '/public/data.txt'
    request.on('data', function (data) {
        body += data
    });

    request.on('end', function () {
        fs.appendFile(filePath, body, function () {
            respond.end()
        })
    })
    // imageInformation: [[o1name, o1x, o1y], [o2name, o2x, o2y], ...]
    var imageInformation = getImageInfo(req)
    // imagePrices: [[o1name, o1x, o1y, o1price], [o2name, o2x, o2y, o2price], ...]
    var imagePrices = getImagePrices(imageInformation)
    // build response
    // (dummy response)
    res.send('you have called the image upload api endpoint!')
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})
