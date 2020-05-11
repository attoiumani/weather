<template>
  <div id="app">
    This is hoge page. value is {{ $route.params.value }}
    <linechart :place="name" />
    <piechart :place="name" />
    <bar :place="name" />
    <radar :place="name" />
  </div>
</template>

<script>
import linechart from "@/components/chart/linechart";
import piechart from "@/components/chart/piechart";
import radar from "@/components/chart/radar";
import bar from "@/components/chart/bar";

export default {
  components: {
    linechart,
    piechart,
    radar,
    bar
  },
  data() {
    return {
      name: null
    };
  },
  created: function() {
    this.name = this.$route.params.value;
  }
};
</script>