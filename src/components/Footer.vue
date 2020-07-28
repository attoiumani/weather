<template>
  <div>
    <v-footer  color="primary" dark>
      <v-col class="text-center"> {{unix}} 
      </v-col>
    </v-footer>
  </div>
</template>


<script>


export default {
  data() {
    return {
      YMT: null,
      unix:null,
    };
  },
  created: function() {
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth()+1;
    let Today = now.getDate();
    this.YMT = Year+"/"+Month+"/"+Today;
    this.unix=new Date(1591866000 * 1000).toLocaleDateString('ja-JP').slice(5);
  }
};
</script>