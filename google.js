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

const myurl = "https://www.google.com/search?q=Bass+guitar+Electric+guitar+Acoustic+Guitar+Slide+guitar+Cuatro+Acoustic-electric+guitar+Tiple+Guitar+/m/083vt+Double+bass+Wood+steel-string+acoustic+guitar&sxsrf=ALeKk015ZqfOrkZQveUZPM3t1du9qsSQrg:1587172418214&source=lnms&tbm=shop&sa=X&ved=2ahUKEwiX-byB5vDoAhXJup4KHT8sBfIQ_AUoAXoECAsQAw&biw=1920&bih=977"
var out = urlData(myurl).then(res => console.log(res))