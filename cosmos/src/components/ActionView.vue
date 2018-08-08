<template>

  <!-- div for showing the Actions add view -->
  <div id="actions" v-if="renderActionAddView">
    <div class="row">
      <br>

      <div class="col-md-1">
      </div>

      <div class="col-md-10">

        <h4 class="mb-3"><small><strong>Existing actions</strong></small></h4>
        <hr>

        <div class="row">

          <div class="col-md-3">
            <div class="form-group form-inline well">
              <label for="httpMethod" class="mr-sm-2 text-muted">Entries for page: </label>
              <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="httpMethod" v-model="maxActionsPerPage">
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

                <input type="text" class="form-control" v-model="actionFilter" placeholder="Start typing to filter actions..." required="true">

              </div>
            </div>
          </div>

          <div class="col-md-2">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addActionModal" style="width: 100%;"><strong>Add action</strong></button>
          </div>

          <div class="col-md-2">
            <button v-if="getElementsToDelete().length<1" type="button" disabled class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>
            <button v-else type="button" class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>
          </div>
        </div>

        <table class="table table-striped table-responsive table-sm" style="width: 100%;">
          <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 1%"></th>
            <th scope="col" style="width: 30%;">Name</th>
            <th scope="col" style="width: 11%;">Type</th>
            <th scope="col" style="width: 11%;">Priority</th>
            <th scope="col" style="width: 10%">Method</th>
            <th scope="col" style="width: 28%;">URL</th>
            <th scope="col" style="width: 7%;">Version</th>
            <th scope="col" style="width: 1%"></th>
            <th scope="col" style="width: 1%"></th>
          </tr>
          </thead>
          <tbody class="table-hover">
          <tr v-for="(action, index) in getActionsForPage()">
            <td>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" :id="action.name" class="custom-control-input" @click="addElementToDeleteList(action)">
                <label :for="action.name" class="custom-control-label"></label>
              </div>
            </td>
            <td>{{action.name}}</td>
            <td>{{action.type}}</td>

            <td v-if="action.priority!=undefined">{{action.priority}}</td>
            <td v-else class="text-center">-</td>

            <td v-if="action.method!=undefined">{{action.method}}</td>
            <td v-else class="text-center">-</td>

            <td v-if="action.url!=undefined">{{action.url}}</td>
            <td v-else class="text-center">-</td>

            <td v-if="action.version!=undefined">{{action.version}}</td>
            <td v-else class="text-center">-</td>

            <td>
              <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#showActionDetailModal" style="height: 75%;" @click="assignBodyAndHeader(action)">
                <i class="fa fa-eye"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-info btn-sm" data-toggle="modal" @click="editAction(action)"  data-target="#editActionModal">
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
            <p>Showing <strong>{{getActionsForPage().length}}</strong> out of <strong>{{getExistingActions().length}}</strong> entries</p>
          </div>
          <div class="col-md-8">

            <!--     Table pagination     -->
            <nav aria-label="Page navigation actions">
              <ul class="pagination justify-content-end">
                <li v-bind:class="[getCurrentPage() > 1 ? 'page-item': 'page-item disabled']">
                  <a @click="actionsForPage = displayPrevPage()" class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li v-for="number in getPagesNeededForActions()" v-bind:class="[getCurrentPage() == number ? 'page-item active': 'page-item']" @click="getElementsToShowInTable(number)"><a class="page-link" href="#">{{number}}</a></li>
                <li v-bind:class="[getCurrentPage()<getPagesNeededForActions() ? 'page-item': 'page-item disabled']">
                  <a @click="actionsForPage = displayNextPage()" class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div class="col-md-1">
      </div>
    </div>

  </div>

</template>

<script>

  export default {

    computed:{
      renderActionAddView(){
        return this.$store.state.renderActionAddView;
      },

      maxActionsPerPage: {
        // getter
        get: function () {
          return this.$store.state.maxActionsPerPage;
        },
        // setter
        set: function (newValue) {
          console.log("#### Entering maxActionsPerPage watcher");
          this.$store.dispatch('setMaxActionsPerPage', newValue);
        }
      },

      actionFilter: {
        // getter
        get: function () {
          return this.$store.state.actionFilter;
        },
        // setter
        set: function (newValue) {
          console.log("#### Entering actionFilter watcher");
          this.$store.dispatch('filterActionsToDisplay', newValue);
        }
      },



    },
    methods:{
      getOptionsOfEntriesPerPage: function () {
        return this.$store.state.optionsOfEntriesPerPage;
      },
      getElementsToDelete: function () {
        return this.$store.state.elementsToDelete;
      },
      getActionsForPage: function () {
        return this.$store.state.actionsForPage;
      },
      getExistingActions: function () {
        return this.$store.state.existingActions;
      },
      getCurrentPage: function () {
        return this.$store.state.currentPage;
      },
      getPagesNeededForActions: function(){
        return this.$store.state.pagesNeededForActions;
      },
      displayPrevPage: function () {
        this.$store.dispatch('displayPrevPageActions');
      },

      displayNextPage: function () {
        this.$store.dispatch('displayNextPageActions');
      },

      getElementsToShowInTable(number){
        console.log("ENTERING WITH: " + number);
        this.$store.dispatch('getActionsToShowInTable', number);
      },
    }

  }


</script>


<style scoped>




</style>
