<template>

  <canvas id="line-chart"></canvas>

</template>

<script>

  export default {
    name: 'chart',
      mounted: function() {

        this.chart = new Chart(document.getElementById("line-chart"), {
          type: 'line',
          data: {
            labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
            datasets: [{
              data: [86,114,106,106,107,111,133,221,783,2478],
              label: "Africa",
              borderColor: "#3e95cd",
              fill: false
            }]
          },
          options: {
            title:false,
            title: {
              display: false,
              text: 'World population per region (in millions)'
            },
            /*legend: {
                display: false
            }*/
          }
        });

      },
      computed: {
        //chartData() {  return this.$store.state.chartData }
      }

  }

</script>


<style scoped>


</style>
