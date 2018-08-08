<template>

  <!-- div for showing the Data Stream add view -->
  <div v-if="renderDataStreamView">

    <i v-if="hasToDisplayLoadingFeedback()" class="fa fa-spinner fa-spin" style="font-size: 5rem; padding-left: 50%; padding-right: 50%;"></i>

    <div class="row">
      <br>

      <div class="col-md-1">
      </div>

      <div class="col-md-10">

        <h4 class="mb-3"><small><strong>Existing data streams</strong></small></h4>
        <hr>

        <div class="row">

          <div class="col-md-3">
            <div class="form-group form-inline well">
              <label class="mr-sm-2 text-muted">Entries for page: </label>
              <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="httpMethod" v-model="maxDataStreamsPerPage">
                <option v-for="elem in getOptionsOfEntriesPerPage()" v-bind:value="elem.value">
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

                <input type="text" class="form-control" v-model="dataStreamFilter" placeholder="Start typing to filter data streams...">

              </div>
            </div>
          </div>

          <div class="col-md-2">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addDataStreamModal" style="width: 100%;"><strong>Add stream</strong></button>
          </div>

          <div class="col-md-2">
            <button v-if="getElementsToDelete().length<1" type="button" disabled class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>
            <button v-else type="button" class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>

          </div>
        </div>

        <table class="table table-striped table-responsive table-sm" style="width: 100%">
          <thead class="thead-dark">
            <tr>
              <th scope="col" style="width: 2%"></th>
              <th scope="col" style="width: 92%">Name</th>
              <th scope="col" style="width: 3%"></th>
              <th scope="col" style="width: 3%"></th>
            </tr>
          </thead>
          <tbody>


          <tr v-for="dataStream in getDataStreamsForPage()">
            <td>
              <div class="custom-control custom-checkbox" >
                <input type="checkbox" :id="dataStream.name" class="custom-control-input" @click="addElementToDeleteList(dataStream)">
                <label :for="dataStream.name" class="custom-control-label"></label>
              </div>
            </td>
            <td>{{dataStream.name}}</td>
            <td>
              <button type="button" class="btn btn-success btn-sm" @click="showDataStream(dataStream)" data-toggle="modal" data-target="#editDataStreamModal" style="height: 75%;">
                <i class="fa fa-bar-chart"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-info btn-sm" @click="editDataStreams(dataStream)" data-toggle="modal" data-target="#editDataStreamModal" style="height: 75%;">
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
            <p>Showing <strong>{{getDataStreamsForPage().length}}</strong> out of <strong>{{getDataStreamsConfigured().length}}</strong> entries</p>
          </div>
          <div class="col-md-8">
            <!--     Table pagination     -->
            <nav aria-label="Page navigation data streams">
              <ul class="pagination justify-content-end">
                <li v-bind:class="[getCurrentPage() > 1 ? 'page-item': 'page-item disabled']">
                  <a @click="displayPrevPage()" class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li v-for="number in getPagesNeededForDataStreams()" v-bind:class="[getCurrentPage() === number ? 'page-item active': 'page-item']" @click="getElementsToShowInTable(number)"><a class="page-link" href="#">{{number}}</a></li>
                <li v-bind:class="[getCurrentPage()<getPagesNeededForDataStreams() ? 'page-item': 'page-item disabled']">
                  <a @click="displayNextPage()" class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>

        </div>


      </div>

      <div class="col-md-1">
      </div>
    </div>
    <!--/div-->
  </div>

</template>

<script>

  import {mapActions} from 'vuex';

  export default{

    computed:{
      maxDataStreamsPerPage: {
        // getter
        get: function () {
          return this.$store.state.maxDataStreamsPerPage;
        },
        // setter
        set: function (newValue) {
          console.log("#### Entering maxDataStreamsPerPage watcher");
          this.$store.dispatch('setMaxDataStreamsPerPage', newValue);
        }
      },
      renderDataStreamView(){
        return this.$store.state.renderDataStreamView;
      },
      dataStreamFilter: {
        // getter
        get: function () {
          return this.$store.state.dataStreamFilter;
        },
        // setter
        set: function (newValue) {
          console.log("#### Entering dataStreamFilter watcher");
          this.$store.dispatch('filterDataStreamToDisplay', newValue);
        }
      }


    },

    methods: {

      hasToDisplayLoadingFeedback: function () {
        return this.$store.state.displayLoadingFeedbackDataStreams;
      },

      getMaxDataStreamsPerPage: function () {
        return this.$store.state.maxDataStreamsPerPage;
      },

      getOptionsOfEntriesPerPage: function () {
        return this.$store.state.optionsOfEntriesPerPage;
      },

      getDataStreamFilter: function () {
        return this.$store.state.dataStreamFilter;
      },

      getElementsToDelete: function () {
        return this.$store.state.elementsToDelete;
      },

      getDataStreamsForPage: function () {
        return this.$store.state.dataStreamsForPage;
      },

      getDataStreamsConfigured: function(){
        return this.$store.state.dataStreamsConfigured;
      },

      getCurrentPage: function () {
        return this.$store.state.currentPage;
      },

      getPagesNeededForDataStreams: function(){
        return this.$store.state.pagesNeededForDataStreams;
      },

      displayPrevPage: function () {
        this.$store.dispatch('displayPrevPageDataStream');
      },

      displayNextPage: function () {
        this.$store.dispatch('displayNextPageDataStream');
      },

      getElementsToShowInTable(number){
        console.log("ENTERING WITH: " + number);
        this.$store.dispatch('getDataStreamsToShowInTable', number);
      },
/*
      editDataStreams: function (dataStream) {
        this.$store.dispatch('editDataStreams',dataStream);
      },*/

/*      addElementToDeleteList: function (dataStream) {
        this.$store.state.dispatch('updateDataStreamsForPage', currentElems);
      },

      showDataStream: function (dataStream) {
        this.$store.state.dispatch('updateDataStreamsForPage', currentElems);
      },

      editDataStream: function (dataStream) {
        this.$store.state.dispatch('updateDataStreamsForPage', currentElems);
      }*/

      ...mapActions([
        'addElementToDeleteList', 'showDataStream', 'editDataStreams'
      ]),

  }

  }
</script>



<style scoped>


</style>
