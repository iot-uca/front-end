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
                  <div class="h4 mb-0 text-primary">{{this.$store.state.dataPointsMaxValue}}</div>
                  <div class="small text-muted">Highest</div>
                  <hr>
                  <div class="h4 mb-0 text-warning">{{this.$store.state.dataPointsMinValue}}</div>
                  <div class="small text-muted">Lowest</div>
                  <hr>
                  <div class="h4 mb-0 text-success">{{this.$store.state.dataPointsAverageValue}}</div>
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

    },

    computed:{

        showModalForDataPointsChart(){
          return this.$store.state.showModalForDataPointsChart;
        },

    },

    methods:{

        hideModalForDataPointsChart: function () {
          this.$store.dispatch('hideModalForDataPointsChart');
        },

    }
  }

</script>

<style scoped>

</style>
