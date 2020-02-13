<template>
  <v-app>
    <div class="text-center">
      {{dataOutputName}}
      <br>
      <div>現在の温度</div>
      {{dataOutputTemp}}
      <br>
      <div>最高温度</div>
      {{dataOutputMaxTemp}}
      <br>
      <div>最低温度</div>
      {{dataOutputMinTemp}}
    </div>
  </v-app>
</template>


<script>
export default {
 computed: {
  dataOutputName() {
   return this.$store.getters.getStateDataSetName
  },
  dataOutputTemp() {
   return this.$store.getters.getStateDataSetTemp
  },
  dataOutputMaxTemp() {
   return this.$store.getters.getStateDataSetMaxTemp
  },
  dataOutputMinTemp() {
   return this.$store.getters.getStateDataSetMinTemp
  }
 },
  created() {
  this.$store.dispatch('commitDataSet')
 }
};
</script>
