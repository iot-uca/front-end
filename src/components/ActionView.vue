<template>

  <!-- div for showing the Actions add view -->
  <div id="actions" v-if="renderActionAddView" style="margin: 1.5%;">

    <div v-if="hasToDisplayLoadingFeedback">

      <spinner id="spinner"></spinner>

    </div>

    <div v-else class="row">

      <div class="col-md-12">

        <!--h4 class="mb-3"><small><strong>Existing actions</strong></small></h4>
        <hr-->

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

                <input v-if="getExistingActions().length>0" type="text" class="form-control" v-model="actionFilter" placeholder="Start typing to filter actions...">
                <input v-else type="text" class="form-control" v-model="actionFilter" placeholder="Start typing to filter actions..." readonly>

              </div>
            </div>
          </div>

          <div class="col-md-2">
            <!--button type="button" class="btn button-green button-green-action" data-toggle="modal" data-target="#addActionModal" @click="cleanActiveAction()" style="width: 100%;">Add action</button-->
            <button type="button" class="btn button-green button-green-action" @click="cleanActiveAction(); displayModalForActionAdding();" style="width: 100%;">Add action</button>
          </div>

          <div class="col-md-2">
            <button v-if="getElementsToDelete().length<1" type="button" disabled class="btn button-main button-secondary" style="width: 100%;">Delete</button>
            <button v-else type="button" class="btn button-green button-green-danger" @click="displayModalForRemovingElements()" style="width: 100%;">Delete</button>

          </div>
        </div>

        <div v-if="getActionsForPage().length==0">
        <br>
        <br>
        <p class="text-center"><strong><em>There are currently no actions configured in the system</em></strong></p>
        <br>
        <br>
        </div>

        <table v-if="getActionsForPage().length>0" class="table table-striped table-responsive table-sm" style="width: 100%;">
          <thead style="background-color: #2b2c37;">
          <tr>
            <th scope="col" style="width: 1%"></th>
            <th scope="col" style="width: 40%; color: white;">Name</th>
            <th scope="col" style="width: 10%; color: white;">Method</th>
            <th scope="col" style="width: 40%; color: white;">URL</th>
            <th scope="col" style="width: 7%; color: white;">Version</th>
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

            <td v-if="action.http_request.request_line.method!==undefined">{{action.http_request.request_line.method}}</td>
            <td v-else class="text-center">-</td>

            <td v-if="action.http_request.request_line.url!=undefined">{{action.http_request.request_line.url}}</td>
            <td v-else class="text-center">-</td>

            <td v-if="action.http_request.request_line.version!=undefined">{{action.http_request.request_line.version}}</td>
            <td v-else class="text-center">-</td>

            <td>
              <button type="button" class="btn button-green button-green-view btn-sm" style="height: 75%;" @click="assignBodyAndHeader(action); displayModalForActionDetails();">
                <i class="fa fa-eye"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn button-green button-green-edit btn-sm" @click="assignBodyAndHeader(action); displayModalForActionEditing();">
                <i class="fa fa-pencil-square-o"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>

        <div v-if="getActionsForPage().length>0" class="row">
          <br>
          <p></p>
          <br>
          <div class="col-md-4 text-muted">
            <p>Showing <strong>{{getActionsForPage().length}}</strong> out of <strong>{{getExistingActions().length}}</strong> entries</p>
          </div>
          <div v-if="getActionsForPage().length>0" class="col-md-8">

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

    </div>

  </div>

</template>

<script>
  import Spinner from './Spinner.vue'

  export default {

    components:{
      'spinner' : Spinner,
    },

    mounted(){
      this.$store.dispatch('showActionView', this.$store.state.backendEndPoint);
    },

    computed:{
      renderActionAddView(){
        return this.$store.state.renderActionAddView;
      },

      hasToDisplayLoadingFeedback() {
        return this.$store.state.displayLoadingFeedback;
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

    displayModalForActionDetails: function (){
      this.$store.dispatch('displayModalForActionDetails');
    },

      displayModalForRemovingElements: function (){
        this.$store.dispatch('displayModalForRemovingElements');
      },

      displayModalForActionEditing: function (){
        this.$store.dispatch('displayModalForActionEditing');
      },

      displayModalForActionAdding: function (){
        this.$store.dispatch('displayModalForActionAdding');
      },
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

      addElementToDeleteList: function (action) {
        this.$store.dispatch('addElementToDeleteList', action);
      },

      assignBodyAndHeader: function(action){
        this.$store.dispatch('assignBodyAndHeader', action);
      },

      cleanActiveAction: function () {
        this.$store.dispatch('cleanActiveAction');
      },


    }

  }


</script>


<style scoped>

  #spinner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .button-green{
    background-color: #4AFF82;
    color: white;
    font-family: Source Sans Pro, sans-serif;
  }

  .button-green:hover{
     background-color: #4AFF96;
  }

  .pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover {
      background-color: #4AFF82;
      border-color: #4AFF82;
    }
      
</style>
