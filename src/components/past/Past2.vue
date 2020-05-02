firebase functions

<script>


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


  created: function() {
    axios;
    let m = moment();
    let Year = m.format('YYYY');
    let Month = m.format('MM');
    let day = m.format('DD');
    this.Timestamp = Year + "" + Month + "" + day;
    this.Timestamp2 = Year + "/" + Month + "/" + day;

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


  </script>>
