<template>
  <div>{{ output }}</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: null,
      output: null,
      YMT: null
    };
  },
  created: function() {
    let self = this;

    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    let Past = now.getDate()-7;
    this.YMT = Year + "" + Month + "" + Today;
    this.OWB = Year + "" + Month + "" + Past;


    this.db = firebase.firestore();
    let collection = this.db.collection("kanazawa");
    let docRef = collection.doc(this.YMT);

    docRef.get().then(function(doc) {
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