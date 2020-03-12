import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.config.productionTip = false


const Config = {
  apiKey: "AIzaSyCz_q-qIm6TKBDi-w4Qf3cyFToKYb2-mT8",
  authDomain: "sample-3463a.firebaseapp.com",
  databaseURL: "https://sample-3463a.firebaseio.com",
  projectId: "sample-3463a",
  storageBucket: "sample-3463a.appspot.com",
  messagingSenderId: "748303189274",
  appId: "1:748303189274:web:78ec7c2d8ae358732558a3",
  measurementId: "G-D5498K3MP4"
};
firebase.initializeApp(Config);


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
