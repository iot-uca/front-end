<template>

  <!-- Modal for showing success or failure interactions-->
    <div v-if="showModalForRequestResult">
        <div class="modal-mask">
          <div class="modal-wrapper modal-dialog modal-lg">

            <div class="modal-dialog modal-lg">
              <div class="modal-dialog modal-lg modal-content">

                <div v-if="errorInInteraction" class="modal-body alert alert-danger text-center" role="alert">
                  <strong>{{errorMessage}}</strong>
                </div>
                <div v-else class="modal-body alert alert-success text-center" role="alert">
                  <strong>{{successMessage}} </strong>
                </div>

              </div>
            </div>

        </div>
      </div>
    </div>

</template>

<script>

  export default{

    computed:{

      errorInInteraction(){
        return this.$store.state.errorInInteraction;
      },

      errorMessage(){
        return this.$store.state.errorMessage;
      },

      successMessage(){
        return this.$store.state.successMessage;
      },

      showModalForRequestResult(){
        return this.$store.state.showModalForRequestResult;
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
