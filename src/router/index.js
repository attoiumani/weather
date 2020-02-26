import Vue from "vue";
import VueRouter from "vue-router";
import singup from "../views/singup.vue";
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
    path: "/singup",
    name: "singup",
    component: singup
  },
  {
    path: "/About",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  routes,
//  mode: "history",
  //base: process.env.BASE_URL
});

export default router;
