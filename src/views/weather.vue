<template>
  <v-row>
    <div>
      <ul>
        <li>
          <button @click="sort(0)">0℃→1℃</button>
        </li>
        <li>
          <button @click="sort(1)">A→Z</button>
        </li>
        <li>
          <button @click="sort(2)">N→S</button>
        </li>
      </ul>
    </div>
    <v-col :key="item.id" v-for="item in Items" cols="12" sm="12" md="6" lg="4" xl="4">
      <weather :place="item.place" />
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
        { id: 1, place: "sapporo" },
        { id: 2, place: "sendai" },
        { id: 3, place: "tokyo" },
        { id: 4, place: "kanazawa" },
        { id: 5, place: "osaka" },
        { id: 6, place: "fukuoka" }
      ]
    };
  },
  methods: {
    sort(index) {
      switch (index) {
        case 0:
          this.Items.sort(function(a, b) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          break;
        case 1:
          this.Items.sort(function(a, b) {
            if (a.place < b.place) return -1;
            if (a.place > b.place) return 1;
            return 0;
          });
          break;
        case 2:
          this.sortItems.sort(function(a, b) {
            if (a.age < b.age) return -1;
            if (a.age > b.age) return 1;
            return 0;
          });
          break;
        default:
      }
    }
  }
};
</script>
