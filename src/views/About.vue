<template>
  <div>{{ output }}</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: null,
      output: ""
    };
  },
  created: function() {
    // この先にあるthenでthisの参照が切れるのでselfに退避させておく

    this.db = firebase.firestore();
    // 直前に保存したデータを1件取得してくる
    let self = this;
    let collection = this.db.collection("sapporo");
    let docRef = collection.doc("aaa");

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          self.output = doc.data().temp;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },

  methods: {},
  computed: {}
};
</script>