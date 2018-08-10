<template>
  <div id="app" class="bg-light" v-cloak>

    <cosmos-header></cosmos-header>
    <burguer-menu></burguer-menu>

    <dashboard></dashboard>
    <data-stream-view></data-stream-view>
    <action-view></action-view>
    <trigger-view></trigger-view>
    <security-view></security-view>

    <add-stream-modal></add-stream-modal>
    <edit-stream-modal></edit-stream-modal>

    <remove-elements-modal></remove-elements-modal>

    <data-points-modal></data-points-modal>

    <add-action-modal></add-action-modal>
    <show-action-modal></show-action-modal>
    <edit-action-modal></edit-action-modal>

    <add-trigger-modal></add-trigger-modal>

    <!--trigger-bar-chart></trigger-bar-chart-->

  </div>
</template>


<script>
  import HelloWorld from './components/HelloWorld.vue'
  import PrimerComponente from './components/PrimerComponente.vue'
  import BurguerMenu from './components/BurguerMenu.vue'
  import Sarasa from './components/Sarasa.vue'
  import Header from './components/Header.vue'
  import SecurityView from './components/SecurityView.vue'
  import DataStreamView from './components/DataStreamView.vue'
  import AddStreamModal from './components/AddStreamModal.vue'
  import Dashboard from './components/Dashboard.vue'
  import ActionView from './components/ActionView.vue'
  import TriggerView from './components/TriggerView.vue'
  import EditStreamModal from './components/EditStreamModal.vue'
  import RemoveElementsModal from './components/RemoveElementsModal.vue'
  import DataPointsModal from './components/DataPointsModal.vue'
  import AddActionModal from './components/AddActionModal.vue'
  import ShowActionModal from './components/ShowActionModal.vue'
  import EditActionModal from './components/EditActionModal.vue'
  import AddTriggerModal from './components/AddTriggerModal.vue'
  //import TriggersBarChart from './components/TriggersBarChart.vue'

  import Chart from 'chart.js';

  export default {

  name: 'App',
    components: {
      //'trigger-bar-chart': TriggersBarChart,
      'add-trigger-modal': AddTriggerModal,
      'edit-action-modal': EditActionModal,
      'show-action-modal': ShowActionModal,
      'add-action-modal': AddActionModal,
      'data-points-modal': DataPointsModal,
      'remove-elements-modal': RemoveElementsModal,
      'edit-stream-modal' : EditStreamModal,
      'trigger-view': TriggerView,
      'action-view': ActionView,
      'dashboard': Dashboard,
      'add-stream-modal': AddStreamModal,
      'data-stream-view': DataStreamView,
      'security-view': SecurityView,
      'cosmos-header': Header,
      'burguer-menu': BurguerMenu,
      HelloWorld,
      PrimerComponente,
      'sara-sa': Sarasa
  },
  mounted () {

      new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{
          data: [86,114,106,106,107,111,133,221,783,2478],
          label: "Africa",
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
        /*legend: {
            display: false
        }*/
      }
    });
  },

  }

</script>

<style>
  /* darle tiempo a que renderice */
  [v-cloak]{
    display: none;
  }

  #app {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  }
</style>
