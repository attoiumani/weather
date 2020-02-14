import Vue from "vue";
import VueRouter from "vue-router";
import logo from "../views/logo.vue";
import wether from "../views/wether.vue";
import home from "../views/home.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/wether",
    name: "wether",
    component: wether
  },
  {
    path: "/logo",
    name: "logo",
    component: logo
  },
  {
    path: "/About",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  routes
});

export default router;
