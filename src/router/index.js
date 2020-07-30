import Vue from "vue";
import VueRouter from "vue-router";
import weather from "../views/weather.vue";
import about from "../views/about.vue";
import analytics from "../views/analytics.vue";
import firebase from 'firebase'



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "weather",
    component: weather,
    meta: { title: 'weatherMap' }
  },
  {
    path: "/about",
    name: "hoprofileme",
    component: about
  },
  {
    path: "/analytics",
    name: "analytics",
    component: analytics
  },
  /*{
    path: '/only',
    name: 'only',
    component: only,
    meta: { requiresAuth: true }
  },*/
  
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
