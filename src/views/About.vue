<template>
  <div>{{ allData }}</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: null,
      allData: null
    };
  },
  created: function() {
    // この先にあるthenでthisの参照が切れるのでselfに退避させておく

    this.db = firebase.firestore();
    // 直前に保存したデータを1件取得してくる
    let collection = this.db.collection("sapporo");
    let docRef = collection.doc("aaa");
    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log(doc.data().temp);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });


              firebase.firestore().collection("sapporo").get().then(snapshot => {
          snapshot.forEach(doc => {
            this.allData.push(doc.data().temp)
          })
        })
  },

  methods: {},
  computed: {}
};
</script>