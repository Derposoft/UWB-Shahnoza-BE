// imports
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const vision = require('@google-cloud/vision')
//const cors = require('cors')
const app = express()
const port = 8081 //devel port

const handleError = (err, res) => {
    res.status(500).contentType("text/plain").end("Oops! Something went wrong!")
}
const upload = multer({ dest: "./temp/" })

// parse application/json, application/x-www-form-urlencoded
//app.use(cors())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./views'))
//app.get("/", express.static(path.join(__dirname, "./views")));

async function infer(fileName, callback) {
    const client = new vision.ImageAnnotatorClient()
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName)
    callback(result)
}
var pricefetch = (result) => {
    // build url from which to scrape
    var query = ""
    var entities =result.webEntities
    if (entities.length == 0)
        sendback("image match not found", 500)
        
    for (var i = 0; i < entities.length; i++)
        query += entities[key] + " "
    // remove final space
    query = query.substr(0, query.length - 1)
    var url = "https://www.google.com/search?psb=1&tbm=shop&q=" + query
    // get back html for the site
    
    // call final callback
    sendres(JSON.stringify(result), 200)
}

// callback to send result
var sendres = (result, status) => {
    res.status = status
    res.send(JSON.stringify(result))
}

app.post('/upload',
    upload.single("object"),
    (req, res, next) => {
        console.log("FILE:" + req.file)
        fs.renameSync(req.file.path, path.join(__dirname, "test.png"))//req.body.name))
        
        const filepath = path.join(__dirname, "./temp/" + req.body.name)
        // get image inference
        infer(filepath, pricefetch, sendres)
    }
)

app.listen(port, () => {
    console.log('listening on port ' + port)
})
