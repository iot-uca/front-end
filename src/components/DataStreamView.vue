<template>

  <!-- div for showing the Data Stream add view -->
  <div v-if="renderDataStreamView" style="margin: 1.5%;">

    <div v-if="hasToDisplayLoadingFeedback">

      <spinner id="spinner"></spinner>

    </div>

    <div v-else class="row">

      <div class="col-md-12">

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

                <input v-if="getDataStreamsConfigured().length>0" type="text" class="form-control" v-model="dataStreamFilter" placeholder="Start typing to filter data streams...">
                <input v-else type="text" readonly class="form-control" v-model="dataStreamFilter" placeholder="Start typing to filter data streams...">


              </div>
            </div>
          </div>

          <div class="col-md-2">
            <button type="button" class="btn button-green" @click="displayModalForStreamAdding()" style="width: 100%;">Add stream</button>
          </div>

          <div class="col-md-2">
            <button v-if="getElementsToDelete().length<1" type="button" disabled class="btn button-main button-secondary" style="width: 100%;">Delete</button>
            <button v-else type="button" class="btn button-green" style="width: 100%;" @click="displayModalForRemovingElements();">Delete</button>

          </div>
        </div>

        <div v-if="dataStreamsForPage.length==0">
        <br>
        <br>
        <p class="text-center"><strong>There are currently no data streams configured in the system</strong></p>
        <br>
        <br>
        </div>

        <table v-if="dataStreamsForPage.length>0"  class="table table-striped table-responsive table-sm w-100">
          <thead style="background-color: #2b2c37;">
            <tr>
              <th scope="col" style="width: 2%"></th>
              <th scope="col" style="width: 77%; color: white;">Name</th>
              <th scope="col" style="width: 15%; color: white;">Current Value</th>
              <th scope="col" style="width: 3%"></th>
              <th scope="col" style="width: 3%"></th>
            </tr>
          </thead>
          <tbody>


          <tr v-for="dataStream in dataStreamsForPage">
            <td>
              <div class="custom-control custom-checkbox" >
                <input type="checkbox" :id="dataStream.name" class="custom-control-input" @click="addElementToDeleteList(dataStream)">
                <label :for="dataStream.name" class="custom-control-label"></label>
              </div>
            </td>
            <td>{{dataStream.name}}</td>
            <td>{{dataStream.current_value}}</td>
            <td>
              <a @click="showDataStream(dataStream); getDataPoints();" data-toggle="modal" data-target="#dataPointsForStreamModal" style="color:#4AFF82"><i class="fa fa-bar-chart"></i></a>
            </td>
            <td>
              <a @click="displayModalForDataPointsAdding();" style="color:#4AFF82"><i class="fa fa-plus"></i></a>
            </td>

          </tr>
          </tbody>
        </table>

        <div v-if="dataStreamsForPage.length>0" class="row" id="footer">
          <br>
          <p></p>
          <br>
          <div class="col-md-4 text-muted">
            <p>Showing <strong>{{dataStreamsForPage.length}}</strong> out of <strong>{{getDataStreamsConfigured().length}}</strong> entries</p>
          </div>
          <div v-if="dataStreamsForPage.length>0" class="col-md-8">
            <!--     Table pagination     -->
            <nav aria-label="Page navigation data streams">
              <ul class="pagination justify-content-end">
                <li v-bind:class="[getCurrentPage() > 1 ? 'page-item': 'page-item disabled']" >
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

    </div>

  </div>

</template>

<script>

  import {mapActions} from 'vuex';
  import Spinner from './Spinner.vue'

  export default{

    components:{
      'spinner' : Spinner,
    },

    mounted(){
      this.$store.dispatch('showDataStreamView', this.$store.state.backendEndPoint);
    },

    computed:{

      hasToDisplayLoadingFeedback() {
        return this.$store.state.displayLoadingFeedback;
      },

      maxDataStreamsPerPage: {
        // getter
        get: function () {
          return this.$store.state.maxDataStreamsPerPage;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setMaxDataStreamsPerPage', newValue);
        }
      },

      dataStreamsForPage: {
        // getter
        get: function () {
          return this.$store.state.dataStreamsForPage;
        },
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
          this.$store.dispatch('filterDataStreamToDisplay', newValue);
        }
      }


    },

    methods: {

      getDataPoints: function () {
        this.$store.dispatch('getDataPoints');
      },

      displayModalForDataPointsAdding: function () {
        this.$store.dispatch('displayModalForDataPointsAdding');
      },

      displayModalForRemovingElements: function () {
        this.$store.dispatch('displayModalForRemovingElements');
      },

      displayModalForStreamAdding: function () {
        this.$store.dispatch('displayModalForStreamAdding');
      },

      displayModalForStreamEditing: function () {
        this.$store.dispatch('displayModalForStreamEditing');
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

      editDataStreams: function (dataStream) {
        this.$store.dispatch('editDataStreams',dataStream);
      },

      ...mapActions([
        'addElementToDeleteList', 'showDataStream'//, 'editDataStreams'
      ]),

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
  .page-link{
     color:#4AFF96;
  }

  .page-link:hover{
     color:#4AFF96;
  }

li.disabled{
	color: #dc3545;
}

</style>
