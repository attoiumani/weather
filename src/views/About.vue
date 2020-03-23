<template>
<div>
  <v-sparkline
    :value="value"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
  ></v-sparkline>
   <div>{{ value }}</div>
</div>
</template>




<script>
import firebase from "firebase";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  data: () => {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false
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
          this.value.push(doc.data().temp);
        });
      });
  }
};
</script>