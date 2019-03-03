<template>

  <div id="accordion">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            On Data Stream value
          </button>
            <span class="badge badge-primary badge-pill" style="float: right;">{{onDataStreamConditions.length}}</span>
        </h5>
      </div>

      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">

          <ul v-if="onDataStreamConditions.length>0" class="list-group list-group-flush">
            <li v-for="condition in onDataStreamConditions" class="list-group-item">
              <!--button type="button" class="btn btn-danger btn-sm" style="float: right;"><strong><i class="fa fa-remove"></i></strong></button-->

              <h6><a href="#" style="float: right; color: red"><strong><i class="fa fa-remove"></i></strong></a>{{condition.data_stream}} <strong>{{condition.condition.operator}} {{condition.condition.value}}</strong> {{condition.value}} </h6>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingTwo">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            When Data Stream has not been updated
          </button>
          <span class="badge badge-primary badge-pill" style="float: right;">{{dataStreamNotUpdatedConditions.length}}</span>
        </h5>
      </div>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        <div class="card-body">

          <ul v-if="dataStreamNotUpdatedConditions.length>0" class="list-group list-group-flush">
            <a href="#" style="float: right; color: red"><strong><i class="fa fa-remove"></i></strong></a>
            <li v-for="condition in dataStreamNotUpdatedConditions" class="list-group-item">{{condition.dataStream}} not updated from
              <div v-if="condition.dataStreamNotUpdatedFrom.months>0">{{condition.dataStreamNotUpdatedFrom.months}} months,</div>
              <div v-if="condition.dataStreamNotUpdatedFrom.weeks>0">{{condition.dataStreamNotUpdatedFrom.weeks}} weeks,</div>
              <div v-if="condition.dataStreamNotUpdatedFrom.days>0">{{condition.dataStreamNotUpdatedFrom.days}} days,</div>
              <div v-if="condition.dataStreamNotUpdatedFrom.hours>0">{{condition.dataStreamNotUpdatedFrom.hours}} hrs,</div>
              <div v-if="condition.dataStreamNotUpdatedFrom.minutes>0">{{condition.dataStreamNotUpdatedFrom.minutes}} min,</div>
              <div v-if="condition.dataStreamNotUpdatedFrom.seconds>0">{{condition.dataStreamNotUpdatedFrom.seconds}} secs.</div>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingThree">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Time interval
          </button>
          <span class="badge badge-primary badge-pill" style="float: right;">{{timeIntervalConditions.length}}</span>
        </h5>
      </div>
      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body">

          <ul v-if="timeIntervalConditions.length>0" class="list-group list-group-flush">
            <li v-for="condition in timeIntervalConditions" class="list-group-item">
              From: {{condition.from}} - To {{condition.to}}
              <a href="#" style="float: right; color: red"><strong><i class="fa fa-remove"></i></strong></a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>


</template>


<script>

  export default {

    computed: {


      onDataStreamConditions: function() {
        return this.$store.state.dataStreamCurrentValueConditions;
      },

      dataStreamNotUpdatedConditions: function() {
        return this.$store.state.dataStreamNotUpdatedConditions;
      },

      timeIntervalConditions: function() {
        return this.$store.state.timeIntervalConditions;
      },

    },

  }

</script>


<style scoped>



</style>
