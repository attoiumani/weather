<template>
<div>
    <v-navigation-drawer v-model="drawer" expand-on-hover clipped app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
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

    <v-app-bar color="primary" dark clipped-left collapse-on-scroll app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", path: "/", icon: "mdi-home-variant" },
        { title: "wether", path: "/wether", icon: "mdi-weather-pouring" },
        { title: "About", path: "/About", icon: "mdi-github-face" },
        { title: "Sign Up", path: "/singup", icon: "mdi-lock-open-variant-outline" },
      ]
    };
  }
};
</script>
