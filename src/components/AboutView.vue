<template>

  <div class="my-3" v-if="hasToShowAboutView()">
      <div class="text-center font-italic lead">
        <img src="../assets/cosmos.jpg" class="img-fluid" alt="Responsive image" style="max-width:180px; max-height:180px;">

        <p>
          Cosmos is an Internet of Things (IoT) platform.
        </p>

        <p style="color: #4AFF82">
          With Cosmos, we aim to provide a platform to collect data from connected devices and act on them defining a set of rules.
        </p>

        <img src="../assets/telescopio.gif" class="img-fluid" alt="Responsive image"style="max-width:180px; max-height:180px;">

        <p>
          Telescope is the first graphical interface to interact and explore Cosmos.
        </p>

      </div>

  </div>
</template>

<script>
  export default{

    mounted(){
      this.$store.dispatch('showAboutView');
    },
    methods:{
      hasToShowAboutView: function(){
        return this.$store.state.renderAboutView;
      },
    }

  }
</script>

<style scoped>


</style>
