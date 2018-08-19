<template>
  <!-- Modal for showing success or failure interactions-->

  <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModal" aria-hidden="true" style="margin: 15%;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div v-if="errorInInteraction" class="modal-body alert alert-danger text-center" role="alert">
          <strong>{{errorMessage}}</strong>
        </div>
        <div v-else class="modal-body alert alert-success text-center" role="alert">
          <strong>{{successMessage}} </strong>
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

    }

  }


</script>

<style scoped>



</style>
