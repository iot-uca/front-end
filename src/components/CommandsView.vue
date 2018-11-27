<template>

<!-- div for showing the Commands view -->
<div id="commands" v-if="renderCommandsView" style="margin: 1.5%;">

  <div v-if="hasToDisplayLoadingFeedback">

    <spinner id="spinner"></spinner>

  </div>

  <div v-else class="row">

    <div class="col-md-12">

      <div class="row">

        <div class="col-md-3">
          <div class="form-group form-inline well">
            <label for="httpMethod" class="mr-sm-2 text-muted">Entries for page: </label>
            <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="httpMethod" v-model="maxCommandsPerPage">
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

              <input v-if="getExistingCommands().length>0" type="text" class="form-control" v-model="commandFilter" placeholder="Start typing to filter commands...">
              <input v-else type="text" class="form-control" v-model="commandFilter" placeholder="Start typing to filter commands..." readonly>

            </div>
          </div>
        </div>

        <div class="col-md-2">
          <!--button type="button" class="btn button-green button-green-action" data-toggle="modal" data-target="#addCommandModal" style="width: 100%;">Add command</button-->
          <button type="button" class="btn button-green button-green-action" @click="displayModalForCommandAdding();" style="width: 100%;">Add command</button>
        </div>

        <div class="col-md-2">
          <button v-if="getElementsToDelete().length<1" type="button" disabled class="btn button-green" style="width: 100%;">Delete</button>
          <!--button v-else type="button" class="btn button-green" data-toggle="modal" data-target="#removeElements" style="width: 100%;">Delete</button-->
          <button v-else type="button" class="btn button-green" style="width: 100%;" @click="displayModalForRemovingElements()">Delete</button>

        </div>
      </div>

      <div v-if="getCommandsForPage().length==0">
        <br>
        <br>
        <p class="text-center"><strong><em>There are currently no commands configured in the system</em></strong></p>
        <br>
        <br>
      </div>

      <table v-if="getCommandsForPage().length>0" class="table table-striped table-responsive table-sm" style="width: 100%;">
        <thead style="background-color: #2b2c37;">
        <tr>
          <th scope="col" style="width: 2%"></th>
          <th scope="col" style="width: 62%; color: white;">Name</th>
          <th scope="col" style="width: 36%; color: white;">Priority</th>
          <!--th scope="col" style="width: 2%"></th-->
        </tr>
        </thead>
        <tbody class="table-hover">
        <tr v-for="(command, index) in getCommandsForPage()">
          <td>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" :id="command.command" class="custom-control-input" @click="addElementToDeleteList(command)">
              <label :for="command.command" class="custom-control-label"></label>
            </div>
          </td>

          <td>{{command.command}}</td>

          <td>{{command.priority}}</td>

          <!--td>
            <button type="button" class="btn button-green button-green-edit btn-sm" data-toggle="modal" data-target="#editCommandModal">
              <i class="fa fa-pencil-square-o"></i>
            </button>
          </td-->
        </tr>
        </tbody>
      </table>

      <div class="row">
        <br>
        <p></p>
        <br>
        <div class="col-md-4 text-muted">
          <p>Showing <strong>{{getCommandsForPage().length}}</strong> out of <strong>{{getExistingCommands().length}}</strong> entries</p>
        </div>
        <div v-if="getCommandsForPage().length>0" class="col-md-8">

          <!--     Table pagination     -->
          <nav aria-label="Page navigation actions">
            <ul class="pagination justify-content-end">
              <li v-bind:class="[getCurrentPage() > 1 ? 'page-item': 'page-item disabled']">
                <a @click="commandsForPage = displayPrevPage()" class="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li v-for="number in getPagesNeededForCommands()" v-bind:class="[getCurrentPage() == number ? 'page-item active': 'page-item']" @click="getElementsToShowInTable(number)"><a class="page-link" href="#">{{number}}</a></li>
              <li v-bind:class="[getCurrentPage()<getPagesNeededForCommands() ? 'page-item': 'page-item disabled']">
                <a @click="commandsForPage = displayNextPage()" class="page-link" href="#">Next</a>
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
    console.log("########### ENTERING mounted ###########");
    this.$store.dispatch('showCommandView', this.$store.state.backendEndPoint);
  },

  computed:{

    hasToDisplayLoadingFeedback() {
      return this.$store.state.displayLoadingFeedback;
    },

    renderCommandsView(){
      return this.$store.state.renderCommandsView;
    },

    maxCommandsPerPage: {
      // getter
      get: function () {
        return this.$store.state.maxCommandsPerPage;
      },
      // setter
      set: function (newValue) {
        console.log("#### Entering maxCommandsPerPage watcher");
        this.$store.dispatch('setMaxCommandsPerPage', newValue);
      }
    },

    commandFilter: {
      // getter
      get: function () {
        return this.$store.state.commandFilter;
      },
      // setter
      set: function (newValue) {
        console.log("#### Entering commandFilter watcher");
        this.$store.dispatch('filterCommandsToDisplay', newValue);
      }
    },



  },
  methods:{

    displayModalForRemovingElements: function(){
      this.$store.dispatch('displayModalForRemovingElements');
    },

    displayModalForCommandAdding: function (){
      this.$store.dispatch('displayModalForCommandAdding');
    },
    getOptionsOfEntriesPerPage: function () {
      return this.$store.state.optionsOfEntriesPerPage;
    },
    getElementsToDelete: function () {
      return this.$store.state.elementsToDelete;
    },
    getCommandsForPage: function () {
      return this.$store.state.commandsForPage;
    },
    getExistingCommands: function () {
      return this.$store.state.existingCommands;
    },
    getCurrentPage: function () {
      return this.$store.state.currentPage;
    },
    getPagesNeededForCommands: function(){
      return this.$store.state.pagesNeededForCommands;
    },
    displayPrevPage: function () {
      this.$store.dispatch('displayPrevPageCommands');
    },

    displayNextPage: function () {
      this.$store.dispatch('displayNextPageCommands');
    },

    getElementsToShowInTable(number){
      console.log("ENTERING WITH: " + number);
      this.$store.dispatch('getCommandsToShowInTable', number);
    },

    addElementToDeleteList: function (command) {
      this.$store.dispatch('addElementToDeleteList', command);
    }

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

</style>
