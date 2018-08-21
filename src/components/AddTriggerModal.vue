<template>

  <!-- Modal for adding triggers -->
  <div class="modal fade" id="addTriggerModal" tabindex="-1" role="dialog" aria-labelledby="addTriggerModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel"><strong>Add Trigger</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h6 class="text-muted text-center"><em><small>You trigger an ACTION based on a CONDITION that needs to be checked according to some POLICY</small></em></h6>

        <div class="modal-body">

          <ul class="nav nav-tabs" id="addTriggersTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="triggerActionConfig-tab" data-toggle="tab" href="#triggerActionConfig" role="tab" aria-controls="triggerActionConfig" aria-selected="true">Action config</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="triggerPolicy-tab" data-toggle="tab" href="#triggerPolicy" role="tab" aria-controls="triggerPolicy" aria-selected="false">Policy</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="triggerCondition-tab" data-toggle="tab" href="#triggerCondition" role="tab" aria-controls="triggerCondition" aria-selected="false">Condition</a>
            </li>
          </ul>

          <div class="tab-content" id=" addTriggersTabContent">
            <div class="tab-pane fade show active" id="triggerActionConfig" role="tabpanel" aria-labelledby="triggerActionConfig-tab">
              <p></p>
              <div class="mb-3">
                <label for="triggerName">Name</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-font"></i></span>
                  </div>
                  <input type="text" class="form-control" id="triggerName" placeholder="Trigger Name" required="true">
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="triggerAction">Action associated</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-star-o"></i></span>
                  </div>
                  <select class="form-control custom-select" id="triggerAction" placeholder="" required="true">
                    <!--option value="monday">Tweet</option>
                    <option value="tuesday">Make Facebook Post</option>
                    <option value="wednesday">Send Email</option>
                    <option value="thursday">Start Engine Alfa</option-->
                    <option v-for="(action, index) in existingActions" :value="action.name">{{action.name}}</option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="triggerPolicy" role="tabpanel" aria-labelledby="triggerPolicy-tab">
              <br>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-radio">
                    <input id="drReg" name="drReg" type="radio" class="custom-control-input" :checked="!isTimePeriodPolicy" @click="dataPointPolicy()">
                    <label class="custom-control-label" for="drReg">Data Point Registration</label>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-radio">
                    <input id="timePer" name="timePer" type="radio" class="custom-control-input" :checked="isTimePeriodPolicy" @click="timePeriodPolicy()">
                    <label class="custom-control-label" for="timePer">Time Period</label>
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

                <!--div class="mb-3">
                    <label for="triggerName">Starting from</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-calendar-plus-o"></i></span>
                        </div>
                        <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="a">
                        <div class="invalid-feedback" style="width: 100%;">
                            The Trigger name is required.
                        </div>
                    </div>
                </div>


                <div class="mb-3">
                    <label for="triggerName">Ending on</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-calendar-times-o"></i></span>
                        </div>
                        <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="a">
                        <div class="invalid-feedback" style="width: 100%;">
                            The Trigger name is required.
                        </div>
                    </div>
                </div-->

              </div>

              <div v-else>

                <div class="mb-3">
                  <label for="dsName">From Data Stream</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                    </div>
                    <select class="form-control custom-select" id="dsName" placeholder="" required="true">
                      <option v-for="dS in dataStreamsConfigured" value="dS.name">{{dS.name}}</option>
                    </select>
                    <div class="invalid-feedback" style="width: 100%;">
                      The Trigger name is required.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="triggerCondition" role="tabpanel" aria-labelledby="triggerCondition-tab">
              <br>
              <div class="mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-exclamation"></i></span>
                  </div>
                  <select class="form-control custom-select" id="days" placeholder="" required="true" v-model="conditionSelected">
                    <option v-for="condition in triggerConditions" v-bind:value="{ id: condition.id, text: condition.name }">{{ condition.name }}</option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
                  </div>
                </div>
              </div>

              <!--div class="mb-3" v-if="conditionSelected.id==2">
                <label for="dataStreamName">From Data Stream</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                  </div>
                  <select class="form-control custom-select" id="dataStreamName" placeholder="" required="true">
                    <option v-for="dS in dataStreamsConfigured" value="dS.name" v-model="onDataStreamValueCondition.dataStream">{{dS.name}}</option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
                  </div>
                </div>
              </div-->


              <div v-if="conditionSelected.id==2">
                <div class="row">

                  <div class="col-md-7 mb-3">
                    <label for="dataStreamName">From Data Stream</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                      </div>
                      <select class="form-control custom-select" id="dataStreamName" v-model="dataStreamValue">
                        <option v-for="dS in dataStreamsConfigured" :id="dS.name" :value="dS.name">{{dS.name}}</option>
                        <!--option v-for="dS in dataStreamsConfigured" value="dS.name">{{dS.name}}</option-->
                      </select>
                      <div class="invalid-feedback" style="width: 100%;">
                        The Trigger name is required.
                      </div>
                    </div>
                  </div>


                  <!--div class="col-md-4 mb-3">
                    <label>Value</label>
                    <input class="form-control" type="text" placeholder="Data-Stream current value" readonly>
                  </div-->


                  <div class="col-md-3 mb-3">
                    <label>Condition</label>
                    <select class="form-control custom-select" id="currentValueCond" v-model="dataStreamCondition">
                      <option value="greater">greater than</option>
                      <option value="less">less than</option>
                      <option value="equal">equal to</option>
                      <option value="different">different to</option>
                    </select>
                    <div class="invalid-feedback">
                      Condition is required
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="ds-defined-value">Defined value</label>
                    <input type="text" class="form-control" id="ds-defined-value" placeholder="0" required="" v-model="dataStreamReferenceValue">
                    <div class="invalid-feedback">
                      A value is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3" v-if="conditionSelected.id==3">
                <label for="dataStreamName">From Data Stream</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                  </div>
                  <select class="form-control custom-select" id="dataStreamNameNotUpdated" v-model="dataStreamNotUpdated">
                    <option v-for="dS in dataStreamsConfigured" :value="dS.name">{{dS.name}}</option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The Trigger name is required.
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
                <label style="font-style: italic;">For more than {{dataStreamNotUpdatedFrom.months}} months, {{dataStreamNotUpdatedFrom.weeks}} weeks, {{dataStreamNotUpdatedFrom.days}} days, {{dataStreamNotUpdatedFrom.hours}} hours, {{dataStreamNotUpdatedFrom.minutes}} minutes and {{dataStreamNotUpdatedFrom.seconds}} seconds</label>
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
                <div class="col-md-10">
                  <button type="button" class="btn btn-primary btn-sm" @click="addNewCondition()" style="float: right;">Add new condition</button>
                </div>
                <div class="col-md-2">
                  <button type="button" class="btn btn-danger btn-sm" style="float: right;">Forget condition</button>
                </div>
              </div>




              <ul class="list-group list-group-flush">
                <li v-for="condition in conditionsForTrigger" class="list-group-item">{{condition}}</li>
              </ul>




            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal"  @click="addTrigger()"><strong>Add trigger</strong></button>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  export default {

    computed:{

      conditionsForTrigger: function() {
        return this.$store.state.conditionsForTrigger;
      },

      dataStreamValue: {
        // getter
        get: function () {
          return this.$store.state.onDataStreamValueCondition.dataStream;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setOnDataStreamValue', newValue);
        }
      },

      dataStreamCondition: {
        // getter
        get: function () {
          return this.$store.state.onDataStreamValueCondition.condition;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setOnDataStreamCondition', newValue);
        }
      },

      dataStreamReferenceValue: {
        // getter
        get: function () {
          return this.$store.state.onDataStreamValueCondition.value;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setOnDataStreamReferenceValue', newValue);
        }
      },


      dataStreamNotUpdated: {
        // getter
        get: function () {
          return this.$store.state.dataStreamNotUpdatedCondition.dataStream;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setDataStreamNotUpdated', newValue);
        }
      },

      existingActions(){
        return this.$store.state.existingActions;
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

      addNewCondition: function () {
        this.$store.dispatch('addNewCondition');
      },

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
