<template>
  <div>{{ output }}</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: null,
      output: null
    };
  },
  created: function() {
    let self = this;

    this.db = firebase.firestore();
    let collection = this.db.collection("kanazawa");
    let docRef = collection.doc("2020316");

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
};
</script>