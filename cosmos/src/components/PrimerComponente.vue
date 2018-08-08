<template>
    <div class="container">
        <p><strong>ESTE ES EL PRIMER COMPONENTE</strong></p>
        <strong> El valor de la variable es {{this.cantidad}} - {{$root.renderCommandAddView}}</strong>
    </div>
</template>

<script>

    export default {
      name: 'PrimerComponente',
      data () {
        return {
          cantidad: 5
        }
      }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  color: lightblue;
}

</style>
