<template>

  <!-- Modal for showing  Data Points chart -->
  <div class="modal fade" id="dataPointsForStreamModal" tabindex="-1" role="dialog" aria-labelledby="dataPointsForStreamModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="dataPointsForStreamModalLabel"><strong>Data Points</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">

          <div class="card mb-3" style="height: 80%; width: 100%;">
            <div class="card-header">
              <i class="fa fa-bar-chart"></i> Data Points
              <select  style="float: right;" id="days" placeholder="Latest" required="true">
                <option value="Latest">Latest</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm-8 my-auto">
                  <canvas id="line-chart" class="chartjs-render-monitor"></canvas>
                </div>
                <div class="col-sm-4 text-center my-auto">
                  <div class="h4 mb-0 text-primary">114</div>
                  <div class="small text-muted">Highest</div>
                  <hr>
                  <div class="h4 mb-0 text-warning">86</div>
                  <div class="small text-muted">Lowest</div>
                  <hr>
                  <div class="h4 mb-0 text-success">17</div>
                  <div class="small text-muted">Average</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    mounted() {
      new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: [1,2,3,4,5,6,7,8,9,10],
          datasets: [{
            data: [86,114,106,106,107,111,114,90,99,107],
            label: "Temperature",
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
          scales: {
            xAxes: [{
              gridLines: {
                display:false
              }
            }],
            yAxes: [{
              gridLines: {
                display:false
              }
            }]
          },
          /*legend: {
              display: false
          }*/

        }
      });
    }
  }

</script>

<style scoped>

</style>
