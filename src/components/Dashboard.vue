<template>

  <!-- div for Dashboard view -->
  <div v-if="renderDashboardView" id="dashboard" style="margin: 1.5%;">

    <div class="row" style="font-family: sans-serif;">

      <div class="col-lg-8">
        <!-- Example Pie Chart Card-->
        <div class="card mb-3 shadow">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Executed Triggers
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <canvas id="barChart" class="chartjs-render-monitor"></canvas>
              </div>
              <div class="col-md-6">
                <canvas id="percentageBar" class="chartjs-render-monitor"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Example Pie Chart Card-->
        <div class="card mb-3 shadow">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Triggered Actions
          </div>
          <div class="card-body">
            <canvas id="myPieChart2" class="chartjs-render-monitor"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="font-family: sans-serif;">

      <!--data-stream-card v-for="dS in dataStreams" v-bind:name="dS.name" v-bind:value="dS.current_value" v-bind:timestamp="dS.last_updated" @click.native="assignDataStream(dS)"></data-stream-card>
      <div v-if="showAddDataStream" class="col-md-2">
          <button @click="showDataStreamView(); displayDataStreamModal()"><i class="fa fa-plus text-center" style="font-size: 3rem; color: lightblue;"></i></button>
      </div-->


      <div class="col-md-8" style="font-family: sans-serif; width:100%;" >

        <div v-if="displayLoadingFeedback" class="sk-circle">
          <div class="sk-circle1 sk-child"></div>
          <div class="sk-circle2 sk-child"></div>
          <div class="sk-circle3 sk-child"></div>
          <div class="sk-circle4 sk-child"></div>
          <div class="sk-circle5 sk-child"></div>
          <div class="sk-circle6 sk-child"></div>
          <div class="sk-circle7 sk-child"></div>
          <div class="sk-circle8 sk-child"></div>
          <div class="sk-circle9 sk-child"></div>
          <div class="sk-circle10 sk-child"></div>
          <div class="sk-circle11 sk-child"></div>
          <div class="sk-circle12 sk-child"></div>
        </div>

        <div v-if="showAddDataStream" class="card shadow" style="font-family: sans-serif;">
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

      <div class="col-md-4" style="font-family: sans-serif;">
        <div class="card shadow" style="margin-bottom: 4%;">
          <div class="card-body text-center">
            <h3 class="card-title text-primary">31</h3>
            <p class="card-text">Actions</p>
          </div>
        </div>
        <div class="card shadow" style="margin-bottom: 4%;">
          <div class="card-body text-center">
            <h3 class="card-title text-primary">12</h3>
            <p class="card-text">Triggers</p>
          </div>
        </div>
        <div class="card shadow">
          <div class="card-body text-center">
            <h3 class="card-title text-primary">9</h3>
            <p class="card-text">Data Streams</p>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

export default {

  mounted(){

    let ctx = document.getElementById("barChart").getContext('2d');
    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Trigger 1', 'Trigger 2', 'Trigger 3', 'Trigger 4', 'Trigger 5'],
        datasets: [{
          data: [11, 22, 9, 17, 15],
          backgroundColor: ['#FABB3C', '#32D75E','#D02FC0','#EB0524','#3e95cd']
          /*backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850']*/
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive:true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: 'Most Executed actions (times)'
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
        }
      }
    });

    ctx = document.getElementById("myPieChart2").getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Action 1', 'Action 2', 'Action 3', 'Action 4'],
        datasets: [{
          data: [11, 22, 5, 17],
          backgroundColor: ['#FABB3C', '#32D75E','#D02FC0','#EB0524']
          /*backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850']*/
        }]
      },
      options: {
        /*legend: {
            display: false
        },*/
        title: false,
        responsive:true,
        cutoutPercentage:0,
        maintainAspectRatio: true,
        title: {
          display: false,
          text: 'Most Executed actions (times)'
        }
      }
    });

    ctx = document.getElementById("percentageBar").getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Data Point Reg', 'Time Interval'],
        datasets: [{
          data: [11, 22,],
          backgroundColor: ['#0000FF', '#32D75E']
        }]
      },
      options: {
        /*legend: {
            display: false
        },*/
        title: false,
        responsive:true,
        cutoutPercentage:70,
        maintainAspectRatio: true,
      }
    });

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

  }
}

</script>

<style scoped>



</style>
