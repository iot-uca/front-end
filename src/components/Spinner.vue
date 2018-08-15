<template>
  <div id="app">
    <trinity-rings-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#ff1d5e'"
    ></trinity-rings-spinner>
  </div>
</template>

<script>

  import {TrinityRingsSpinner} from 'epic-spinners'
  export default {
    components: {
      TrinityRingsSpinner
    }
  }
</script>
