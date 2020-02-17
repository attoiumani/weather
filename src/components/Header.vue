<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark clipped-left app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", path: "/", icon: "mdi-stack-overflow" },
        { title: "wether", path: "/wether", icon: "mdi-vuetify" },
        { title: "logo", path: "/logo", icon: "mdi-github-face" }
      ]
    };
  }
};
</script>
