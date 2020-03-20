<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="top">
      <div>

      </div>
      <!---- ↓ data,labelを追加 ---->
      <graph-card name="ユーザー数 推移" :data="getUserData" :label="getLabelList"></graph-card>
      <graph-card name="プレビュー数 推移" :data="getPreviewData" :label="getLabelList"></graph-card>

    </div>
  </div>
</template>
<script>

import GraphCard from "@/components/GraphCard";

export default {
  components: {

    GraphCard,

  },

  computed: {
    getUserData() {
      // TODO: fix getting from server data
      return [...Array(30)].map(
        () => 300 + Math.floor(Math.random() * Math.floor(500 - 300))
      );
    },
    getLabelList() {
      const date = new Date();
      date.setDate(0);
      return [...Array(30)].map(() => {
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString();
      });
    },
    getPreviewData() {
      // TODO: fix getting from server data
      return [...Array(30)].map(
        () => 300 + Math.floor(Math.random() * Math.floor(500 - 300))
      );
    }
  }

};
</script>
<style scoped lang="scss">
.top {
  padding: 66px 0 0 200px;
}
</style>