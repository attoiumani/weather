<template>
  <v-app>
    <TokyoW/>
    <OsakaW/>
  </v-app>
</template>


<script>
import TokyoW from "../components/Weather/TokyoW";
import OsakaW from "../components/Weather/OsakaW";

export default {
  components:{
      TokyoW,
      OsakaW
    },
};
</script>
