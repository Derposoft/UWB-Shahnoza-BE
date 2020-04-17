const vision = require('@google-cloud/vision')

var getImageInfo = (fn) => {
    async function infer(fn) {
        // Creates a client
        const client = new vision.ImageAnnotatorClient()
        // Detect similar images on the web to a local file
        const [result] = await client.webDetection(fn)
        return result
    }

    infer(fn)
}
var getImagePrices = (imgInfo) => {

}