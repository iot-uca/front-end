<template>

  <!-- Modal for addding data streams-->
  <div class="modal fade" id="addDataStreamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel"><strong>Add Data Stream</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

        </div>
        <div class="modal-body">

          <form class="needs-validation" novalidate onsubmit="return false;">

            <div class="mb-3">
              <label for="triggerName">Name</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fa fa-font"></i></span>
                </div>
                <input type="text" class="form-control" id="triggerName" v-model="dataStreamToAdd" required>
                <div class="invalid-feedback" style="width: 100%;">
                  <em>The Stream name cannot be empty<em>
                </div>
              </div>
            </div>
            <hr>
            <button class="btn btn-primary btn-sm" type="submit" @click="addDataStream()" style="float: right; font-size: 1.1rem;"><strong>Add stream</strong></button>
          </form>
        </div>

        <!--div class="modal-footer">
                  <button class="btn btn-primary btn-sm" type="submit" data-toggle="modal" data-target="#stack3" @click="addDataStream()"><h5><strong>Add stream</strong></h5></button>
              </div-->
      </div>
    </div>
  </div>

</template>

<script>


</script>

<style scoped>


</style>
