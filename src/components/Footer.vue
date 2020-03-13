<template>
  <div>
    <v-footer color="primary" dark>
      <v-col class="text-center">
        {{YMT}} —
        <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      today: null
    };
  },
  created: function() {
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth()+1;
    let Today = now.getDate();
    this.YMT = Year+"/"+Month+"/"+Today;
  }
};
</script>