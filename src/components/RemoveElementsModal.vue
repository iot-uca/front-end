<template>

  <!-- Modal for removing elements-->

  <div v-if="showModalForRemovingElements">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel"><strong>Remove Elements</strong></h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForRemovingElements()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <h4><strong>Are you sure you want to delete </strong></h4>

              <ul class="list-group" v-for="(elem, index) in elementsToDelete">
                <li class="list-group-item"><strong>{{elem}}</strong></li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="deleteElements(); hideModalForRemovingElements()">Delete</button>
              <button type="button" class="btn btn-secondary" @click="hideModalForRemovingElements()">Cancel</button>
            </div>

        </div>
      </div>
    </div>
  </div>
</div>




  <!--div class="modal fade" id="removeElements" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel"><strong>Remove Elements</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <h4><strong>Are you sure you want to delete </strong></h4>

          <ul class="list-group" v-for="(elem, index) in elementsToDelete">
            <li class="list-group-item"><strong>{{elem}}</strong></li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deleteElements()">Delete</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div-->

</template>

<script>

  export default {

    computed:{

      elementsToDelete() {
          return this.$store.state.elementsToDelete;
      },

      showModalForRemovingElements(){
          return this.$store.state.showModalForRemovingElements;
      }
    },

    methods:{
      deleteElements: function(){
        this.$store.dispatch('deleteElements');
      },

      hideModalForRemovingElements: function(){
        this.$store.dispatch('hideModalForRemovingElements');
      },
    }

  }


</script>

<style scoped>

.modal-mask {
position: fixed;
z-index: 9998;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, .5);
display: table;
transition: opacity .3s ease;
}

.modal-wrapper {
display: table-cell;
vertical-align: middle;
}


</style>
