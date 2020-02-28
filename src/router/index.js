import Vue from "vue";
import VueRouter from "vue-router";
import signup from "../views/signup.vue";
import signin from "../views/signin.vue";
import weather from "../views/weather.vue";
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
    path: "/weather",
    name: "weather",
    component: weather
  },
  {
    path: "/signup",
    name: "signup",
    component: signup
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/signin",
    name: "signin",
    component: signin
  }
];

const router = new VueRouter({
  routes,
//  mode: "history",
  //base: process.env.BASE_URL
});



export default router;
