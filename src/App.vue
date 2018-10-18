<template>
  <div id="app" class="bg-light" v-cloak>

    <!--cosmos-header></cosmos-header-->
    <burguer-menu></burguer-menu>
    <add-stream-modal></add-stream-modal>
    <edit-stream-modal></edit-stream-modal>

    <add-command-modal></add-command-modal>

    <remove-elements-modal></remove-elements-modal>
    <add-action-modal></add-action-modal>
    <show-action-modal></show-action-modal>
    <edit-action-modal></edit-action-modal>

    <add-trigger-modal></add-trigger-modal>
    <data-points-modal></data-points-modal>
    <status-modal></status-modal>

    <router-view></router-view>
    
    <!--spinner></spinner-->

    <!--dashboard></dashboard>
    <data-stream-view></data-stream-view>
    <action-view></action-view>
    <trigger-view></trigger-view>
    <security-view></security-view-->



    <!-- FORM VALIDATIONS IN VUE JS => https://vuejs.org/v2/cookbook/form-validation.html -->

    <!--  SPINNER VERY COSMOS STYLE https://epic-spinners.epicmax.co/#/  -->

    <!--  Dependencies defined in package-lock.json 907  -->
    <!--  Dependencies defined in package.json 57 -->

  </div>
</template>


<script>
  import HelloWorld from './components/HelloWorld.vue'
  import PrimerComponente from './components/PrimerComponente.vue'
  import BurguerMenu from './components/BurguerMenu.vue'
  import Sarasa from './components/Sarasa.vue'
  import Header from './components/Header.vue'
  import SecurityView from './components/SecurityView.vue'
  import AddStreamModal from './components/AddStreamModal.vue'
  import Dashboard from './components/Dashboard.vue'
  import EditStreamModal from './components/EditStreamModal.vue'
  import RemoveElementsModal from './components/RemoveElementsModal.vue'
  import DataPointsModal from './components/DataPointsModal.vue'
  import AddActionModal from './components/AddActionModal.vue'
  import ShowActionModal from './components/ShowActionModal.vue'
  import EditActionModal from './components/EditActionModal.vue'
  import AddTriggerModal from './components/AddTriggerModal.vue'
  import AddCommandModal from './components/AddCommandModal.vue'
  import SuccessFailureModal from './components/SuccessFailureModal.vue'
  //import AboutView from './components/AboutView.vue'


  //import Spinner from './components/Spinner.vue'

  //import Chart from 'chart.js';

  export default {

  name: 'App',
    components: {

      //'spinner' : Spinner,
      //'about-view':AboutView,
      'status-modal' : SuccessFailureModal,
      'add-trigger-modal': AddTriggerModal,
      'edit-action-modal': EditActionModal,
      'show-action-modal': ShowActionModal,
      'add-action-modal': AddActionModal,
      'data-points-modal': DataPointsModal,
      'remove-elements-modal': RemoveElementsModal,
      'edit-stream-modal' : EditStreamModal,
      //'trigger-view': TriggerView,
      //'action-view': ActionView,
      'dashboard': Dashboard,
      'add-stream-modal': AddStreamModal,
      //'data-stream-view': DataStreamView,
      'security-view': SecurityView,
      'cosmos-header': Header,
      'burguer-menu': BurguerMenu,
      'add-command-modal' : AddCommandModal,
      HelloWorld,
      PrimerComponente,
      'sara-sa': Sarasa
  },
  mounted () {

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function() {
      'use strict';

      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

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
