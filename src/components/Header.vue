<template>

  <!-- GUI Header -->
  <div id="ui-header">
    <div class="row text-center">
      <div class="col-md-1 py-2">
        <span style="font-size:30px;cursor:pointer; padding:2% " @click="openNav()"><i class="fa fa-bars" style="color:white;"></i></span>
      </div>
      <div class="col-md-10 py-2">
        <h1 id="cosmosTitle"><strong>Cosmos GUI</strong></h1>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    methods: {

      ... mapActions([
          'openNav'
        ])

    }
  }

</script>

<style scoped>

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #ui-header {
    /*transition: margin-left .5s; --- esta opción es para desplazar el contenido a la derecha*/

    /*background-color: #290B6E;*/
    /*background-color: #151E21;   EL MAS PARECIDO Y MEJOR COLOR!!!!*/
    /*background-color: #1E2B2F;*/
    /*background-color: #323855;*/

    /*nuevas opciones de colores que consegui googleando:*/
    /*background-color: #32333E;*/
    /*background-color: #373843;*/
    /*background-color: #3c3d48;*/
    /*background-color: #353440;*/
    /*background-color: #373843;*/
    background-color: #2b2c37;

  }

  #cosmosTitle{
    color: white;
    size: 40 px;
    text-align: center;
    font-family: "Helvetica", sans-serif;
  }

</style>
