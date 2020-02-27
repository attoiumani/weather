import Vue from "vue";
import VueRouter from "vue-router";
import singup from "../views/singup.vue";
import signin from "../views/signin.vue";
import wether from "../views/wether.vue";
import home from "../views/home.vue";
import About from "../views/About.vue";
import firebase from 'firebase'


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
    component: About,
    meta: { requiresAuth: true }
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



router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router;
