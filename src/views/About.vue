<template>
  <div>{{tag}}</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tag: String
    };
  },

  mounted: function() {
    axios;
    let base = "https://api.clashroyale.com/v1";
    let token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEzZmZmMGI0LWYyZjgtNDEwYy1hM2FkLWFkYjE1MmIyMTliYSIsImlhdCI6MTU4MDg5NjQ2OCwic3ViIjoiZGV2ZWxvcGVyLzgyNjM0MDRhLWQyMjctN2VmYS04YzMwLWYyNmE2NGViNmZkNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMTAuMTUwLjE0NC45NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.MpYj9LPZNwTqbueinsb6wZUPTz0qtl1pLrZjr9YtyK6EtgoyClFJ0hVx2o9ydEHghtDGqJWvUw_oJi9euHtQJw";
    let target_api = base + "/players/";
    let playerTag = "%2328UGR809L";
    let okurl = target_api + playerTag;

    return axios
      .get(okurl, {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "max-age=60",
          Authorization: `Bearer ${token}`
        }
      })
      .then(function(response) {
        this.tag = response.data;
      });
  }
};
</script>
