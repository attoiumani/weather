<template>
  <v-app>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{dataOutputName}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0 text--primary">Now
      <div v-show="dataOutputLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-show="!dataOutputLoading">
        {{dataOutputTemp}}℃
      </div>
    </v-card-subtitle>
    <v-card-text>
      <div>Today's high temperature {{dataOutputMaxTemp}}℃</div>
      <div>Lowest Temperature {{dataOutputMinTemp}}℃</div>
      <div>The current weather {{dataOutputCondition}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text>
        Share
      </v-btn>
      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>



    <!--<div v-for="(result, index) in results" :key="index">
    <div>{{result.text}}</div>
    <div v-if="dataOutputLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="!dataOutputLoading">
    {{result.title}}
    </div>
  </div>-->
  </v-app>
</template>


<script>
export default {
   /*data() {
     return {
       results: [
         { title:this.$store.getters.getStateDataSetName, text: "場所"},
         { title:this.$store.getters.getStateDataSetTemp, text: "現在の温度"},
         { title:this.$store.getters.getStateDataSetMaxTemp, text: "最高温度"},
         { title:this.$store.getters.getStateDataSetMinTemp, text: "最低温度"},
         { title:this.$store.getters.getStateDataSetCondition, text: "天気"}
       ]
     };
   },*/
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
 created:function() {
 this.$store.dispatch('commitDataSet')
},
};
</script>
