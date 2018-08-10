<template>

  <!-- Modal for showing triggers -->
  <div class="modal fade" id="showTriggerModal" tabindex="-1" role="dialog" aria-labelledby="showTriggerModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title" id="showTriggerModalTitle"><strong>Trigger details</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">

          <ul class="nav nav-tabs" id="showTriggerTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="triggerActionDetail-tab" data-toggle="tab" href="#triggerActionDetail" role="tab" aria-controls="triggerActionDetail" aria-selected="true">Action config</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="triggerPolicyDetail-tab" data-toggle="tab" href="#triggerPolicyDetail" role="tab" aria-controls="triggerPolicyDetail" aria-selected="false">Policy</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="triggerConditionDetail-tab" data-toggle="tab" href="#triggerConditionDetail" role="tab" aria-controls="triggerConditionDetail" aria-selected="false">Condition</a>
            </li>
          </ul>

          <div class="tab-content" id="showTriggerTabContent">

            <div class="tab-pane fade show active" id="triggerActionDetail" role="tabpanel" aria-labelledby="triggerActionDetail-tab">

              <div class="mb-3">
                <label for="triggerName">Name</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-font"></i></span>
                  </div>
                  <input disabled type="text" class="form-control" id="triggerName" v-bind:placeholder="activeTrigger.name" required="true">
                </div>
              </div>

              <div class="mb-3">
                <label for="triggerName">Action associated</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-star-o"></i></span>
                  </div>
                  <select disabled class="form-control custom-select" v-model="this.activeTrigger.action" required="true">
                    <option v-for="(action, index) in existingActions" :value="action.name">
                      {{action.name}}
                    </option>
                  </select>
                </div>
              </div>

            </div>

            <div class="tab-pane fade" id="triggerPolicyDetail" role="tabpanel" aria-labelledby="triggerPolicyDetail-tab">

              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-radio">
                    <input id="dataPointReg" name="dataPointReg" type="radio" class="custom-control-input" required="" @click="dataPointPolicy()">
                    <label class="custom-control-label" for="dataPointReg">Data Point Registration</label>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-radio">
                    <input id="timePeriod" name="timePeriod" type="radio" class="custom-control-input" required="" @click="timePeriodPolicy()">
                    <label class="custom-control-label" for="timePeriod">Time Period</label>
                  </div>
                </div>
              </div>

              <div v-if="isTimePeriodPolicy">

                <div class="mb-3">
                  <label for="triggerName">Granularity</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-calendar-plus-o"></i></span>
                    </div>
                    <select class="form-control custom-select" id="timeGranularity" required="true">
                      <option v-for="opt in timeGranularityOptions" value="opt">{{opt.name}}</option>
                    </select>
                    <div class="invalid-feedback" style="width: 100%;">
                      The Trigger name is required.
                    </div>
                  </div>
                </div>

              </div>

              <div v-else>

                <div class="mb-3">
                  <label for="triggerName">From Data Stream</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                    </div>
                    <select class="form-control custom-select" id="days" placeholder="" required="true">
                      <option v-for="dS in dataStreams" value="dS">{{dS}}</option>
                    </select>
                    <div class="invalid-feedback" style="width: 100%;">
                      The Trigger name is required.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div class="tab-pane fade" id="triggerConditionDetail" role="tabpanel" aria-labelledby="triggerConditionDetail-tab">

              <!-- COMENTADO XQ triggerConditionEdits NO SÉ PARA QUÉ LA USO -->
              <div class="mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-exclamation"></i></span>
                  </div>
                  <select class="form-control custom-select" required="true" v-model="conditionSelected">
                    <option v-for="condition in triggerConditions" v-bind:value="{ id: condition.id, text: condition.name }">{{ condition.name }}</option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
                  </div>
                </div>
              </div>

              <div class="mb-3" v-if="conditionSelected.id==2 || conditionSelected.id==3">
                <label>From Data Stream</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                  </div>
                  <select class="form-control custom-select" required="true">
                    <option v-for="dS in dataStreams" value="dS">{{dS}}</option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
                  </div>
                </div>
              </div>


              <div v-if="conditionSelected.id==2">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label for="cc-number">Value</label>
                    <input class="form-control" type="text" placeholder="Data-Stream current value" readonly>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label>Condition</label>
                    <select class="form-control custom-select" id="currentValueCond" placeholder="" required="true">
                      <option value="monday">greater than</option>
                      <option value="monday">less than</option>
                      <option value="monday">equal to</option>
                      <option value="monday">different to</option>
                    </select>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="cc-number">Defined value</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="0" required="">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
              </div>


              <div v-if="conditionSelected.id==3">
                <label for="triggerName">For more than...</label>
                <div class="row">
                  <div class="col-md-2 mb-3">
                    <label for="months">Months</label>
                    <input type="text" class="form-control" id="months" placeholder="0" required="" v-model="dataStreamNotUpdatedFrom.months">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="weeks">Weeks</label>
                    <input type="text" class="form-control" id="weeks" placeholder="0" required="" v-model="dataStreamNotUpdatedFrom.weeks">
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="dayss">Days</label>
                    <input type="text" class="form-control" id="dayss" placeholder="0" required="" v-model="dataStreamNotUpdatedFrom.days">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="hours">Hours</label>
                    <input type="text" class="form-control" id="hours" placeholder="0" required="" v-model="dataStreamNotUpdatedFrom.hours">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="minutes">Minutes</label>
                    <input type="text" class="form-control" id="minutes" placeholder="0" required="" v-model="dataStreamNotUpdatedFrom.minutes">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="seconds">Seconds</label>
                    <input type="text" class="form-control" id="seconds" placeholder="0" required="" v-model="dataStreamNotUpdatedFrom.seconds">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <label for="triggerName" style="font-style: italic;">For more than {{dataStreamNotUpdatedFrom.months}} months, {{dataStreamNotUpdatedFrom.weeks}} weeks, {{dataStreamNotUpdatedFrom.days}} days, {{dataStreamNotUpdatedFrom.hours}} hours, {{dataStreamNotUpdatedFrom.minutes}} minutes and {{dataStreamNotUpdatedFrom.seconds}} seconds</label>
              </div>

              <div v-if="conditionSelected.id==4">
                <div class="mb-3">
                  <label for="triggerName">From</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-calendar-plus-o"></i></span>
                    </div>
                    <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="from">
                    <div class="invalid-feedback" style="width: 100%;">
                      The Trigger name is required.
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="triggerName">To</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-calendar-times-o"></i></span>
                    </div>
                    <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="to">
                    <div class="invalid-feedback" style="width: 100%;">
                      The Trigger name is required.
                    </div>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-3">
                </div>
                <div class="col-md-3">
                </div>
                <div class="col-md-3">
                  <button class="btn btn-primary btn-lg btn-block">Add new condition</button>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-danger btn-block">Forget condition</button>
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

    computed:{
      existingActions(){
        return this.$store.state.existingActions;
      },

      activeTrigger(){
        return this.$store.state.activeTrigger;
      },

      isTimePeriodPolicy(){
        return this.$store.state.isTimePeriodPolicy;
      },

      timeGranularityOptions(){
        return this.$store.state.timeGranularityOptions;
      },

      dataStreamsConfigured(){
        return this.$store.state.dataStreamsConfigured;
      },

      triggerConditions(){
        return this.$store.state.triggerConditions;
      },

      conditionSelected: {
        // getter
        get: function () {
          return this.$store.state.conditionSelected;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setConditionSelected', newValue);
        }
      },

      dataStreamNotUpdatedFrom(){
        return this.$store.state.dataStreamNotUpdatedFrom;
      }

    },

    methods: {

      dataPointPolicy: function () {
        this.$store.dispatch('dataPointPolicy');
      },

      timePeriodPolicy: function () {
        this.$store.dispatch('timePeriodPolicy');
      },

      addTrigger: function () {


      },
    }

  }

</script>

<style scoped>


</style>
