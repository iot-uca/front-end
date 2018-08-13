<template>

  <!-- div for showing the Triggers add view -->
  <div id="triggers" v-if="renderTriggerAddView" style="margin: 1.5%;">

    <div class="row">
      <br>

      <!--div class="col-md-1">
      </div-->

      <div class="col-md-12">
        <!--h4 class="mb-3"><small><strong>Existing triggers</strong></small></h4>
        <hr-->

        <div class="row">

          <div class="col-md-3">
            <div class="form-group form-inline well">
              <label class="mr-sm-2 text-muted">Entries for page: </label>
              <select class="custom-select mb-2 mr-sm-2 mb-sm-0" v-model="maxTriggersPerPage">
                <option v-for="(elem, index) in getOptionsOfEntriesPerPage()" v-bind:value="elem.value">
                  {{elem.value}}
                </option>
              </select>
            </div>
          </div>

          <div class="col-md-5">
            <div class="mb-3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>

                <input type="text" class="form-control" v-model="triggerFilter" placeholder="Start typing to filter triggers..." required="true">

              </div>
            </div>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addTriggerModal" style="width: 100%;"><strong>Add trigger</strong></button>
          </div>

          <div class="col-md-2">
            <button v-if="getElementsToDelete().length<1" type="button" disabled class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>
            <button v-else type="button" class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>
          </div>
        </div>

        <table class="table table-striped table-responsive table-sm" style="width: 100%;">
          <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 2%;"></th>
            <th scope="col" style="width: 25%;">Name</th>
            <th scope="col" style="width: 30%;">Action</th>
            <th scope="col" style="width: 26%;">Policy Type</th>
            <th scope="col" style="width: 15%;">Policy Elem</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody class="table-hover">
          <!--tr v-for="t in triggersForPage" v-bind:trigger="t" is="trigger-table-row"></tr-->
          <!--Refenrenced in ..... https://github.com/vuejs/Discussion/issues/204 -->

          <tr v-for="(trigger, index) in getTriggersForPage()">
            <td>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" :id="trigger.name" class="custom-control-input" @click="addElementToDeleteList(trigger)">
                <label :for="trigger.name" class="custom-control-label"></label>
              </div>
            </td>
            <td>{{trigger.name}}</td>
            <td>{{trigger.action}}</td>
            <td>{{trigger.policy.type}}</td>
            <td>{{trigger.policy.elem}}</td>

            <td>
              <button type="button" class="btn btn-success btn-sm" @click="editTrigger(trigger)" data-toggle="modal" data-target="#showTriggerModal" style="height: 75%;">
                <i class="fa fa-eye"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-info btn-sm" @click="editTrigger(trigger)" data-toggle="modal" data-target="#editTriggerModal" style="height: 75%;">
                <i class="fa fa-pencil-square-o"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>


        <div class="row">
          <br>
          <p></p>
          <br>
          <div class="col-md-4 text-muted">
            <p>Showing <strong>{{getTriggersForPage().length}}</strong> out of <strong>{{getExistingTriggers().length}}</strong> entries</p>
          </div>
          <div class="col-md-8">

            <!--     Table pagination     -->
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-end">
                <li v-bind:class="[getCurrentPage() > 1 ? 'page-item': 'page-item disabled']">
                  <a @click="displayPrevPage()" class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li v-for="number in getPagesNeededForTriggers()" v-bind:class="[getCurrentPage() == number ? 'page-item active': 'page-item']" @click="getElementsToShowInTable(number)"><a class="page-link" href="#">{{number}}</a></li>
                <li v-bind:class="[getCurrentPage()<getPagesNeededForTriggers() ? 'page-item': 'page-item disabled']">
                  <a @click="displayNextPage()" class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </div>

      <!--div class="col-md-1">
      </div-->
    </div>
  </div>



</template>

<script>

  export default {

    computed: {
      renderTriggerAddView() {
        return this.$store.state.renderTriggerAddView;
      },

      maxTriggersPerPage: {
        // getter
        get: function () {
          return this.$store.state.maxTriggersPerPage;
        },
        // setter
        set: function (newValue) {
          console.log("#### Entering maxTriggersPerPage watcher");
          this.$store.dispatch('setMaxTriggersPerPage', newValue);
        }
      },

      triggerFilter: {
        // getter
        get: function () {
          return this.$store.state.triggerFilter;
        },
        // setter
        set: function (newValue) {
          console.log("#### Entering triggerFilter watcher");
          this.$store.dispatch('filterTriggersToDisplay', newValue);
        }
      },


    },
    methods: {
      getOptionsOfEntriesPerPage: function () {
        return this.$store.state.optionsOfEntriesPerPage;
      },
      getElementsToDelete: function () {
        return this.$store.state.elementsToDelete;
      },
      getTriggersForPage: function () {
        return this.$store.state.triggersForPage;
      },
      getExistingTriggers: function () {
        return this.$store.state.existingTriggers;
      },
      getCurrentPage: function () {
        return this.$store.state.currentPage;
      },
      getPagesNeededForTriggers: function () {
        return this.$store.state.pagesNeededForTriggers;
      },
      displayPrevPage: function () {
        this.$store.dispatch('displayPrevPageTriggers');
      },

      displayNextPage: function () {
        this.$store.dispatch('displayNextPageTriggers');
      },

      getElementsToShowInTable(number) {
        console.log("ENTERING WITH: " + number);
        this.$store.dispatch('getTriggersToShowInTable', number);
      },

      addElementToDeleteList: function (trigger) {
        this.$store.dispatch('addElementToDeleteList', trigger);
      },

      editTrigger: function (trigger) {
        this.$store.dispatch('editTrigger', trigger);
      }
    }
  }

</script>

<style scoped>


</style>
