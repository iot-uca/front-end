<template>
  <div id="app" class="bg-light" v-cloak>

    <cosmos-header></cosmos-header>
    <burguer-menu></burguer-menu>

    <dashboard></dashboard>
    <data-stream-view></data-stream-view>
    <action-view></action-view>
    <security-view></security-view>

    <edit-stream-modal></edit-stream-modal>


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
  import EditStreamModal from './components/EditStreamModal.vue'
  import Dashboard from './components/Dashboard.vue'
  import ActionView from './components/ActionView.vue'

  export default {

  name: 'App',
    components: {
      'action-view': ActionView,
      'dashboard': Dashboard,
      'edit-stream-modal': EditStreamModal,
      'data-stream-view': DataStreamView,
      'security-view': SecurityView,
      'cosmos-header': Header,
      'burguer-menu': BurguerMenu,
      HelloWorld,
      PrimerComponente,
      'sara-sa': Sarasa
  },
  data () {
    return {

    }
  }

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
