import Vue from "vue";
import VueRouter from "vue-router";
import signup from "../views/signup.vue";
import signin from "../views/signin.vue";
import weather from "../views/weather.vue";
import profile from "../views/profile.vue";
import chart from "../views/chart.vue";
import analytics from "../views/analytics.vue";
import only from "../views/only.vue";
import firebase from 'firebase'



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "weather",
    component: weather
  },
  {
    path: "/profile",
    name: "hoprofileme",
    component: profile
  },
  {
    path: "/signup",
    name: "signup",
    component: signup
  },
  {
    path: "/chart",
    name: "chart",
    component: chart,
  },
  {
    path: "/signin",
    name: "signin",
    component: signin
  },
  {
    path: "/analytics",
    name: "analytics",
    component: analytics
  },
  {
    path: '/only',
    name: 'only',
    component: only,
    meta: { requiresAuth: true }
  },
  
];

const router = new VueRouter({
  routes,
//  mode: "history",
  //base: process.env.BASE_URL
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    if (!currentUser) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router;
