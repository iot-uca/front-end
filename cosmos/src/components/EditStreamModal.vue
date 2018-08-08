<template>

  <!-- Modal for editing data streams-->
  <div v-if="showAddDataStreamModal"class="modal fade" id="editDataStreamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="editDataStreamLabel"><strong>Edit Data Stream</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideAddDataStreamModal()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form class="needs-validation" novalidate="">

            <div class="mb-3">
              <label for="dataStreamName">Name</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fa fa-font"></i></span>
                </div>

                <input type="text" class="form-control" id="dataStreamName" v-model="activeDataStream.name" required="true">

              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateDataStream(); hideAddDataStreamModal();"><strong>Save changes</strong></button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideAddDataStreamModal();"><strong>Close</strong></button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    computed:{
      activeDataStream () {
        return this.$store.state.activeDataStream;
      },
      showAddDataStreamModal () {
        return this.$store.state.showAddDataStreamModal;
      },
    },
    methods:{
      updateDataStream: function () {
          this.$store.dispatch('updateDataStream');
      },
      hideAddDataStreamModal: function () {
        this.$store.dispatch('hideAddDataStreamModal');
      }
    },
  }


</script>

<style scoped>



</style>
