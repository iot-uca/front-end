<template>

  <div id="mySidenav" class="sidenav" v-bind:style="getSideNavStyle()">
    <!-- Side Nav for burguer menu -->
    <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
    <a href="#" v-on:click="showDashboardView(); closeNav();"><i class="fa fa-dashboard"></i>DASHBOARD</a>
    <a href="#" @click="showDataStreamView(); closeNav();"><i class="fa fa-cubes"></i>DATA STREAM</a>
    <a href="#" @click="showActionView(); closeNav();"><i class="fa fa-hand-paper-o"></i>ACTIONS</a>
    <a href="#" @click="showTriggerView(); closeNav();"><i class="fa fa-bell-o"></i>TRIGGERS</a>
    <a href="#" @click="showSecurityView(); closeNav();"><i class="fa fa-lock"></i>SECURITY</a>
    <a href="#" @click="showAboutView(); closeNav();"><i class="fa fa-info"></i>ABOUT</a>
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
<style scoped>

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
</style>


