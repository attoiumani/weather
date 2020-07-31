prepend や append の slots を使用すれば、v-slider をどんな場所にも合うように簡単にカスタマイズできます。

<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title>
        <span class="subheading">METRONOME</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
      <v-row
        class="mb-4"
        justify="space-between"
      >
        <v-col class="text-left">
          <span
            class="display-3 font-weight-light"
            v-text="bpm"
          ></span>
          <span class="subheading font-weight-light mr-1">BPM</span>
        </v-col>

      </v-row>

      <v-slider
        v-model="bpm"
        :color="color"
        track-color="grey"
        always-dirty
        min="40"
        max="218"
      >

      </v-slider>
    </v-card-text>
  </v-card>
</template>



<script>
  export default {
    data: () => ({
      bpm: 40,
      interval: null,
      isPlaying: false,
    }),

    computed: {
      color () {
        if (this.bpm < 100) return 'indigo'
        if (this.bpm < 125) return 'teal'
        if (this.bpm < 140) return 'green'
        if (this.bpm < 175) return 'orange'
        return 'red'
      },
      animationDuration () {
        return `${60 / this.bpm}s`
      },
    },

    methods: {
      decrement () {
        this.bpm--
      },
      increment () {
        this.bpm++
      },
      toggle () {
        this.isPlaying = !this.isPlaying
      },
    },
  }
</script>