<template>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4">
        <Tokyo/>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4">
        <Osaka/>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4">
        <Fukuoka/>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4">
        <Sapporo/>
      </v-col>
    </v-row>
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
