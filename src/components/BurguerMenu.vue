<template>

  <!-- ANOTHER POSSIBILITY IS https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_navbar_collapse&stacked=h -->

  <!--div id="mySidenav" class="sidenav" v-bind:style="getSideNavStyle()"-->

    <!-- Side Nav for burguer menu -->

    <!--a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
    <a href="#" v-on:click="showDashboardView(); closeNav();"><i class="fa fa-dashboard"></i>DASHBOARD</a>
    <a href="#" @click="showDataStreamView(); closeNav();"><i class="fa fa-cubes"></i>DATA STREAM</a>
    <a href="#" @click="showActionView(); closeNav();"><i class="fa fa-hand-paper-o"></i>ACTIONS</a>
    <a href="#" @click="showTriggerView(); closeNav();"><i class="fa fa-bell-o"></i>TRIGGERS</a>
    <a href="#" @click="showSecurityView(); closeNav();"><i class="fa fa-lock"></i>SECURITY</a>
    <a href="#" @click="showAboutView(); closeNav();"><i class="fa fa-info"></i>ABOUT</a>
  </div-->

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
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style="margin: auto;">

            <!--li class="nav-item active" @click="showDashboardView()"-->
            <li class="nav-item active">
              <a class="nav-link">
                <router-link to="/dashboard" exact>
                  Dashboard
                </router-link>
              </a>
            </li>
            <!--li class="nav-item" @click="showDataStreamView()"-->
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/dataStreams" exact>
                  Data Streams
                </router-link>
              </a>
            </li>
            <!--li class="nav-item" @click="showActionView()"-->
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
            <!--li class="nav-item" @click="showTriggerView()"-->
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/triggers" exact>
                  Triggers
                </router-link>
              </a>
            </li>
            <!--li class="nav-item" @click="showSecurityView()"-->
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/security" exact>
                  Security
                </router-link>
              </a>
            </li>
            <!--li class="nav-item" @click="showAboutView()"-->
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

      /*showDashboardView: function (){
        this.$store.dispatch('showDashboardView');
      },

      closeNav: function (){
        this.$store.dispatch('closeNav');
      },*/

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--style scoped>

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {background-color: #250869}

  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #111; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
    transition: 0.3s
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover, .offcanvas a:focus{
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
</style-->
<style scoped>

  a{
    //color: #fff;
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
