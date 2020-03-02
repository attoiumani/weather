<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="300px" :src="image_src">
      <v-card-title>{{dataOutputName}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0 text--primary">
    <img v-bind:src="dataOutputicon">
      <div v-show="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-show="!dataOutputLoading">{{dataOutputTemp}}℃</div> 
    </v-card-subtitle>
    <v-card-text>
      <div>Today's high temperature {{dataOutputMaxTemp}}℃</div>
      <div>Lowest Temperature {{dataOutputMinTemp}}℃</div>
      <div>The current weather {{dataOutputCondition}}</div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
         <v-btn @click="twitterShare" text>Share
          <v-icon color="blue">mdi-twitter</v-icon>
        </v-btn>
      </div>
    </v-expand-transition>
  </v-card>
</template>



<script>
export default {
  data() {
    return {
    image_src: require("../../assets/tokyo.png"),
    show: false,
  }
},
  computed: {
    dataOutputName() {
      return this.$store.getters.getStateDataSetName;
    },
    dataOutputTemp() {
      return this.$store.getters.getStateDataSetTemp;
    },
    dataOutputMaxTemp() {
      return this.$store.getters.getStateDataSetMaxTemp;
    },
    dataOutputMinTemp() {
      return this.$store.getters.getStateDataSetMinTemp;
    },
    dataOutputCondition() {
      return this.$store.getters.getStateDataSetCondition;
    },
    dataOutputLoading() {
      return this.$store.getters.getStateDataSetLoading;
    },
    dataOutputicon() {
      return this.$store.getters.getStateDataSeticon;
    }
  },
  mounted: function() {
    this.$store.dispatch("commitDataSet","Tokyo");
  },
    methods: {
    twitterShare() {
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +this.dataOutputName + this.dataOutputTemp +"%20%23今の温度";
      //シェア用の画面へ移行
      location.href = shareURL;
    }
  }
  };
</script>
