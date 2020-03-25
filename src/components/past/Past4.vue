//クラロワ・・・


<template>
  <div class="container">
    <div>{{tag}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tag: null
    };
  },

  mounted: function() {
    axios;
    let ttt = "https://api.clashroyale.com/v1";
    let access_key =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMyYmM0MTMyLTVjNTYtNDU3NC05Mzc1LWNlNzhiMzE4MjM5MCIsImlhdCI6MTU4MzMxOTA4MCwic3ViIjoiZGV2ZWxvcGVyLzgyNjM0MDRhLWQyMjctN2VmYS04YzMwLWYyNmE2NGViNmZkNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNTcuMTA3LjMyLjM3Il0sInR5cGUiOiJjbGllbnQifV19.fYtFNFNiKL6QNpREpLGX5OH8W4hSqOLm6ezGV2V-IaOi60nnu37L7m7wdcZZxQ3ldxDNHaMEMdgWMsmovjvA2Q";
    let target_api = ttt + "/players/";
    let playerTag = "%2328UGR809L";
    let yyy = target_api + playerTag;

    return axios
      .get(yyy, {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "max-age=60",
          authorization: `Bearer ${access_key}`
        }
      })
      .then(function(response) {
        this.tag = response.data.tag;
      });
  }
};
</script>
