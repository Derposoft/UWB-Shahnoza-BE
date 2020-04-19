// requires
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const vision = require('@google-cloud/vision')
const googleSearcher = require('./src/google')
const amazonSearcher = require('./src/amazon')
const app = express()
const port = 80 //devel port

const upload = multer({ dest: "./temp/" })

// parse application/json, application/x-www-form-urlencoded
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

async function infer(res, fileName, callback) {
    const client = new vision.ImageAnnotatorClient()
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName)
    callback(res, result)
}
var pricefetch = async (res, result) => {
    // build url from which to scrape
    var query = ""
    var entities = result.webDetection.webEntities
    if (entities.length == 0)
        sendback("image match not found", 69)
        
    for (var i = 0; i < entities.length; i++)
        query += entities[i].description + " "
    // remove final space
    query = query.substr(0, query.length - 1)
    // get data from sites
    var googleHits = await googleSearcher.googleResults(query)
    //var amazonHits = await amazonSearcher.amazonResults(entities[0].description)
    /*var output;// = googleHits
    for (var i = 0; i < amazonHits.length; i++)
        output.push(amazonHits[i])*/
    // call final callback
    sendres(res, googleHits, 200)
}

// callback to send result
var sendres = (res, json, status) => {
    res.status = status
    res.send(JSON.stringify(json))
}

app.post('/upload',
    upload.single("image"),
    (req, res, next) => {
        fs.renameSync(req.file.path, path.join(__dirname + '/temp', req.file.originalname))
        const filepath = path.join(__dirname, "./temp/" + req.file.originalname)
        // get image inference
        infer(res, filepath, pricefetch, sendres)
    }
)

app.listen(port, () => {
    console.log('listening on port ' + port)
})
