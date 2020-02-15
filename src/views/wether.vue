<template>
  <v-app>
    <div class="text-center">
      <div v-show="dataOutputLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-show="!dataOutputLoading">
      {{dataOutputName}}
      </div>
      <br>
      <div>現在の温度</div>
      {{dataOutputTemp}}
      <br>
      <div>最高温度</div>
      {{dataOutputMaxTemp}}
      <br>
      <div>最低温度</div>
      {{dataOutputMinTemp}}
      <br>
      <div>天気</div>
      {{dataOutputCondition}}
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
  },
  dataOutputCondition() {
   return this.$store.getters.getStateDataSetCondition
 },
 dataOutputLoading() {
  return this.$store.getters.getStateDataSetLoading
 }
 },
  created() {
  this.$store.dispatch('commitDataSet')
 }
};
</script>
