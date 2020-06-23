<template>

  <div class="bg-dark">

    <div class="text-center">
        <div style="display: inline-block; vertical-align:top;">
          <img style="height:80px;width:80px; float:left;" src="../../src/assets/telescopio.gif">
        </div>
        <div style="display: inline-block">
          <br>
          <h3 style="color:#4AFF82; font-family:Source Sans Pro, sans-serif; float:right;"><strong>T E L E S C O P E</strong></h3>
        </div>
    </div>

    <div class="justify-content-md-center">
      <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#telescopeNavbar" aria-controls="telescopeNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="telescopeNavbar">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style="margin: auto;">
            <li class="nav-item active">
              <a class="nav-link">
                <router-link to="/dashboard" exact>
                  Dashboard
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/dataStreams" exact>
                  Data Streams
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/actions" exact>
                  Actions
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/commands" exact>
                  Commands
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/triggers" exact>
                  Triggers
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/about" exact>
                  About
                </router-link>
              </a>
            </li>


          </ul>

        </div>
      </nav>

    </div>

  </div>


</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    methods:{

      getSideNavStyle: function (){
        return this.$store.state.sideNavStyle;
      },

      ...mapActions([
        'showDashboardView', 'closeNav', 'showDataStreamView', 'showActionView', 'showTriggerView', 'showSecurityView',
        'showAboutView'
        ]),

    }
  }

</script>


<style scoped>

  a{
    color: #4AFF82;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
  }

  .router-link-active{
    background: #eee;
    color: #444;
  }

  h1{
    margin-bottom: 0;
  }

</style>
