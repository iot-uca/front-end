<template>

  <!-- Modal for editing data streams-->


  <div v-if="showModalForStreamEditing">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                  <h4 class="modal-title" id="editDataStreamLabel"><strong>Edit Data Stream</strong></h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForStreamEditing()">
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
                  <button type="button" class="btn button-green button-green-danger" @click="updateDataStream(); hideModalForStreamEditing()">Save changes</button>
                  <button type="button" class="btn button-green" @click="hideModalForStreamEditing()">Close</button>
                </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    computed:{
      showModalForStreamEditing(){
        return this.$store.state.showModalForStreamEditing;
      },
      activeDataStream: {
        // getter
        get: function () {
          return this.$store.state.activeDataStream;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setActiveDataStream', newValue);
        }
      },
    },
    methods:{

      updateDataStream: function () {
        this.$store.dispatch('updateDataStream');
      },

      hideModalForStreamEditing: function () {
        this.$store.dispatch('hideModalForStreamEditing');
      },

    },
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

  .button-green{
    background-color: #4AFF82;
    color: white;
    font-family: Source Sans Pro, sans-serif;
  }

  .button-green:hover{
     background-color: #4AFF96;
  }

</style>
