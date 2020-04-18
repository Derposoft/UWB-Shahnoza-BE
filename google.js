const request = require('request')
const url = 'https://www.google.com/search?q=Bass+guitar+Electric+guitar+Acoustic+Guitar+Slide+guitar+Cuatro+Acoustic-electric+guitar+Tiple+Guitar+/m/083vt+Double+bass+Wood+steel-string+acoustic+guitar&sxsrf=ALeKk015ZqfOrkZQveUZPM3t1du9qsSQrg:1587172418214&source=lnms&tbm=shop&sa=X&ved=2ahUKEwiX-byB5vDoAhXJup4KHT8sBfIQ_AUoAXoECAsQAw&biw=1920&bih=977'

const url1 = 'https://www.google.com/search?q=Bass+guitar+Electric+guitar+Acoustic+Guitar+Slide+guitar+Cuatro+Acoustic-electric+guitar+Tiple+Guitar+/m/083vt+Double+bass+Wood+steel-string+acoustic+guitar&sxsrf=ALeKk039MsV8SyfUOeWotU-Rl_PKAdOlVw:1587191253494&source=lnms&sa=X&ved=0ahUKEwiPiuuWrPHoAhWW9Z4KHbu6AmsQ_AUIlgUoAA&biw=674&bih=1283'
request(url, function(error, response, body) {
    parseHtml(body);
})

parseHtml = (html) => {
    const cheerio = require('cheerio')
    const $ = cheerio.load(html)
//    console.log($.html())
//url: $(".HRLxBb").parent().parent().find("a").attr('href')
//
//    console.log($(".HRLxBb").parent().parent().contents().get(0))
var priceCheerio = $(".HRLxBb").contents()
var urlCheerio = $(".rgHvZc").contents()
var prices = []
var urls = []
var names = []
for (var i = 0; i < priceCheerio.length; i++) {
    prices.push(priceCheerio[i].data)
    urls.push(urlCheerio[i].attribs.href)
}
console.log(prices)
console.log(urls)
}


//const html = '<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>'
//const $ = cheerio.load(html)
//console.log(html)
//
//console.log($('li[class=orange]').html())

