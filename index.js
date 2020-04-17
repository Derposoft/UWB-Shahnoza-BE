// imports
const express = require('express')
const fs = require('fs')
const vision = require('@google-cloud/vision')
const app = express()
const port = 3000 //devel port

app.route(express.static('views'))
app.use(express.urlencoded())

async function infer(fileName, callback) {
    const client = new vision.ImageAnnotatorClient()
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName)
    callback(result)
}

app.post('/upload', (req, res) => {
    var imgdata = req.body.image
    var filepath = __dirname + '/temp/' + req.body.name
    fs.appendFile(filepath, imgdata, () => res.end())
    // result sender
    var sendres = result => res.send(JSON.stringify(result))
    // get image inference
    infer(filepath, sendres)
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})
