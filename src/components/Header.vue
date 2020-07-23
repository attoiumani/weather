<template>
  <div>
    <v-navigation-drawer v-model="drawer" expand-on-hover clipped app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#f0ffff" flat clipped-left hide-on-scroll app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Weather Map</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-toolbar-items>
        <v-btn text to="/signin">Login</v-btn>
        <v-btn @click="signOut" text>Logout</v-btn>
      </v-toolbar-items>-->
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      items: [
        { title: "about", path: "/about", icon: "mdi-home-variant" },
        { title: "weather", path: "/", icon: "mdi-weather-pouring" },
        { title: "chart", path: "/chart", icon: "mdi-ab-testing" },
        //{ title: "only", path: "/only", icon: "mdi-account-lock" }
      ]
    };
  },
  methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>
