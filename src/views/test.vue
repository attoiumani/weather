prepend や append の slots を使用すれば、v-slider をどんな場所にも合うように簡単にカスタマイズできます。

<template>
  <div>
    <v-toolbar flat dense>
      <v-toolbar-title>
        <span class="subheading">作成中</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-row class="mb-4" justify="space-between">
      <v-col class="text-left">
        <span class="display-3 font-weight-light" v-text="bpm"></span>
        <span class="subheading font-weight-light mr-1">BPM</span>
      </v-col>
    </v-row>
    <v-slider v-model="bpm" :color="color" track-color="grey" always-dirty min="40" :max="100"></v-slider>

    <v-row class="mb-4" justify="space-between">
      <v-col class="text-left">
        <span class="display-3 font-weight-light">{{fruits}}</span>
      </v-col>
    </v-row>
    <v-slider
      v-model="fruits"
      :tick-labels="ticksLabels"
      :max="20"
      step="1"
      ticks="always"
    ></v-slider>

  </div>
</template>



<script>
export default {
  data() {
    return {
    slider: 45,
    ticksLabels: ["Figs", "Lemon", "Pear", "Apple", "test"],
    bpm: 40,
    fruits: 5,
  }
  },

};
</script>