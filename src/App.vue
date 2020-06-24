<template>
  <div id="app" class="bg-light" v-cloak>

    <burguer-menu></burguer-menu>
    <add-stream-modal></add-stream-modal>
    <add-command-modal></add-command-modal
    <remove-elements-modal></remove-elements-modal>
    <add-action-modal></add-action-modal>
    <show-action-modal></show-action-modal>
    <add-trigger-modal></add-trigger-modal>
    <data-points-modal></data-points-modal>
    <status-modal></status-modal>
    <show-trigger-modal></show-trigger-modal>
    <router-view></router-view>
    <add-data-point-modal></add-data-point-modal>

  </div>
</template>


<script>
  import BurguerMenu from './components/BurguerMenu.vue'
  import AddStreamModal from './components/AddStreamModal.vue'
  import Dashboard from './components/Dashboard.vue'
  import RemoveElementsModal from './components/RemoveElementsModal.vue'
  import DataPointsModal from './components/DataPointsModal.vue'
  import AddActionModal from './components/AddActionModal.vue'
  import ShowActionModal from './components/ShowActionModal.vue'
  import AddTriggerModal from './components/AddTriggerModal.vue'
  import ShowTriggerModal from './components/ShowTriggerModal.vue'
  import AddCommandModal from './components/AddCommandModal.vue'
  import SuccessFailureModal from './components/SuccessFailureModal.vue'
  import AddDataPointModal from './components/AddDataPointModal.vue'

  export default {

  name: 'App',
    components: {
      'status-modal' : SuccessFailureModal,
      'add-trigger-modal': AddTriggerModal,
      'show-action-modal': ShowActionModal,
      'add-action-modal': AddActionModal,
      'data-points-modal': DataPointsModal,
      'remove-elements-modal': RemoveElementsModal,
      'dashboard': Dashboard,
      'add-stream-modal': AddStreamModal,
      'show-trigger-modal': ShowTriggerModal,
      'burguer-menu': BurguerMenu,
      'add-command-modal' : AddCommandModal,
      'add-data-point-modal': AddDataPointModal,
  },
  mounted () {

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
