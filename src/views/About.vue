<template>
  <div>
    {{ allData }}
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      allData: [],
    }
  },
  created() {
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth() + 1;
    let Today = now.getDate();
    this.YMT = Year + "" + Month + "" + Today;
        firebase.firestore().collection('kanazawa').where("YMT", "<", this.YMT).get().then(snapshot => {
          snapshot.forEach(doc => {
            this.allData.push(doc.data().temp)
          })
        })

  },
}

</script>