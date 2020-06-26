<template>

<!-- Modal for addding data streams-->
<div>

  <div v-if="showModalForStreamAdding">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel"><strong>Add Data Stream</strong></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForStreamAdding();">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>


              <div class="modal-body">
                <form class="needs-validation" novalidate="" onsubmit="return false;">

                  <div class="mb-3">
                    <label for="streamName">Name</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="streamName" v-model="dataStreamToAdd" required="true">
                      <div class="invalid-feedback" style="width: 100%;">
                        <em>The Stream name cannot be empty</em>
                      </div>
                    </div>
                  </div>


                  <hr>
                  <button class="btn button-green btn-sm" type="submit" @click="addDataStream();hideModalForStreamAdding();" style="float: right; font-size: 1.1rem;">Add stream</button>
                </form>
              </div>


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

      dataStreamToAdd: {
        // getter
        get: function () {
          return this.$store.state.dataStreamToAdd;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setDataStreamToAdd', newValue);
        }
      },

      showModalForStreamAdding() {
        return this.$store.state.showModalForStreamAdding;
      },

      streamTypes(){
        return this.$store.state.streamTypes;
      },

    },

    methods:{

      addDataStream: function () {
        this.$store.dispatch('addDataStream', this.$store.state.backendEndPoint);
      },

      hideModalForStreamAdding: function () {
        this.$store.dispatch('hideModalForStreamAdding');
      },

    }

  }


</script>

<style scoped>

  .button-green{
    background-color: #4AE387;
    color: white;
    font-family: Source Sans Pro, sans-serif;
  }

  .button-green:hover{
     background-color: #4AFF96;
  }

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
