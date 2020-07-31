<!--<template>
  <div class="map">
    <h1>This is a map</h1>
    <div id="png"></div>

    <div id="regions_div" style="width: 900px; height: 500px;"></div>
  </div>
</template>

<script>

google.charts.load("current", {
  packages: ["geochart"],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  mapsApiKey: "AIzaSyBq9xk_1U7dtPUKeCxDUfMyCgYWMqGV-p0",
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ["Country", "Popularity"],
    ["Colombia", 700],
    ["Venezuela", 150],
    ["Brazil", 900],
  ]);

  var options = {
    region: "JP",
    resolution: "provinces",
  };

  var chart_div = document.getElementById("regions_div");
  var chart = new google.visualization.GeoChart(chart_div);

  var downloadLink = null;
  // Wait for the chart to finish drawing before calling the getImageURI() method.
  google.visualization.events.addListener(chart, "ready", function () {
    downloadLink = document.createElement("a");
    downloadLink.href = chart.getImageURI();
    downloadLink.download = "chart.png";
    downloadLink.click();
  });

  google.visualization.events.addListener(chart, "regionClick", selectHandler);

  function selectHandler(reg) {
    console.log(reg);
    alert(reg.region);
  }

  chart.draw(data, options);

  document.getElementById("png").outerHTML =
    '<a href="' + chart.getImageURI() + '" download>Printable version</a>';
}
</script>