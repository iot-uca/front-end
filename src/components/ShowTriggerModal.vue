<template>

<!-- Modal for showing triggers -->
  <div>

    <div v-if="showModalForTriggerDetails">
          <div class="modal-mask">
            <div class="modal-wrapper">

              <div class="modal-dialog modal-lg">
                <div class="modal-content">

                <div class="modal-header">
                  <h4 class="modal-title" id="showTriggerModalTitle"><strong>Trigger details</strong></h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForTriggerDetails();">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">

                  <ul class="nav nav-tabs" id="showTriggerTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active a-green" id="triggerActionDetail-tab" data-toggle="tab" href="#triggerActionDetail" role="tab" aria-controls="triggerActionDetail" aria-selected="true">Action config</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link a-green" id="triggerPolicyDetail-tab" data-toggle="tab" href="#triggerPolicyDetail" role="tab" aria-controls="triggerPolicyDetail" aria-selected="false">Policy</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link a-green" id="triggerConditionDetail-tab" data-toggle="tab" href="#triggerConditionDetail" role="tab" aria-controls="triggerConditionDetail" aria-selected="false">Condition</a>
                    </li>
                  </ul>

                  <div class="tab-content" id="showTriggerTabContent">

                    <div class="tab-pane fade show active" id="triggerActionDetail" role="tabpanel" aria-labelledby="triggerActionDetail-tab">

                      <div class="mb-3">
                        <label for="triggerName">Name</label>
                        <div class="input-group">
                          <input disabled type="text" class="form-control" id="triggerName" v-bind:placeholder="activeTrigger.name" required="true">
                        </div>
                      </div>

                      <div class="mb-3">
                        <label for="actionAssociated">Action associated</label>
                        <div class="input-group">
                          <select disabled class="form-control custom-select" id="actionAssociated" v-model="activeTrigger.action" required="true">
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
                            <input disabled id="dataPointReg" name="dataPointReg" type="radio" class="custom-control-input" :checked="activeTrigger.policy.type!='periodical'">
                            <label class="custom-control-label" for="dataPointReg">Data Point Registration</label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-3">
                          <div class="custom-control custom-radio">
                            <input disabled id="timePeriod" name="timePeriod" type="radio" class="custom-control-input" :checked="activeTrigger.policy.type=='periodical'">
                            <label class="custom-control-label" for="timePeriod">Time Period</label>
                          </div>
                        </div>
                      </div>

                      <div v-if="activeTrigger.policy.type=='periodical'">

                        <div class="mb-3">
                          <label for="triggerName">Granularity</label>
                          <div class="input-group">
                            <select disabled class="form-control custom-select" id="timeGranularity">
                              <option :value="activeTrigger.policy.time_interval">{{activeTrigger.policy.time_interval}}</option>
                            </select>

                          </div>
                        </div>

                      </div>

                      <div v-else>
                        <div class="mb-3">
                          <label for="fromDataStream">From Data Stream</label>
                          <div class="input-group">
                            <select disabled class="form-control custom-select" id="fromDataStream">
                              <option :value="activeTrigger.policy.data_stream">{{activeTrigger.policy.data_stream}}</option>
                            </select>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div class="tab-pane fade" id="triggerConditionDetail" role="tabpanel" aria-labelledby="triggerConditionDetail-tab">

                    <br>

                    <div v-if="activeTrigger.conditions.length<1" >
                            Always
                    </div>

                    <div v-else>

                      <div class="row">
                        <div class="col-4">
                          <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Current Data Stream value</a>
                            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Data Stream not updated</a>
                            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Time interval</a>
                          </div>
                        </div>
                        <div class="col-8">
                          <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">

                                <div v-for="condition in activeTrigger.conditions">
                                  <div v-if="condition.type=='data_stream_current_value'">
                                          <ul>
                                            <li>{{condition.data_stream}} {{condition.condition.operator}} {{condition.condition.value}}</li>
                                          </ul>
                                    </div>
                                </div>


                            </div>
                            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">

                            <div v-for="condition in activeTrigger.conditions">
                              <div v-if="condition.type=='data_stream_not_updated'">
                                    <ul>
                                      <li>{{condition.data_stream}} {{condition.condition.operator}} {{condition.condition.value}}</li>
                                    </ul>
                                </div>
                            </div>

                            </div>
                            <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">

                                <div v-for="condition in activeTrigger.conditions">
                                  <div v-if="condition.type=='time_interval'">
                                          <ul>
                                              <li> From: {{condition.from}} - To: {{condition.to}} </li>
                                          </ul>
                                    </div>
                                </div>

                            </div>
                          </div>
                        </div>
                    </div>

                    </div>

                    </div>
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

      showModalForTriggerDetails(){
        return this.$store.state.showModalForTriggerDetails;
      },

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

      hideModalForTriggerDetails: function () {
        this.$store.dispatch('hideModalForTriggerDetails');
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

  .a-green{
    color:#4AE387;
  }

  .button-green{
    background-color: #4AE387;
    color: white;
    font-family: Source Sans Pro, sans-serif;
  }

  .button-green:hover{
     background-color: #4AFF96;
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
