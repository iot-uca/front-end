<template>

  <!-- Modal for addding commands -->

  <div>

    <div v-if="showModalForCommandAdding">
        <div class="modal-mask">
          <div class="modal-wrapper">

            <div class="modal-dialog modal-lg">
              <div class="modal-content">


                <div class="modal-header">
                  <h4 class="modal-title" id="exampleModalLabel"><strong>Add Command</strong></h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForCommandAdding();">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>


                <div class="modal-body">

                  <form class="needs-validation" novalidate="" onsubmit="return false;">

                    <div class="mb-3">
                      <label for="commandName">Name</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="commandName" v-model="commandToAdd.command" required="true">
                        <div class="invalid-feedback" style="width: 100%;">
                          <em>The Command name cannot be empty</em>
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="commandPriority">Priority</label>
                      <div class="input-group">
                        <input type="tel" class="form-control" id="commandPriority" v-model="commandToAdd.priority" required="true" min="1" max="100" maxlength="3">
                        <div class="invalid-feedback" style="width: 100%;">
                          <em>The Command priority cannot be empty</em>
                        </div>
                      </div>
                    </div>


                    <hr>
                    <button class="btn button-green btn-sm" type="submit" @click="addCommand();hideModalForCommandAdding();" style="float: right; font-size: 1.1rem;">Add command</button>
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

    commandToAdd(){
      return this.$store.state.commandToAdd;
    },
    showModalForCommandAdding(){
      return this.$store.state.showModalForCommandAdding;
    },

    },
    methods:{

      addCommand: function () {
        this.$store.dispatch('addCommand', this.$store.state.backendEndPoint);
      },

      hideModalForCommandAdding: function () {
        this.$store.dispatch('hideModalForCommandAdding');
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
