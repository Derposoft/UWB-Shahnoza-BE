async function urlData(url) {
    parseHtml = html => {
        const cheerio = require('cheerio')
        const $ = cheerio.load(html)
        var priceCheerio = $(".HRLxBb").contents()
        var urlCheerio = $(".rgHvZc").contents()
        var nameCheerio = $(".rgHvZc")
        var imgCheerio = $(".rgHvZc").parent().parent().find("img")
        var out = []
        for (var i = 0; i < priceCheerio.length; i++) {
            out.push({name: nameCheerio.eq(i).text(), price: priceCheerio[i].data, url: "https://www.google.com" + urlCheerio[i].attribs.href, imgsrc: imgCheerio[i].attribs.src})
        }
        return out;
    }

    const axios = require('axios')
    var reqData = axios.get(url).then(resp => parseHtml(resp.data))
    return reqData
}

const searchUrl = "https://www.google.com/search?psb=1&tbm=shop&q="
var googleResults = async query => {
    return await urlData(searchUrl + query)
}

exports.googleResults = googleResults
