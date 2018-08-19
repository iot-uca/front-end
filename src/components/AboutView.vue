<template>

  <div class="my-3" v-if="hasToShowAboutView()">
      <div class="text-center font-italic lead">
        <img src="../assets/cosmos.jpg" class="img-fluid" alt="Responsive image">

        <p>
          Cosmos is a Internet of Things (IoT) platform.
        </p>

        <p>
          With Cosmos, we aim to provide a platform to collect data from connected devices and act on them defining a set of rules.
        </p>

        <p>
          You are currently using the first pure-VUE-JS interface to interact with it.
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
