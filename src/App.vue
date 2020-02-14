<template>
  <v-app>
    <div>
      <Header/>
      <div class="text-center" id="nav">
        <router-link to="/logo">logoo</router-link>|
        <router-link to="/wether">Wether</router-link>|
        <router-link to="/">Home</router-link>|
        <router-link to="/About">about</router-link>
      </div>
      <v-content>
        <v-container> 
      <router-view/>
      </v-container>
      </v-content>
      <Footer/>
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components:{
    Header,
    Footer
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



