<template>
  <div id="app">
    <trinity-rings-spinner
      :animation-duration="1500"
      :size="120"
      :color="'#000000'"
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
