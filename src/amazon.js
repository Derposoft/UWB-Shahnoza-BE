const axios = require('axios')
const cheerio = require('cheerio')

//const url = 'https://www.google.com/search?q=Bass+guitar+Electric+guitar+Acoustic+Guitar+Slide+guitar+Cuatro+Acoustic-electric+guitar+Tiple+Guitar+/m/083vt+Double+bass+Wood+steel-string+acoustic+guitar&sxsrf=ALeKk015ZqfOrkZQveUZPM3t1du9qsSQrg:1587172418214&source=lnms&tbm=shop&sa=X&ved=2ahUKEwiX-byB5vDoAhXJup4KHT8sBfIQ_AUoAXoECAsQAw&biw=1920&bih=977'
//const url2 = 'https://www.amazon.com/s?k=Bass+guitar+Electric+guitar+Acoustic+Guitar+Slide+guitar+Cuatro+Acoustic-electric+guitar+Tiple+Guitar+%2Fm%2F083vt+Double+bass+Wood+steel-string+acoustic+guitar&ref=nb_sb_noss'
const domain = "http://www.amazon.com"
const searchUrl = "http://www.amazon.com/s?k="
var config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,es;q=0.8,ja;q=0.7,te;q=0.6',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    }
}

var parseHtml = (html) => {
    const $ = cheerio.load(html)

    var names = []
    var urls = []
    var prices = []
    var imgs = []
    // get names, urls, prices
    $('div.s-expand-height.s-include-content-margin.s-border-bottom.s-latency-cf-section')
        .children('div.a-section.a-spacing-medium')
        .children('div.a-section.a-spacing-none.a-spacing-top-small')
        .children('h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-4')
        .children('a.a-link-normal.a-text-normal')
        .children('span.a-size-base-plus.a-color-base.a-text-normal')//.children()
        .each((i, element) => {
            var validityTester = element.parent.parent.parent.parent.children.length
            if (validityTester == 13) {
                console.log("HIT")
                try {
                    names.push(element.children[0].data)
                    urls.push(domain + element.parent.attribs.href)
                    var priceElement = element.parent.parent.parent.parent.children[9]
                    var price = priceElement.children[1].children[0].children[1].children[1].children[0].children[0].data
                    prices.push(price)
                    var imgElement = element.parent.parent.parent.parent.children[3]
                    var imgsrc = imgElement.children[1].children[1].children[1].attribs.src
                    imgs.push(imgsrc)
                    console.log(imgsrc)
                } catch {
                    // do nothing if it doesn't match our format. too much work!
                }
            }
        })

    var out = []
    for (var i = 0; i < names.length; i++) {
        out.push({
            name: names[i],
            url: urls[i],
            price: prices[i],
            imgsrc: imgs[i]
        })
    }
    console.log(out)

    //console.log(html)
    return out
}

var amazonResults = async query => {
    console.log(searchUrl + query)
    return await axios.get(searchUrl + query, config).then(resp => parseHtml(resp.data))
}

exports.amazonResults = amazonResults
