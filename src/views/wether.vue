<template>
  <v-app>
    <div class="text-center">
      {{this.city}}
      <br>
      <div>現在の温度</div>
      {{this.temp}}
      <br>
      <div>最高温度</div>
      {{this.temp_max}}
      <br>
      <div>最低温度</div>
      {{this.temp_min}}
      <br>
      <div>天気</div>
      {{this.condition.main}}
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    city: null,
    temp: null,
    temp_max: null,
    temp_min: null,
    condition: {
      main: null
    }
  }),
  mounted: function() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0"
      )
      .then(
        function(response) {
          this.city = response.data.name;
          this.temp = response.data.main.temp;
          this.temp_max = response.data.main.temp_max;
          this.temp_min = response.data.main.temp_min;
          this.condition = response.data.weather[0];
        }.bind(this)
      );
  }
};
</script>
