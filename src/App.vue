<template>
  <v-app>
    <Header/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <!--<Footer/>-->
  </v-app>
</template>

<script>
import Header from "@/components/Header";
//import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    //Footer
    //hyde
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
