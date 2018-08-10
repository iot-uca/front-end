<template>

  <div id="sarasa">
    <h2>Available options</h2>
    <ul>
      <li v-for="opt in options">
        <span>{{opt.name}}</span>
        <span>{{opt.value}}</span>
      </li>
    </ul>
    <button @click="reduceOptions">Reduce Options</button>
  </div>

</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    computed: {
      options(){
        return this.$store.state.options;
      }
    },
    methods:{
      //reduceOptions: function(){
        //this.$store.commit('reduceOptions');// esto commitea la mutación, la dispara
        /*this.$store.dispatch('reduceOptions');
      },*/
        ...mapActions([ // de esta forma mapea un metodo con una acción, entonces no hace falta el llamado explícito que
          // estoy haciendo arriba
          // El operador ... es de ES6, Babel se encarga de traducirlo en JS que los browsers entienden

            'reduceOptions'
        ])
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
