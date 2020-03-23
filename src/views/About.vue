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