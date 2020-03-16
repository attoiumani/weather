<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <Sapporo />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="sendai" />
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="tokyo" />
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
import Sapporo from "@/components/Weather/Sapporo";// Spporo is Special!!
import weather from "@/components/weather";

export default {
  components: {
    Sapporo,
    weather
  }
};
</script>
