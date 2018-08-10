<template>

  <!-- Modal for removing elements-->
  <div class="modal fade" id="removeElements" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <button type="button" class="btn btn-danger">Delete</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    computed:{

      elementsToDelete() {
          return this.$store.state.elementsToDelete;
      },


    }

  }


</script>

<style scoped>


</style>
