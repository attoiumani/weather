<template>
  <div id="app">
    <h1>
      <span>{{ $route.params.place }}</span>
    </h1>

    <v-row>
      <v-col sm="6" md="6" lg="6" xl="6">
        <div class="mb-7">
        <p class="display-2 font-weight-light text-left ml-10">{{display[0].date}} </p><br>
        <p class="display-3 font-weight-light">{{display[0].temp}}℃ <img v-bind:src="display[0].icon" /></p>
        </div>
        <v-slider @click="clickmethod" v-model="slider[0].sliderNum" v-bind:tick-labels="slider[0].sliderlabel" v-bind:max="5"></v-slider>

        <div>
          <v-row class="pt-10">
            <v-col sm="6" md="6" lg="6" xl="6" :key="other.id" v-for="other in display[0].others">
              <span>{{other.type}}</span>：<span>{{other.data}}</span>
           </v-col>
         </v-row>
        </div>
      </v-col>
 
      <v-col sm="6" md="6" lg="6" xl="6">
        <div :key="week.id" v-for="week in weeks" class="text-left ml-15">
        {{week.date}}<span class="red--text pl-5">{{week.maxtemp}}</span><span class="blue--text pl-3">{{week.mintemp}}</span><img v-bind:src="week.icon" class="pl-3" />
        </div>
      </v-col>

    <!--チェック用
       <div>
          {{today[0].date}} {{today[0].temp}}<img v-bind:src="today[0].icon" />
       </div>
        <div :key="hour.id" v-for="hour in hours">
          {{hour.date}}  {{hour.hourtime}}  {{hour.temp}}<img v-bind:src="hour.icon" />
        </div>-->
  </v-row>

      <analyticsChart/>


  </div>
</template>

<script>
import axios from "axios";
import analyticsChart from "@/components/analyticsChart";




export default {
  components: {
analyticsChart
  },
  data() {
    return {

     display:[
      {temp:0,icon:null,date:null,
      others:[
        {id:0,type:"湿度",data:null},
        {id:1,type:"風速",data:null},
        {id:2,type:"UV指数",data:null},
        {id:3,type:"体感温度",data:null},
        {id:4,type:"日の入り",data:null},
        {id:5,type:"日の出",data:null},
        {id:5,type:"気圧",data:null},
        ]
        },
     ],

     slider:[
      {sliderlabel: [null],sliderNum: 0,sliderIcon:null,sliderDate:null,sliderTemp: 0}
     ],

      today: [
        {icon: null,date: null,temp: null},
      ],

      hours: [
         {id:0,slidekey:1,icon: null,date:null,hourtime: null,temp: null},
         {id:1,slidekey:2,icon: null,date:null,hourtime: null,temp: null},
         {id:2,slidekey:3,icon: null,date:null,hourtime: null,temp: null},
         {id:3,slidekey:4,icon: null,date:null,hourtime: null,temp: null},
         {id:4,slidekey:5,icon: null,date:null,hourtime: null,temp: null},
      ],

      weeks: [
        {id:0,icon: null,date: null,maxtemp: null,mintemp: null},
        {id:1,icon: null,date: null,maxtemp: null,mintemp: null},
        {id:2,icon: null,date: null,maxtemp: null,mintemp: null},
        {id:3,icon: null,date: null,maxtemp: null,mintemp: null},
        {id:4,icon: null,date: null,maxtemp: null,mintemp: null},
        {id:5,icon: null,date: null,maxtemp: null,mintemp: null},
        {id:6,icon: null,date: null,maxtemp: null,mintemp: null},
      ],

    };
  },
  created: function() {
  axios;
    let lat = this.$route.params.lat;
    let lon = this.$route.params.lon;
    let getKey = "appid=4dff50a83aa2145ba555d8f59e9d3ef0";
      axios.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&"+getKey).then(
      function (response) {
        this.today[0].icon ="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
        this.today[0].date = new Date(response.data.current.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.today[0].temp = response.data.current.temp;
        this.display[0].icon="https://openweathermap.org/img/w/" +response.data.current.weather[0].icon +".png";
        this.display[0].date=new Date(response.data.current.dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.display[0].temp=response.data.current.temp;
        this.display[0].others[0].data=response.data.current.humidity;
        this.display[0].others[1].data=response.data.current.wind_speed;
        this.display[0].others[2].data=response.data.current.uvi;
        this.display[0].others[3].data=response.data.current.feels_like;
        this.display[0].others[4].data=new Date(response.data.current.sunrise * 1000).toLocaleTimeString().slice(0,4);
        this.display[0].others[5].data=new Date(response.data.current.sunset * 1000).toLocaleTimeString().slice(0,5);
        this.display[0].others[6].data=response.data.current.pressure;

      for (let i = 0, k=1,j = 1 ; i < this.hours.length; i++,k++,j=j+2) {
        this.hours[i].icon = "https://openweathermap.org/img/w/" +response.data.hourly[j].weather[0].icon +".png";
        this.hours[i].date = new Date(response.data.hourly[j].dt * 1000).toLocaleDateString().slice(5);
        this.hours[i].hourtime = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
        this.hours[i].temp = response.data.hourly[j].temp;
        this.slider[0].sliderlabel[k] = new Date(response.data.hourly[j].dt * 1000).toLocaleTimeString().slice(0,5);
        this.slider[0].sliderlabel[0]="now"
      }

      for (let i = 0, j = 1 ; i < this.weeks.length; i++,j++) {
        this.weeks[i].icon = "https://openweathermap.org/img/w/" +response.data.daily[j].weather[0].icon +".png";
        this.weeks[i].date = new Date(response.data.daily[j].dt * 1000).toLocaleDateString("ja-JP").slice(5);
        this.weeks[i].maxtemp = response.data.daily[j].temp.max;
        this.weeks[i].mintemp = response.data.daily[j].temp.min;
      }
      }.bind(this)
    );
  },

  methods: {
    clickmethod() {
    for(let i=0;i<this.hours.length;i++){
      if(this.slider[0].sliderNum==this.hours[i].slidekey){
      this.slider[0].sliderTemp=this.hours[i].temp;
      this.slider[0].sliderIcon=this.hours[i].icon;
      this.slider[0].sliderDate=this.hours[i].date;
      }
     }
     if(this.slider[0].sliderNum==0){
       this.slider[0].sliderTemp=this.today[0].temp
       this.slider[0].sliderIcon=this.today[0].icon
       this.slider[0].sliderDate=this.today[0].date
     }
     this.display[0].temp=this.slider[0].sliderTemp
     this.display[0].icon=this.slider[0].sliderIcon
     this.display[0].date=this.slider[0].sliderDate
    }
  },
};
</script>
