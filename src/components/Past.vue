<template>
  <div>{{ output }}</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      output: [],
      YMT: null
    };
  },
  created: function() {
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    let Past = now.getDate() - 7;
    this.YMT = Year + "" + Month + "" + Today;
    this.OWB = Year + "" + Month + "" + Past;

    firebase
      .firestore()
      .collection("kanazawa")
      .where("YMT", "=>", this.QWB)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.output.push(doc.data().temp);
        });
      });
  }
};



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
  }
};
</script>