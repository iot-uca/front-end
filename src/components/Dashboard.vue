<template>

  <!-- div for Dashboard view -->
  <div v-if="renderDashboardView" id="dashboard" style="margin: 1.5%;">

    <div class="row d-flex align-items-stretch" style="font-family: sans-serif;">


      <div class="col-md-4" style="font-family: sans-serif;">

        <div class="card shadow clickable-card" >
          <div class="card-body text-center">
            <div class="row">
              <div class="col-sm-12">
                <h4 class="card-title text-primary">{{this.$store.state.dataStreamsConfigured.length}}</h4>
                <div class="text-muted">Data Streams</div>
              </div>
              <!--div class="col-sm-6 text-center">

              </div-->
            </div>
          </div>
        </div>


        <div class="card shadow my-4 clickable-card"><!-- my-5 da margen en el eje Y : 1.5 rem -->
          <div class="card-body text-center">
            <div class="row">
              <div class="col-sm-4">
                <h4 class="card-title text-primary">{{this.$store.state.existingActions.length}}</h4>
                <div class="small text-muted">Actions</div>
              </div>
              <div class="col-sm-4 text-center">
                <div class="h5 mb-0 text-info">{{this.$store.state.existingCommands.length}}</div>
                <div class="small text-muted">Commands</div>
              </div>
              <div class="col-sm-4 text-center">
                <div class="h5 mb-0 text-info">5</div>
                <div class="small text-muted">HTTP Requests</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow clickable-card">
          <div class="card-body text-center">
            <div class="row">
              <div class="col-sm-4">
                <h4 class="card-title text-primary">{{this.$store.state.existingTriggers.length}}</h4>
                <div class="small text-muted">Triggers</div>
              </div>
              <div class="col-sm-8 text-center">
                <!--div class="h5 mb-0 text-info">4</div>
                <div class="small text-muted">Time Interval</div>
              </div>
              <div class="col-sm-4 text-center">
                <div class="h5 mb-0 text-info">3</div>
                <div class="small text-muted">Data Point Registration</div-->

                <div class="small text-muted">Time Interval</div>
                <div class="progress">
                  <div class="progress-bar bg-info" role="progressbar" style="width: 58%;" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100">{{this.$store.state.amountOfPeriodicalTriggers}}</div>
                </div>


                <div class="small text-muted">Data Point Registration</div>
                <div class="progress">
                  <div class="progress-bar bg-info" role="progressbar" style="width: 42%;" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">{{this.$store.state.amountOfDataPointTriggers}}</div>
                </div>

              </div>
            </div>
          </div>
        </div>



      </div>


      <div class="col-md-8">

        <div class="card mb-3 shadow h-100">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Executed Triggers
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <canvas id="barChart" class="chartjs-render-monitor"></canvas>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <!--canvas id="myPieChart2" class="chartjs-render-monitor"></canvas-->
                    <canvas id="percentageBar" class="chartjs-render-monitor"></canvas>
                    <!--h3 class="card-title text-primary">7</h3-->
                  </div>
                  <div class="col-md-6 text-center my-auto">
                    <div class="h5 mb-0 text-primary">33.33%</div>
                    <div class="small text-muted">Data Point Registration</div>
                    <hr>
                    <div class="h5 mb-0 text-success">66.66%</div>
                    <div class="small text-muted">Time Interval</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="row" style="font-family: sans-serif; margin-top: 2%;">

      <!--data-stream-card v-for="dS in dataStreams" v-bind:name="dS.name" v-bind:value="dS.current_value" v-bind:timestamp="dS.last_updated" @click.native="assignDataStream(dS)"></data-stream-card>
      <div v-if="showAddDataStream" class="col-md-2">
          <button @click="showDataStreamView(); displayDataStreamModal()"><i class="fa fa-plus text-center" style="font-size: 3rem; color: lightblue;"></i></button>
      </div-->

      <div class="col-md-4">
        <!-- Example Pie Chart Card-->
        <div class="card mb-3 shadow h-100">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Triggered Actions
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <canvas id="myPieChart2" class="chartjs-render-monitor"></canvas>
                <!--h3 class="card-title text-primary">7</h3-->
              </div>
              <div class="col-md-6 text-center my-auto">
                <div class="h5 mb-0 text-primary">9</div>
                <div class="small text-muted">Action 1</div>
                <hr>
                <div class="h5 mb-0 text-warning">7</div>
                <div class="small text-muted">Action 2</div>
                <hr>
                <div class="h5 mb-0 text-success">5</div>
                <div class="small text-muted">Action 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8" style="font-family: sans-serif; width:100%;" >

        <div v-if="showAddDataStream" class="card shadow h-100" style="font-family: sans-serif;">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Recently Updated Streams
          </div>
          <div class="card-body">
            <table class="table table-striped table-responsive table-sm" style="width:100%;">
              <thead>
              <tr>
                <th scope="col" style="width:58%;">Name</th>
                <th scope="col" style="width:20%;">Value</th>
                <th scope="col" style="width:20%;">Last Updated</th>
                <th scope="col"style="width:2%;"/>
              </tr>
              </thead>
              <tbody>
              <tr v-for="dS in dataStreams" style="font-size: 0.8rem;">
                <td>{{dS.name}}</td>
                <td>{{dS.current_value}}</td>
                <td>{{dS.last_updated}}</td>
                <td><button class="btn btn-sm" data-toggle="modal" data-target="#dataPointsForStreamModal"><i class="fa fa-bar-chart text-center"></i></button></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>

  </div>

</template>

<script>

export default {

  mounted(){

    this.$store.dispatch('showDashboardView');
    this.drawCharts();

  },

  computed:{
    renderDashboardView(){
      return this.$store.state.renderDashboardView;
    },
    displayLoadingFeedback(){
      return this.$store.state.displayLoadingFeedback;
    },
    showAddDataStream(){
      return this.$store.state.showAddDataStream;
    },
    dataStreams(){
      return this.$store.state.dataStreams;
    },

  },

  methods: {
    drawCharts: function () {
      this.$store.dispatch('drawCharts');
    },
  }
}

</script>

<style scoped>

  .clickable-card card:hover{
    transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

</style>
