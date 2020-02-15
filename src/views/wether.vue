<template>
  <v-app>
    <div class="text-center">
      <div v-show="dataOutputLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-show="!dataOutputLoading">
      {{dataOutputName}}
      </div>
      <div>現在の温度</div>
      {{dataOutputTemp}}
      <div>最高温度</div>
      {{dataOutputMaxTemp}}
      <div>最低温度</div>
      {{dataOutputMinTemp}}
      <div>天気</div>
      {{dataOutputCondition}}
    </div>


    <item-component v-for="(result, index) in results" :key="index">
    <div>{{result.text}}</div>
    <div v-show="dataOutputLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-show="!dataOutputLoading">
    {{result.title}}
    </div>
  </item-component>

  </v-app>
</template>


<script>
export default {
   data() {
     return {
       drawer: false,
       results: [
         { title:this.$store.state.dataSetName, text: "場所"},
         { title:this.$store.getters.getStateDataSetTemp, text: "現在の温度"},
         { title:this.$store.getters.getStateDataSetMaxTemp, text: "最高温度"},
         { title:this.$store.getters.getStateDataSetMinTemp, text: "最低温度"},
         { title:this.$store.getters.getStateDataSetCondition, text: "天気"}
       ]
     };
   },
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
};
</script>
