<template>
  <v-row>
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
  }
};
</script>
