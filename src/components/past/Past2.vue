firebase functions

<script>


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.clearoffers = functions.pubsub.schedule('30 12 * * *')
  .timeZone('Asia/Tokyo').onRun(async (context) => {


      firebase
        .firestore()
        .collection(this.place) //props
        .doc(this.Timestamp)  //tody
        .set({
          temp: this.temp,
          maxtemp: this.maxtemp,
          mintemp: this.mintemp,
          Timestamp: this.Timestamp,
          Timestamp2: this.Timestamp2
        })
        .then(function(docRef) {
          // 正常にデータ保存できた時の処理
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          // エラー発生時の処理
          console.error("Error adding document: ", error);
        });
 

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


  created: function() {
    axios;


    let selectedCity = this.place; //props
    let getUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    let getKey = ",jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0";
    let Url = getUrl + selectedCity + getKey;
    return axios.get(Url).then(
      function(response) {
        this.city = response.data.name;
        this.temp = response.data.main.temp;
        this.maxtemp = response.data.main.temp_max;
        this.mintemp = response.data.main.temp_min;
        this.condition = response.data.weather[0];
        this.icon =
          "https://openweathermap.org/img/w/" +
          response.data.weather[0].icon +
          ".png";
        this.loading = false;
      }.bind(this)
    );
  },



const http = require('http')
const fs = require('fs')
const request = require('request')
const axios = require('axios');
const ctype = {'Content-Type': 'text/html;charset=utf-8'}

//APIの実行
async function getData() {
  const url = 'http://aikatsup.com/api/v1/search'
  return await axios.get(url, {
    params: {
      id: 3144
    }
  })
}

//画像の保存
function outPutImg(data) {
  request(data.image.url).pipe(fs.createWriteStream('img/' +data.id+ '_' +data.words+ '.jpg'))
}

function handler (req, res) {
  res.writeHead(200, ctype)

  getData().then((data) => {
    data = data.data.item
    outPutImg(data)
    resData = '<h1>' +data.id+ '_' + data.words + '</h1><img src=\"' +data.image.url+ '\" width=\"960\">'
    res.end(resData)
  }).catch(() => {
    resData = 'api通信失敗'
    res.end(resData)
  })
}

const svr = http.createServer(handler)
console.log('http://localhost:8000')
svr.listen(8000)

  </script>>
