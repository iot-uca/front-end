<template>

  <!-- Modal for adding triggers -->

  <div v-if="showModalForTriggerAdding">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel"><strong>Add Trigger</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForTriggerAdding();">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <h6 class="text-muted text-center"><em><small>You trigger an ACTION based on a CONDITION that needs to be checked according to some POLICY</small></em></h6>

              <div class="modal-body">

                <ul class="nav nav-tabs" id="addTriggersTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active a-green" id="triggerActionConfig-tab" data-toggle="tab" href="#triggerActionConfig" role="tab" aria-controls="triggerActionConfig" aria-selected="true">Action config</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link a-green" id="triggerPolicy-tab" data-toggle="tab" href="#triggerPolicy" role="tab" aria-controls="triggerPolicy" aria-selected="false">Policy</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link a-green" id="triggerCondition-tab" data-toggle="tab" href="#triggerCondition" role="tab" aria-controls="triggerCondition" aria-selected="false">Condition</a>
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
                        <input type="text" class="form-control" id="triggerName" placeholder="Trigger Name" required="true" v-model="activeTrigger.name">
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
                        <select class="form-control custom-select" id="triggerAction" placeholder="" required="true" v-model="activeTrigger.action">
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
                          <input id="timePer" name="timePer" type="radio" class="custom-control-input" :checked="isTimePeriodPolicy" @click="timePeriodPolicy()" style="background-color:#4AE387;">
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
                          <select class="form-control custom-select" id="timeGranularity" required="true" v-model="activeTrigger.timePeriod.granularity">
                            <option v-for="opt in timeGranularityOptions" :value="opt.name">{{opt.name}}</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    <div v-else>

                      <div class="mb-3">
                        <label for="dsName">From Data Stream</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-diamond"></i></span>
                          </div>
                          <select class="form-control custom-select" id="dsName" placeholder="" required="true" v-model="activeTrigger.dataPointRegistration.dataStream">
                            <option v-for="dS in dataStreamsConfigured" :value="dS.name">{{dS.name}}</option>
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
                          <option v-for="condition in triggerConditions" v-bind:value="{ id: condition.id, text: condition.name }">{{ condition.label }}</option>
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
                            <option value=">">greater than</option>
                            <option value="<">less than</option>
                            <option value="=">equal to</option>
                            <option value="!=">different to</option>
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

                      <div class="row">

                        <div class="col-md-3">
                          <div class="mb-3">
                            <label for="dSHoursFrom">From: Hour (24hs)</label>
                            <input type="text" class="form-control" id="dSHoursFrom" placeholder="0" required="" v-model="timeIntervalCondition.from.hours">
                          </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-3">
                              <label for="dSMinutesFrom">From: Minutes</label>
                              <input type="text" class="form-control" id="dSMinutesFrom" placeholder="0" required="" v-model="timeIntervalCondition.from.minutes">
                            </div>
                        </div>
                        <div class="col-md-3">
                          <div class="mb-3">
                            <label for="dSHoursTo">To: Hour (24hs)</label>
                            <input type="text" class="form-control" id="dSHoursTo" placeholder="0" required="" v-model="timeIntervalCondition.to.hours">
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="mb-3">
                            <label for="dSMinutesTo">To: Minutes</label>
                            <input type="text" class="form-control" id="dSMinutesTo" placeholder="0" required="" v-model="timeIntervalCondition.to.minutes">
                          </div>
                        </div>

                      </div>

                    </div>

                    <div class="row" style="margin: inherit;">
                      <button type="button" class="btn button-green btn-sm" @click="addNewCondition()" style="float: right;">Add condition</button>
                    </div>

                    <br>

                    <!--ul class="list-group list-group-flush">
                      <li v-for="condition in conditionsForTrigger" class="list-group-item">{{condition}}</li>
                    </ul-->

                    <conditions-accordion v-if="conditionsForTrigger!==undefined"></conditions-accordion>



                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn button-green btn-sm" data-dismiss="modal"  @click="addTrigger(); hideModalForTriggerAdding();"><strong>Add trigger</strong></button>
              </div>

            </div>
        </div>
      </div>
    </div>
  </div>


</template>


<script>

  import TriggerConditionsAccordion from './TriggerConditionsAccordion'

  export default {

    components: {
      'conditions-accordion': TriggerConditionsAccordion
    },

    mounted(){
      /*$(function () {
        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker2').datetimepicker();

        console.log($("#datetimepicker1").datetimepicker('date'));
        console.log($('#datetimepicker').datetimepicker('viewDate'));
      });*/
    },

    computed:{

      showModalForTriggerAdding(){
        return this.$store.state.showModalForTriggerAdding;
      },

      activeTrigger: function() {
        return this.$store.state.activeTrigger;
      },

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
      },

      timeIntervalCondition(){
        return this.$store.state.timeIntervalCondition;
      }

    },

    methods: {

      hideModalForTriggerAdding: function (){
        this.$store.dispatch('hideModalForTriggerAdding');
      },

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
        this.$store.dispatch('addTrigger', this.$store.state.backendEndPoint);
      },
    }

  }


</script>


<style scoped>

.a-green{
  color:#4AE387;
}

.button-green{
  background-color: #4AE387;
  color: white;
  font-family: Source Sans Pro, sans-serif;
}

.button-green-danger{
  background-color: #87d37c;
  color: white;
  font-family: Source Sans Pro, sans-serif;
}

.button-green:hover{
   background-color: #4AFF96;
}

.button-green-danger:hover{
   background-color: #4AE387;
}

.modal-mask {
position: fixed;
z-index: 9998;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, .5);
display: table;
transition: opacity .3s ease;
}

.modal-wrapper {
display: table-cell;
vertical-align: middle;
}

.modal-body {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}

</style>
