<template>
  <div>
    <v-footer  color="primary" dark>
      <v-col class="text-center"> {{test}} 
      </v-col>
    </v-footer>
  </div>
</template>


<script>


export default {
  data() {
    return {
      YMT: null,
      tst:null,
      test:null
      
    };
  },
  created: function() {
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth()+1;
    let Today = now.getDate();
    this.YMT = Year+"/"+Month+"/"+Today;
    this.tst=new Date(1591866000 * 1000);
    this.test=this.tst.toLocaleDateString('ja-JP').slice(5);
  }
};
</script>