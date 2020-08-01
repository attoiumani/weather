<template>
  <div id="app">
    <h1>
      <span>{{ $route.params.place }}</span>
    </h1>

    <v-row class="mb-4 text-left">
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <span class="display-3 font-weight-light">{{display[0].date}}  {{display[0].temp}}℃ <img v-bind:src="display[0].icon" /></span>
        <v-slider @click="test" v-model="slider[0].sliderNum" v-bind:tick-labels="slider[0].sliderlabel" v-bind:max="5"></v-slider>
      </v-col>
 
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <div  :key="week.id" v-for="week in weeks">
        {{week.date}} {{week.temp}}<img v-bind:src="week.icon" />
        </div>
      </v-col>

    <!--チェック用
        {{today[0].date}} {{today[0].temp}}<img v-bind:src="today[0].icon" />
        <div :key="hour.id" v-for="hour in hours">
        {{hour.date}}{{hour.hourtime}}{{hour.temp}}<img v-bind:src="hour.icon" />
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
      {temp:0,icon:null,date:null}
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
        {id:0,icon: null,date: null,temp: null},
        {id:1,icon: null,date: null,temp: null},
        {id:2,icon: null,date: null,temp: null},
        {id:3,icon: null,date: null,temp: null},
        {id:4,icon: null,date: null,temp: null},
        {id:5,icon: null,date: null,temp: null},
        {id:6,icon: null,date: null,temp: null},
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
        this.weeks[i].temp = response.data.daily[j].temp.day;
      }
      }.bind(this)
    );
  },

  methods: {
    test() {
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
