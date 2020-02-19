<template>
  <v-app>
    <TokyoW/>
    <OsakaW/>
  </v-app>
</template>


<script>
import TokyoW from "../components/TokyoW";
import OsakaW from "../components/OsakaW";

export default {
  components:{
      TokyoW,
      OsakaW
    },
};
</script>
