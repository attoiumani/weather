<template>
  <v-row>
    <v-container>
      <v-overflow-btn :items="dropdown" label="select & click!" segmented></v-overflow-btn>
    </v-container>
    <v-col :key="item.id" v-for="item in Items" cols="12" sm="12" md="6" lg="4" xl="4">
      <weather :place="item.place" @emit="parentMethod" />
    </v-col>
  </v-row>
</template>


<script>
import weather from "@/components/weather";

export default {
  components: {
    weather
  },
  data() {
    return {
      Items: [
        { id: 1, place: "hokkaido", temp: null },
        { id: 2, place: "aomori", temp: null },
        { id: 3, place: "sendai", temp: null },
        { id: 4, place: "tokyo", temp: null },
        { id: 5, place: "kanazawa", temp: null },
        { id: 6, place: "osaka", temp: null },
        { id: 7, place: "fukuoka", temp: null }
      ],
      dropdown: [
        {
          text: "N→S",
          callback: () =>
            this.Items.sort(function(a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            })
        },
        {
          text: "A→Z",
          callback: () =>
            this.Items.sort(function(a, b) {
              if (a.place < b.place) return -1;
              if (a.place > b.place) return 1;
              return 0;
            })
        },
        {
          text: "0℃→1℃",
          callback: () =>
            this.Items.sort(function(a, b) {
              if (a.temp < b.temp) return -1;
              if (a.temp > b.temp) return 1;
              return 0;
            })
        }
      ]
    };
  },
  methods: {
    parentMethod(temp, place) {
      for (let i = 0; i < this.Items.length; i++) {
        if (this.Items[i].place == place) {
          this.Items[i].temp = temp;
        }
      }
    }
  }
};
</script>
