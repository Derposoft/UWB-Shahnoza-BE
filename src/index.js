// imports
const express = require('express')
const fs = require('fs')
const vision = require('@google-cloud/vision')
const app = express()
const port = 3000 //devel port



app.route(express.static('views'))
app.use(express.urlencoded())

async function infer(fileName, callback, sendback) {
    const client = new vision.ImageAnnotatorClient()
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName)
    callback(result, sendback)
}

var pricefetch = (result, sendback) => {
    // build url from which to scrape
    var query = ""
    var entities = Object.keys(result.webEntities)
    if (entities.length == 0)
        sendback("image match not found", 404)
        
    for (var key in Object.keys(webEntities))
        query += entities[key] + " "
    // remove final space
    query = query.substr(0, query.length - 1)
    var url = "https://www.google.com/search?psb=1&tbm=shop&q=" + query
    // get back html for the site
    
    // call final callback
    sendback(out)
}

app.post('/upload', (req, res) => {
    var imgdata = req.body.image
    fs.appendFile(filepath, imgdata, () => res.end())
    // callbacks
    var sendres = (result, status) => {
        res.status = status
        res.send(JSON.stringify(result))
    }
    // get image inference
    infer(filepath, pricefetch, sendres)
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})
