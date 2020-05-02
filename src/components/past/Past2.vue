firebase functions



const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.clearoffers = functions.pubsub.schedule('30 12 * * *')
  .timeZone('Asia/Tokyo').onRun(async (context) => {
    const r = await admin.firestore().collection('offers').listDocuments().then(val => {
      val.map((val) => {
        val.delete()
      })
    })
  });



const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')
const request = require('request')
const axios = require('axios')
const ctype = {'Content-Type': 'text/html;charset=utf-8'}

async function getData(id) {
  const api = 'http://aikatsup.com/api/v1/search'
  return await axios.get(api, {
    params: {
      id: id
    }
  })
}

function outPutImg(data) {
  request(data.image.url).pipe(fs.createWriteStream('img/' +data.id+ '_' +data.words+ '.jpg'))
}

function handler (req, res) {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(__dirname + '/index.html', {
      encoding: 'utf8'
    },
    function(err, html) {
      if (err) {
        res.statusCode = 500
        res.end('Error!')
      } else {
        res.writeHead(200, ctype)
        res.end(html)
      }
    });
  } else if (req.url.indexOf('/getData?') == 0 && req.method === 'GET') {
    res.writeHead(200, ctype)
    const id = url.parse(req.url, true).query.id;

    getData(id).then((data) => {
      data = data.data.item
      outPutImg(data)
      resData = '<h1>'+ data.words +'</h1><img src=\"'+ data.image.url +'\" width=\"960\">'
      res.end(resData);
    }).catch(() => {
      resData = 'api通信失敗'
      res.end(resData)
    })

  } else {
    res.statusCode = 404;
    res.end('NotFound')
  }
}

const svr = http.createServer(handler)
console.log('http://localhost:8000')
svr.listen(8000)