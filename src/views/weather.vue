<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
      <weather place="sapporo" />
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

import weather from "@/components/weather";

export default {
  components: {
    weather
  }
};
</script>
