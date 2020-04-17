const vision = require('@google-cloud/vision')

async function infer(fn) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient()
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fn)
    return result
}

var getImageInfo = async (fn) => {
    infer(fn).catch(err => console.log(err))
}