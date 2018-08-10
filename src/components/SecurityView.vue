<template>
  <div id="keys" v-if="hasToShowSecurityView()">
    <div class="container">
      <div class="row">
        <div class="col-md-2">
        </div>

        <div class="col-md-8">
          <h4 class="mb-3 text-center"><strong>Associate the actions required</strong></h4>
          <hr>
          <form class="needs-validation" novalidate="">

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="same-address">
              <label class="custom-control-label" for="same-address">Read</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="save-info">
              <label class="custom-control-label" for="save-info">Write</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="delete-info">
              <label class="custom-control-label" for="delete-info">Delete</label>
            </div>

            <br>

            <button class="btn btn-primary btn-lg btn-block" type="submit"><h5><strong>Generate Key</strong></h5></button>

            <div class="text-muted text-center">
              <br>
              <span><em><h3>{{getSecurityKey()}}</h3></em></span>
            </div>

          </form>
        </div>

        <div class="col-md-2"></div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    methods:{
      hasToShowSecurityView: function(){
        return this.$store.state.renderSecurityView;
      },
      getSecurityKey: function () {
        return this.$store.state.securityKey;
      }
    }

  }

</script>

<style scoped>


</style>
