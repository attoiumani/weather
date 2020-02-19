<template>
  <v-app>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6" xl="12">
        <Tokyo/>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="12">
        <Osaka/>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="12">
        <Fukuoka/>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="12">
        <Sapporo/>
      </v-col>
    </v-row>
  </v-app>
</template>


<script>
import Tokyo from "../components/Weather/Tokyo";
import Osaka from "../components/Weather/Osaka";
import Fukuoka from "../components/Weather/Fukuoka";
import Sapporo from "../components/Weather/Sapporo";

export default {
  components: {
    Tokyo,
    Osaka,
    Fukuoka,
    Sapporo
  }
};
</script>
