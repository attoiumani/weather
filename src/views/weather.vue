<template>
  <v-row>
    <v-container>
      <v-overflow-btn :items="dropdown" label="select & click!" segmented></v-overflow-btn>
    </v-container>
    <v-col :key="item.id" v-for="item in Items" cols="12" sm="12" md="6" lg="4" xl="4">
      <weather :place="item.place" @emit="parentMethod" />
    </v-col>
    <div>llllll{{Items[0].temp}}</div>
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
        { id: 1, place: "sapporo", temp: null },
        { id: 2, place: "sendai", temp: null },
        { id: 3, place: "tokyo", temp: null },
        { id: 4, place: "kanazawa", temp: null },
        { id: 5, place: "osaka", temp: null },
        { id: 6, place: "fukuoka", temp: null }
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
    parentMethod(payload) {
      this.Items[0].temp = payload;
      this.Items[1].temp = payload;
      this.Items[2].temp = payload;
      this.Items[3].temp = payload;
      this.Items[4].temp = payload;
      this.Items[5].temp = payload;
    }
  }
};
</script>
