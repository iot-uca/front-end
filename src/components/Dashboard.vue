<template>

  <!-- div for Dashboard view -->
  <div v-if="renderDashboardView" id="dashboard" style="margin: 1.5%;">

    <div class="row d-flex align-items-stretch" style="font-family: sans-serif;">


      <div class="col-md-4" style="font-family: sans-serif;">

        <div class="card shadow clickable-card" >
          <div class="card-body text-center">
            <div class="row">
              <div class="col-sm-12">
                <h4 class="card-title" style="color:rgb(74, 255, 130) !important;">{{this.$store.state.dataStreamsConfigured.length}}</h4>

                <router-link to="/dataStreams" exact>
                  <div class="text-muted">Data Streams</div>
                </router-link>

              </div>
            </div>
          </div>
        </div>


        <div class="card shadow my-4 clickable-card"><!-- my-5 da margen en el eje Y : 1.5 rem -->
          <div class="card-body text-center">
            <div class="row">
              <div class="col-sm-6">
                <h4 class="card-title" style="color:rgb(74, 255, 130) !important;">{{this.$store.state.existingActions.length}}</h4>

                <router-link to="/actions" exact>
                  <div class="small text-muted">Actions</div>
                </router-link>


              </div>
              <div class="col-sm-6">
                <h4 class="card-title" style="color:rgb(74, 255, 130) !important;">{{this.$store.state.existingCommands.length}}</h4>

                <router-link to="/commands" exact>
                  <div class="small text-muted">Commands</div>
                </router-link>

              </div>
            </div>
          </div>
        </div>

        <div class="card shadow clickable-card">
          <div class="card-body text-center">
            <div class="row">
              <div class="col-sm-4">
                <h4 class="card-title" style="color:rgb(74, 255, 130) !important;">{{this.$store.state.existingTriggers.length}}</h4>

                <router-link to="/triggers" exact>
                  <div class="small text-muted">Triggers</div>
                </router-link>

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
                  <div class="progress-bar" role="progressbar" style="width: 58%; background-color:rgb(74, 255, 130) !important;" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100">{{this.$store.state.amountOfPeriodicalTriggers}}</div>
                </div>


                <div class="small text-muted">Data Point Registration</div>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: 42%; background-color:rgb(74, 255, 130) !important;" aria-valuenow="44" aria-valuemin="0" aria-valuemax="100">{{this.$store.state.amountOfDataPointTriggers}}</div>
                </div>

              </div>
            </div>
          </div>
        </div>



      </div>


      <div class="col-md-8">

        <div class="card mb-3 shadow h-100">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Executed Actions

            <router-link to="/actions" exact>
        	<!--i class="fa fa-ellipsis-h" style="float:right; color:black"></i-->
		<span class="badge" style="color: rgb(74, 255, 130); float:right;">View</span>
            </router-link>

          </div>

	<div v-if="mostExecutedActions.labels.length<1" class="card-body">
            <br>
	    <br>
            <br>
            <p class="text-center">No executed Actions at this time</p>
	</div>

          <div v-else class="card-body">
            <div class="row">
              <div class="col-md-8">
                <canvas id="barChart" class="chartjs-render-monitor"></canvas>
              </div>
              <div class="col-md-4">

		    <table class="table table-striped table-responsive table-md">
		      <thead>
		      <tr>
		        <th scope="col" style="width:30%;">Name</th>
		        <th scope="col" class="text-center" style="width:70%;">Last Updated</th>
		      </tr>
		      </thead>
		      <tbody>
		      <tr v-for="action in mostRecentlyUpdatedActions" style="font-size: 0.8rem;">
		        <td>{{action.action.name}}</td>
			<td>{{Math.floor(action.not_updated_since)}} minutes</td>
		      </tr>
		      </tbody>
		    </table>

              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="row" style="font-family: sans-serif; margin-top: 2%;">


      <div class="col-md-4">


        <div class="card shadow h-100" style="font-family: sans-serif;">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Next Commands in Queue

            <router-link to="/commands" exact>
              <!--i class="fa fa-ellipsis-h" style="float:right; color:black"></i-->
	      <span class="badge" style="color: rgb(74, 255, 130); float:right;">View</span>
            </router-link>

          </div>


          <div v-if="existingCommandsPrioritized.length==0" class="card-body">
            <br>
            <br>
            <p class="text-center">No pending commands at this time</p>
          </div>

          <div v-else class="card-body">
            <table class="table table-striped table-responsive table-sm" style="width:100%;">
              <thead>
              <tr>
                <th scope="col" style="width:55%;">Name</th>
                <th scope="col" style="width:15%;">Priority</th>
                <th scope="col" class="text-center" style="width:30%;">Last Upd.</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="command in existingCommandsPrioritized" style="font-size: 0.8rem;">
                <td>{{command.command}}</td>
                <td class="text-center">{{command.priority}}</td>
                <td class="text-center"> - mins</td>
                <!--td><button class="btn btn-sm" data-toggle="modal" @click="showDataStream(dataStream); getDataPoints();" data-target="#dataPointsForStreamModal"><i class="fa fa-bar-chart text-center"></i></button></td-->
              </tr>
              </tbody>
            </table>
          </div>
        </div>


      </div>

      <div class="col-md-8" style="font-family: sans-serif; width:100%;" >

        <div v-if="showAddDataStream" class="card shadow h-100" style="font-family: sans-serif;">
          <div class="card-header">
            <i class="fa fa-pie-chart"></i> Most Recently Updated Streams

              <router-link to="/dataStreams" exact>
                <!--i class="fa fa-ellipsis-h" style="float:right; color:black"></i-->
		<span class="badge" style="color: rgb(74, 255, 130); float:right;">View</span>
              </router-link>

          </div>


          <div v-if="dataStreams.length==0" class="card-body">
            <br>
            <br>
            <p class="text-center">No updated Streams at this time</p>
          </div>

          <div v-else class="card-body">
            <table class="table table-striped table-responsive table-sm" style="width:100%;">
              <thead>
              <tr>
                <th scope="col" style="width:58%;">Name</th>
                <th scope="col" class="text-center" style="width:10%;">Type</th>
                <th scope="col" class="text-center" style="width:10%;">Value</th>
                <th scope="col" class="text-center" style="width:20%;">Last Updated</th>
                <th scope="col"style="width:2%;"/>
              </tr>
              </thead>
              <tbody>
              <tr v-for="dataStream in dataStreams" style="font-size: 0.8rem;">
                <td>{{dataStream.name}}</td>
                <td class="text-center">type</td>
                <td class="text-center" >{{dataStream.current_value}}</td>
                <td class="text-center">{{Math.floor(dataStream.not_updated_since)}} minutes</td>
                <td><button class="btn btn-sm" data-toggle="modal" @click="showDataStream(dataStream); getDataPoints();" data-target="#dataPointsForStreamModal"><i class="fa fa-bar-chart text-center"></i></button></td>
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
    console.log("###### 111 #####");
    this.$store.dispatch('getNextCommandsInQueue', this.$store.state.backendEndPoint);
    console.log("###### 222 #####");
    this.determineMostRecentlyUpdatedStreams(new Date());
    console.log("###### 333 #####");
    this.$store.dispatch('getMostExecutedActions', this.$store.state.backendEndPoint);
    console.log("###### 444 #####");
    this.$store.dispatch('getLastExecutedActions', this.$store.state.backendEndPoint);
    console.log("###### 555 #####");
    this.drawCharts();
    console.log("###### 666 #####");
    //this.determineMostRecentlyUpdatedActions(new Date());
    console.log("###### 777 #####");

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
      return this.$store.state.mostRecentlyUpdatedStreams;
    },
    existingCommandsPrioritized(){
      return this.$store.state.existingCommandsPrioritized;
    },
    mostExecutedActions(){
      return this.$store.state.mostExecutedActions;
    },
    lastExecutedActions(){
      return this.$store.state.lastExecutedActions;
    },
    mostRecentlyUpdatedActions(){
      return this.$store.state.mostRecentlyUpdatedActions;
    },

  },

  methods: {
    drawCharts: function () {
      this.$store.dispatch('drawCharts');
    },
    showDataStream: function (dataStream) {
      this.$store.dispatch('showDataStream', dataStream);
    },
    getDataPoints: function () {
      this.$store.dispatch('getDataPoints');
    },
    determineMostRecentlyUpdatedStreams: function () {
      this.$store.dispatch('determineMostRecentlyUpdatedStreams', new Date());
    },
    determineMostRecentlyUpdatedActions: function () {
      this.$store.dispatch('determineMostRecentlyUpdatedActions', new Date());
    },
  }
}

</script>

<style scoped>

  .clickable-card card:hover{
    transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

</style>
