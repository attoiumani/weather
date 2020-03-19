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
    let Past = now.getDate() - 7;
    this.YMT = Year + "" + Month + "" + Today;
    this.OWB = Year + "" + Month + "" + Past;

    this.db = firebase.firestore();
    let collection = this.db.collection("kanazawa");
    let docRef = collection.where("YMT", "<", this.YMT);

    docRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          self.output = doc.data().temp;
        });
      });
  }
};
</script>









<template>
  <div>{{ allData }}</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      allData: []
    };
  },
  created() {
    this.db = firebase.firestore();

    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    this.Today = Year + "" + Month + "" + Today;
    this.db
      .collection("kanazawa")
      .where("Timestamp", "<", this.Today)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.allData.push(doc.data().temp);
        });
      });
  }
};
</script>