<template>

<!-- Modal for addding actions -->

  <div v-if="showModalForActionAdding">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title" id="addActionModalLabel"><strong>Add Action</strong></h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForActionAdding();">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">

              <ul class="nav nav-tabs" id="addActionTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active a-green" id="actionNameAdd-tab" data-toggle="tab" href="#actionNameAddTab" role="tab" aria-controls="actionNameAddTab" aria-selected="true">Action name</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link a-green" id="httpRequestAdd-tab" data-toggle="tab" href="#httpRequestAdd" role="tab" aria-controls="httpRequestAdd" aria-selected="false">HTTP request</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link a-green" id="actionBodyAdd-tab" data-toggle="tab" href="#actionBodyAdd" role="tab" aria-controls="actionBodyAdd" aria-selected="false">Body</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link a-green" id="actionHeadersAdd-tab" data-toggle="tab" href="#actionHeadersAdd" role="tab" aria-controls="actionHeadersAdd" aria-selected="false">Headers</a>
                </li>
              </ul>

              <div class="tab-content" id="addActionContent">

                <div class="tab-pane fade show active" id="actionNameAddTab" role="tabpanel" aria-labelledby="actionNameAdd-tab">

                  <div class="mb-3">
                    <label for="actionName">Name</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-font"></i></span>
                      </div>
                      <input type="text" class="form-control" id="actionName" placeholder="Action Name" v-model="activeAction.name" required="true">
                      <div class="invalid-feedback" style="width: 100%;">
                        The Action name is required.
                      </div>
                    </div>
                  </div>

                </div>

                <div class="tab-pane fade" id="httpRequestAdd" role="tabpanel" aria-labelledby="httpRequestAdd-tab">

                  <div class="mb-3">
                    <label for="httpMethod">Method</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-star-o"></i></span>
                      </div>
                      <select class="form-control custom-select" id="httpMethod" v-model="activeAction.method" required="true">
                        <option v-for="(method, index) in existingHttpMethods" v-bind:value="method.name">
                          {{method.name}}
                        </option>
                      </select>
                      <div class="invalid-feedback" style="width: 100%;">
                        The HTTP Method is required.
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="actionUrl">URL</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-external-link"></i></span>
                      </div>
                      <input type="url" class="form-control" id="actionUrl" placeholder="http://foo" v-model="activeAction.url" required="true">
                      <div class="invalid-feedback" style="width: 100%;">
                        The Action name is required.
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="actionVersion">Version</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-code"></i></span>
                      </div>

                      <select class="form-control custom-select" id="actionVersion" v-model="activeAction.version" required="true">
                        <option v-for="(version, index) in existingHttpVersions" v-bind:value="version.name">
                          {{version.name}}
                        </option>
                      </select>
                      <div class="invalid-feedback" style="width: 100%;">
                        The HTTP Method is required.
                      </div>
                    </div>
                  </div>

                </div>

                <div class="tab-pane fade" id="actionBodyAdd" role="tabpanel" aria-labelledby="actionBodyAdd-tab">

                  <div class="mb-3">
                    <label for="actionBodyAdd">Body</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-code"></i></span>
                      </div>
                      <textarea class="form-control" aria-label="Request body" v-model="actionBody"></textarea>
                    </div>
                  </div>

                  <div class="mb-3">

                    <div v-if="validJson" class="alert alert-success text-center py-2" role="alert">
                      JSON entered is valid
                    </div>
                    <div v-else class="alert alert-danger text-center py-2" role="alert">
                      JSON entered is invalid
                    </div>
                  </div>

                </div>

                <div class="tab-pane fade" id="actionHeadersAdd" role="tabpanel" aria-labelledby="actionHeadersAdd-tab">
                  <div class="row">
                    <div class="col-md-3">
                      <button type="button" class="btn button-green btn-sm" @click="addOneMoreElemForActionRequestHeader()">Add parameter</button>

                    </div>
                  </div>
                  <br>

                  <div class="row" v-for="(elem, index) in activeIdsForHttpRequestHeader">

                    <div class="col-md-5">
                      <div class="mb-3">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-key"></i></span>
                          </div>
                          <input type="text" class="form-control" v-model="elem.key" placeholder="Parameter key" required="true">
                          <div class="invalid-feedback" style="width: 100%;">
                            The Action name is required.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="mb-3">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-pencil-square-o"></i></span>
                          </div>
                          <input type="text" class="form-control" v-model="elem.value" placeholder="Parameter value" required="true">
                          <div class="invalid-feedback" style="width: 100%;">
                            The Action name is required.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div class="mb-3">
                        <label></label>
                        <button type="button" class="btn button-green btn-sm" @click="oneLessElemForActionRequestHeader(index)"><strong><i class="fa fa-remove"></i></strong></button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn button-green btn-sm" data-dismiss="modal"  @click="addAction();hideModalForActionAdding();"><strong>Add action</strong></button>
            </div>

          </div>
      </div>
    </div>
  </div>
</div>








  <!-- Modal for addding actions -->
  <!--div class="modal fade" id="addActionModal" tabindex="-1" role="dialog" aria-labelledby="addActionModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title" id="addActionModalLabel"><strong>Add Action</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">

          <ul class="nav nav-tabs" id="addActionTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active a-green" id="actionNameAdd-tab" data-toggle="tab" href="#actionNameAddTab" role="tab" aria-controls="actionNameAddTab" aria-selected="true">Action name</a>
            </li>
            <li class="nav-item">
              <a class="nav-link a-green" id="httpRequestAdd-tab" data-toggle="tab" href="#httpRequestAdd" role="tab" aria-controls="httpRequestAdd" aria-selected="false">HTTP request</a>
            </li>
            <li class="nav-item">
              <a class="nav-link a-green" id="actionBodyAdd-tab" data-toggle="tab" href="#actionBodyAdd" role="tab" aria-controls="actionBodyAdd" aria-selected="false">Body</a>
            </li>
            <li class="nav-item">
              <a class="nav-link a-green" id="actionHeadersAdd-tab" data-toggle="tab" href="#actionHeadersAdd" role="tab" aria-controls="actionHeadersAdd" aria-selected="false">Headers</a>
            </li>
          </ul>

          <div class="tab-content" id="addActionContent">

            <div class="tab-pane fade show active" id="actionNameAddTab" role="tabpanel" aria-labelledby="actionNameAdd-tab">

              <div class="mb-3">
                <label for="actionName">Name</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-font"></i></span>
                  </div>
                  <input type="text" class="form-control" id="actionName" placeholder="Action Name" v-model="activeAction.name" required="true">
                  <div class="invalid-feedback" style="width: 100%;">
                    The Action name is required.
                  </div>
                </div>
              </div>

            </div>

            <div class="tab-pane fade" id="httpRequestAdd" role="tabpanel" aria-labelledby="httpRequestAdd-tab">

              <div class="mb-3">
                <label for="httpMethod">Method</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-star-o"></i></span>
                  </div>
                  <select class="form-control custom-select" id="httpMethod" v-model="activeAction.method" required="true">
                    <option v-for="(method, index) in existingHttpMethods" v-bind:value="method.name">
                      {{method.name}}
                    </option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The HTTP Method is required.
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="actionUrl">URL</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-external-link"></i></span>
                  </div>
                  <input type="url" class="form-control" id="actionUrl" placeholder="http://foo" v-model="activeAction.url" required="true">
                  <div class="invalid-feedback" style="width: 100%;">
                    The Action name is required.
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="actionVersion">Version</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-code"></i></span>
                  </div>

                  <select class="form-control custom-select" id="actionVersion" v-model="activeAction.version" required="true">
                    <option v-for="(version, index) in existingHttpVersions" v-bind:value="version.name">
                      {{version.name}}
                    </option>
                  </select>
                  <div class="invalid-feedback" style="width: 100%;">
                    The HTTP Method is required.
                  </div>
                </div>
              </div>

            </div>

            <div class="tab-pane fade" id="actionBodyAdd" role="tabpanel" aria-labelledby="actionBodyAdd-tab">

              <div class="mb-3">
                <label for="actionBodyAdd">Body</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-code"></i></span>
                  </div>
                  <textarea class="form-control" aria-label="Request body" v-model="actionBody"></textarea>
                </div>
              </div>

              <div class="mb-3">

                <div v-if="validJson" class="alert alert-success text-center py-2" role="alert">
                  JSON entered is valid
                </div>
                <div v-else class="alert alert-danger text-center py-2" role="alert">
                  JSON entered is invalid
                </div>
              </div>

            </div>

            <div class="tab-pane fade" id="actionHeadersAdd" role="tabpanel" aria-labelledby="actionHeadersAdd-tab">
              <div class="row">
                <div class="col-md-3">
                  <button type="button" class="btn button-green btn-sm" @click="addOneMoreElemForActionRequestHeader()">Add parameter</button>

                </div>
              </div>
              <br>

              <div class="row" v-for="(elem, index) in activeIdsForHttpRequestHeader">

                <div class="col-md-5">
                  <div class="mb-3">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" v-model="elem.key" placeholder="Parameter key" required="true">
                      <div class="invalid-feedback" style="width: 100%;">
                        The Action name is required.
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="mb-3">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-pencil-square-o"></i></span>
                      </div>
                      <input type="text" class="form-control" v-model="elem.value" placeholder="Parameter value" required="true">
                      <div class="invalid-feedback" style="width: 100%;">
                        The Action name is required.
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-1">
                  <div class="mb-3">
                    <label></label>
                    <button type="button" class="btn button-green btn-sm" @click="oneLessElemForActionRequestHeader(index)"><strong><i class="fa fa-remove"></i></strong></button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn button-green btn-sm" data-dismiss="modal"  @click="addAction()"><strong>Add action</strong></button>
        </div>

      </div>
    </div>
  </div-->

</template>

<script>

  export default{

    computed:{

      showModalForActionAdding(){
        return this.$store.state.showModalForActionAdding;
      },

      existingHttpVersions(){
        return this.$store.state.existingHttpVersions;
      },

      activeAction(){
        return this.$store.state.activeAction;
      },

      existingHttpMethods(){
        return this.$store.state.existingHttpMethods;
      },

      activeIdsForHttpRequestHeader(){
        return this.$store.state.activeIdsForHttpRequestHeader;
      },

      actionBody: {
        // getter
        get: function () {
          return this.$store.state.actionBody;
        },
        // setter
        set: function (newValue) {
          console.log(" Entering set Action Body watcher!! ");
          this.$store.dispatch('setActionBody', newValue);
        }
      },

      validJson() {
        return this.$store.state.validJson;
      }


    },

    methods:{

      hideModalForActionAdding: function(){
        this.$store.dispatch('hideModalForActionAdding');
      },

      addOneMoreElemForActionRequestHeader: function () {
        this.$store.dispatch('addOneMoreElemForActionRequestHeader');
      },
      oneLessElemForActionRequestHeader: function (index) {
        this.$store.dispatch('oneLessElemForActionRequestHeader', index);
      },

      addAction: function () {
        this.$store.dispatch('addAction', this.$store.state.backendEndPoint, this.$store.state.request, this.$store.state.activeAction.name);
      }
    }
  }


</script>


<style scoped>

.a-green{
  color:#4AE387;
}

.button-green{
  background-color: #4AE387;
  color: white;
  font-family: Source Sans Pro, sans-serif;
}

.button-green-danger{
  background-color: #87d37c;
  color: white;
  font-family: Source Sans Pro, sans-serif;
}

.button-green:hover{
   background-color: #4AFF96;
}

.button-green-danger:hover{
   background-color: #4AE387;
}

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

</style>
