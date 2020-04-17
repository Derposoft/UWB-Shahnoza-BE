async function quickstart(fileName) {
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// const fileName = 'Local image file, e.g. /path/to/image.png';

// Detect similar images on the web to a local file
const [result] = await client.webDetection(fileName);
const webDetection = result.webDetection;
console.log(webDetection.webEntities);
}

quickstart("./AAA.jpg");
//XD