<template>

  <!-- Modal for removing elements-->

  <div v-if="showModalForRemovingElements">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel"><strong>Remove Elements</strong></h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForRemovingElements()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <h5><strong>¿Are you sure you want to delete?</strong></h5>

              <ul class="list-group" v-for="(elem, index) in elementsToDelete">

		<div v-if="elem.command">  <!-- COMMAND -->
		     <li class="list-group-item"><strong>Command:</strong> {{elem.command}}  <strong> Priority: </strong> {{elem.priority}}</li>
		</div>	

		<div v-else>

			<div v-if="elem.http_request">  <!-- ACTION -->
			     <li class="list-group-item"><strong>Action:</strong> {{elem.name}}  <strong> Method: </strong> {{elem.http_request.request_line.method}}  <strong> URL:</strong> {{elem.http_request.request_line.url}}</li>
			</div>

			<div v-else>

				<div v-if="elem.action"> <!-- TRIGGER -->
			     	     <li class="list-group-item"><strong>Trigger:</strong> {{elem.name}}  <strong> Action: </strong> {{elem.action}}  <strong> Policy type:</strong> {{elem.policy.type}}</li>
				</div>

				<div v-else> <!-- DATA STREAM-->
					<li class="list-group-item"><strong>Data Stream:</strong> {{elem.name}}  <strong> Value: </strong> {{elem.current_value}}  <strong> Updated:</strong> {{elem.last_update}}</li>
				</div>

			</div>
		</div>



			<div v-if="elem.current_value">
				<li class="list-group-item"><strong>Data Stream:</strong> {{elem.name}}  <strong> Value: </strong> {{elem.current_value}}  <strong> Updated:</strong> {{elem.last_update}}</li>
			</div>



              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn button-main button-secondary" @click="deleteElements(); hideModalForRemovingElements()">Delete</button>
              <button type="button" class="btn button-green" @click="hideModalForRemovingElements()">Cancel</button>
            </div>

        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>

  export default {

    computed:{

      elementsToDelete() {
          return this.$store.state.elementsToDelete;
      },

      showModalForRemovingElements(){
          return this.$store.state.showModalForRemovingElements;
      }
    },

    methods:{
      deleteElements: function(){
        this.$store.dispatch('deleteElements');
      },

      hideModalForRemovingElements: function(){
        this.$store.dispatch('hideModalForRemovingElements');
      },
    }

  }


</script>

<style scoped>

.modal-mask {
position: fixed;
z-index: 9998;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, .5);
display: table;
transition: opacity .3s ease;
}

.modal-wrapper {
display: table-cell;
vertical-align: middle;
}


.button-green{
  background-color: #4AFF82;
  color: white;
  font-family: Source Sans Pro, sans-serif;
}

.button-green:hover{
   background-color: #4AFF96;
}

.button-secondary{
  color: white;
  font-family: Source Sans Pro, sans-serif;
}

.button-secondary:hover{
   background-color: #4AFF96;
}



</style>
