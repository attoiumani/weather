<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <Sapporo />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="sendai" />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <Tokyo />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="kanazawa" />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="osaka" />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="fukuoka" />
    </v-col>
  </v-row>
</template>


<script>
import Tokyo from "../components/Weather/Tokyo"; //Tokyo and Spporo is Special
import Sapporo from "../components/Weather/Sapporo";
import weather from "../components/weather";

export default {
  components: {
    Tokyo,
    Sapporo,
    weather
  }
};
</script>
