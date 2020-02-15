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


    <item-component v-for="(result, index) in results" :key="index"
    v-bind:id="result.title"
    v-bind:name="result.text">
    <div>{{result.text}}</div>
    {{result.title}}
  </item-component>

  </v-app>
</template>


<script>
export default {
   data() {
     return {
       drawer: false,
       results: [
         { title:"dataOutputName", text: "場所"},
         { title:"dataOutputTemp", text: "現在の温度"},
         { title:"dataOutputMaxTemp", text: "最高温度"}
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
