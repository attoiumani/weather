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
        firebase.firestore().collection('kanazawa').where("YMT", "==", "1").get().then(snapshot => {
          snapshot.forEach(doc => {
            this.allData.push(doc.data().temp)
          })
        })

  },
}

</script>